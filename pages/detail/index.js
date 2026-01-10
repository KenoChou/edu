Page({
  data: {
    statusBarHeight: 0,
    navHeight: 0
  },
  onLoad() {
    const sys = wx.getSystemInfoSync();
    const menu = wx.getMenuButtonBoundingClientRect();
    this.setData({
      statusBarHeight: sys.statusBarHeight,
      navHeight: menu.height + (menu.top - sys.statusBarHeight) * 2
    });
  },
  goBack() { wx.navigateBack(); }
})