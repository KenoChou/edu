Page({
  data: {
    menuTop: 0,
    menuHeight: 0,
    typeList: ['事假', '病假', '调课'],
    activeType: 0
  },
  onLoad() {
    const menuButton = wx.getMenuButtonBoundingClientRect();
    this.setData({
      menuTop: menuButton.top,
      menuHeight: menuButton.height
    });
  },
  selectType(e) {
    this.setData({ activeType: e.currentTarget.dataset.index });
  },
  goBack() {
    wx.navigateBack();
  }
})