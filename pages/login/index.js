import {
  LOGIN_STATUS,
  ROLE_TYPES
} from '../../utils/state.js';

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
  getCode() {
    if (this.data.isCounting || !/^1[3-9]\d{9}$/.test(this.data.phone)) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return;
    }

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
  handleLogin() {
    if (!/^1[3-9]\d{9}$/.test(this.data.phone) || this.data.code.length < 4) {
      wx.showToast({ title: '请输入正确手机号和验证码', icon: 'none' });
      return;
    }

    this.setData({ loginStatus: LOGIN_STATUS.LOGGING_IN });
    wx.showLoading({ title: '登录中...' });

    setTimeout(() => {
      wx.hideLoading();
      const mockToken = `mock_${Date.now()}`;
      const store = app.getStore();

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
      wx.switchTab({ url: '/pages/index/index' });
    }, 800);
  },
  goBack() {
    wx.navigateBack();
  }
});
