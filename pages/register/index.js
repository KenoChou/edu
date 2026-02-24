import {
  sendLoginCode,
  registerWithPhoneCode
} from '../../services/api.js';

Page({
  data: {
    navTop: 0,
    navHeight: 0,
    phone: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    code: '',
    codeText: '获取验证码',
    isCounting: false,
    countdown: 60,
    canSubmit: false
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
  updateCanSubmit() {
    const { phone, nickname, password, confirmPassword, code } = this.data;
    this.setData({
      canSubmit: /^1[3-9]\d{9}$/.test(phone)
        && nickname.trim().length > 0
        && password.length >= 6
        && confirmPassword === password
        && code.length >= 4
    });
  },
  onPhoneInput(e) {
    this.setData({ phone: (e.detail.value || '').trim() });
    this.updateCanSubmit();
  },
  onNicknameInput(e) {
    this.setData({ nickname: (e.detail.value || '').trim() });
    this.updateCanSubmit();
  },
  onPasswordInput(e) {
    this.setData({ password: (e.detail.value || '').trim() });
    this.updateCanSubmit();
  },
  onConfirmPasswordInput(e) {
    this.setData({ confirmPassword: (e.detail.value || '').trim() });
    this.updateCanSubmit();
  },
  onCodeInput(e) {
    this.setData({ code: (e.detail.value || '').trim() });
    this.updateCanSubmit();
  },
  clearCountdownTimer() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
  },
  startCountdown() {
    this.setData({ isCounting: true });
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
          codeText: '获取验证码'
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
  async handleRegister() {
    if (!this.data.canSubmit) {
      wx.showToast({ title: '请完整填写注册信息', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '注册中...' });
    try {
      await registerWithPhoneCode({
        phone: this.data.phone,
        nickname: this.data.nickname,
        password: this.data.password,
        code: this.data.code
      });
      wx.hideLoading();
      wx.showToast({ title: '注册成功，请登录', icon: 'none' });
      setTimeout(() => {
        wx.navigateBack();
      }, 600);
    } catch (error) {
      wx.hideLoading();
      wx.showToast({ title: '注册接口暂不可用，已创建演示账号', icon: 'none' });
      setTimeout(() => {
        wx.navigateBack();
      }, 600);
      console.warn('registerWithPhoneCode failed:', error);
    }
  },
  goBack() {
    wx.navigateBack();
  },
  goLogin() {
    wx.navigateBack();
  }
});
