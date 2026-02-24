import {
  LOGIN_STATUS,
  ROLE_TYPES
} from '../../utils/state.js';
import {
  getUserProfile,
  loginWithPhoneCode,
  sendLoginCode
} from '../../services/api.js';
import { TEST_ACCOUNT } from '../../mocks/demo.js';

const app = getApp();

Page({
  data: {
    navTop: 0,
    navHeight: 0,
    phone: '',
    code: '',
    codeText: '获取验证码',
    isCounting: false,
    countdown: 60,
    loginStatus: LOGIN_STATUS.IDLE
  },
  onLoad() {
    const menuButton = wx.getMenuButtonBoundingClientRect();
    this.setData({
      navTop: menuButton.top,
      navHeight: menuButton.height
    });
  },
  onUnload() {
    this.clearCountdownTimer();
  },
  onPhoneInput(e) {
    this.setData({ phone: (e.detail.value || '').trim() });
  },
  onCodeInput(e) {
    this.setData({ code: (e.detail.value || '').trim() });
  },
  clearCountdownTimer() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
  },
  startCountdown() {
    this.setData({
      isCounting: true,
      loginStatus: LOGIN_STATUS.SENDING_CODE
    });

    this.countdownTimer = setInterval(() => {
      if (this.data.countdown > 0) {
        this.setData({
          countdown: this.data.countdown - 1,
          codeText: `${this.data.countdown - 1}s后重发`
        });
      } else {
        this.clearCountdownTimer();
        this.setData({
          isCounting: false,
          countdown: 60,
          codeText: '获取验证码',
          loginStatus: LOGIN_STATUS.IDLE
        });
      }
    }, 1000);
  },
  async getCode() {
    if (this.data.isCounting || !/^1[3-9]\d{9}$/.test(this.data.phone)) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return;
    }

    try {
      await sendLoginCode(this.data.phone);
      wx.showToast({ title: '验证码已发送', icon: 'none' });
      this.startCountdown();
    } catch (error) {
      wx.showToast({ title: '验证码发送失败，已进入演示模式', icon: 'none' });
      this.startCountdown();
      console.warn('sendLoginCode failed:', error);
    }
  },
  useTestAccount() {
    this.setData({
      phone: TEST_ACCOUNT.phone,
      code: TEST_ACCOUNT.code
    });
    wx.showToast({ title: '已填充测试账号', icon: 'none' });
  },
  async handleLogin() {
    if (!/^1[3-9]\d{9}$/.test(this.data.phone) || this.data.code.length < 4) {
      wx.showToast({ title: '请输入正确手机号和验证码', icon: 'none' });
      return;
    }

    this.setData({ loginStatus: LOGIN_STATUS.LOGGING_IN });
    const store = app.getStore();

    if (this.data.phone === TEST_ACCOUNT.phone && this.data.code === TEST_ACCOUNT.code) {
      store.setSession({
        token: `test_${Date.now()}`,
        roleType: TEST_ACCOUNT.roleType,
        loginStatus: LOGIN_STATUS.LOGGED_IN
      });
      store.setUserProfile(TEST_ACCOUNT.profile);
      this.setData({ loginStatus: LOGIN_STATUS.LOGGED_IN });
      wx.showToast({ title: '测试账号登录成功', icon: 'none' });
      wx.switchTab({ url: '/pages/index/index' });
      return;
    }

    try {
      const loginRes = await loginWithPhoneCode(this.data.phone, this.data.code);
      const token = loginRes?.token || `mock_${Date.now()}`;
      const roleType = Number(loginRes?.roleType ?? ROLE_TYPES.PARENT);

      store.setSession({ token, roleType, loginStatus: LOGIN_STATUS.LOGGED_IN });

      try {
        const profile = await getUserProfile();
        store.setUserProfile({
          ...profile,
          name: profile?.name || '李子轩',
          userId: profile?.userId || '882930',
          city: profile?.city || '北京'
        });
      } catch (error) {
        store.setUserProfile({ name: '李子轩', userId: '882930', city: '北京' });
        console.warn('getUserProfile failed:', error);
      }

      this.setData({ loginStatus: LOGIN_STATUS.LOGGED_IN });
      wx.switchTab({ url: '/pages/index/index' });
    } catch (error) {
      const mockToken = `mock_${Date.now()}`;
      store.setState((state) => ({
        session: {
          ...state.session,
          token: mockToken,
          roleType: ROLE_TYPES.PARENT,
          loginStatus: LOGIN_STATUS.LOGGED_IN
        },
        userProfile: {
          ...state.userProfile,
          name: '李子轩',
          userId: '882930',
          city: '北京'
        }
      }));

      this.setData({ loginStatus: LOGIN_STATUS.LOGGED_IN });
      wx.showToast({ title: '登录接口暂不可用，已进入演示模式', icon: 'none' });
      wx.switchTab({ url: '/pages/index/index' });
      console.warn('loginWithPhoneCode failed:', error);
    }
  },
  goBack() {
    wx.navigateBack();
  },
  goRegister() {
    wx.navigateTo({ url: '/pages/register/index' });
  }
});
