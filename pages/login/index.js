Page({
  data: {
    navTop: 0,
    navHeight: 0,
    phone: '',
    code: '',
    codeText: '获取验证码',
    isCounting: false,
    countdown: 60
  },
  onLoad() {
    const menuButton = wx.getMenuButtonBoundingClientRect();
    this.setData({
      navTop: menuButton.top,
      navHeight: menuButton.height
    });
  },
  // 获取验证码倒计时
  getCode() {
    if (this.data.isCounting || !/^1[3-9]\d{9}$/.test(this.data.phone)) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return;
    }
    this.setData({ isCounting: true });
    let timer = setInterval(() => {
      if (this.data.countdown > 0) {
        this.setData({ 
          countdown: this.data.countdown - 1,
          codeText: `${this.data.countdown - 1}s后重发`
        });
      } else {
        clearInterval(timer);
        this.setData({ isCounting: false, countdown: 60, codeText: '获取验证码' });
      }
    }, 1000);
  },
  handleLogin() {
    if (this.data.phone && this.data.code) {
      wx.showLoading({ title: '登录中...' });
      setTimeout(() => {
        wx.hideLoading();
        wx.switchTab({ url: '/pages/index/index' }); // 登录成功跳转首页
      }, 1500);
    }
  },
  goBack() { wx.navigateBack(); }
})