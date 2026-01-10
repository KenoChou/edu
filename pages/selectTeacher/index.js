Page({
  data: {
    statusBarHeight: 20,
    navHeight: 44,
    selectedId: 'ai'
  },
  onLoad() {
    // 获取胶囊按钮位置
    const menuButton = wx.getMenuButtonBoundingClientRect();
    const systemInfo = wx.getSystemInfoSync();
    
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight,
      // 标题栏高度计算公式：(胶囊顶部 - 状态栏高度) * 2 + 胶囊高度
      navHeight: (menuButton.top - systemInfo.statusBarHeight) * 2 + menuButton.height
    });
  },
  goBack() {
    wx.navigateBack();
  }
})