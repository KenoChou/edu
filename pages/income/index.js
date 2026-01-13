Page({
  data: {
    statusBarHeight: 0,
    navBarHeight: 0,
    menuTop: 0,
    menuHeight: 0,
    incomeData: [
      { id: 1, title: '课时费-钢琴启蒙', date: '10-28 15:00', amount: 120 },
      { id: 2, title: '课时费-成人速成', date: '10-27 19:00', amount: 150 },
      { id: 3, title: '课时费-钢琴进阶', date: '10-26 16:30', amount: 120 }
    ]
  },
  onLoad() {
    const sysInfo = wx.getSystemInfoSync();
    const menuButton = wx.getMenuButtonBoundingClientRect();
    
    this.setData({
      statusBarHeight: sysInfo.statusBarHeight,
      menuTop: menuButton.top,
      menuHeight: menuButton.height,
      // 这里的 navBarHeight 是为了给后面的内容留出足够的头部高度
      navBarHeight: menuButton.bottom + 10 
    });
  },
  goBack() {
    wx.navigateBack();
  }
})