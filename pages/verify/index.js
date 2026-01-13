Page({
  data: {
    navTop: 0,
    navHeight: 0,
    name: '',
    idCard: '',
    isAgreed: false
  },
  onLoad() {
    const menuButton = wx.getMenuButtonBoundingClientRect();
    this.setData({
      navTop: menuButton.top,
      navHeight: menuButton.height
    });
  },
  onInputName(e) { this.setData({ name: e.detail.value }); },
  onInputId(e) { this.setData({ idCard: e.detail.value }); },
  onCheckAgree() { this.setData({ isAgreed: !this.data.isAgreed }); },
  
  submitVerify() {
    if (!this.data.name || !this.data.idCard) {
      wx.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }
    if (!this.data.isAgreed) {
      wx.showToast({ title: '请勾选隐私协议', icon: 'none' });
      return;
    }
    wx.showLoading({ title: '核验中...' });
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({ title: '认证成功', icon: 'success' });
    }, 1500);
  },
  goBack() { wx.navigateBack(); }
})