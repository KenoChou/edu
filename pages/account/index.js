Page({
  data: {
    menuTop: 0,
    menuHeight: 0
  },
  onLoad() {
    const menu = wx.getMenuButtonBoundingClientRect();
    this.setData({
      menuTop: menu.top,
      menuHeight: menu.height
    });
  },
  goBack() {
    wx.navigateBack();
  }
})