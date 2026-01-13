Page({
  data: {
    navTop: 0,
    navHeight: 0,
    totalLessons: 48, // 总课时
    usedLessons: 12,  // 已消耗
    remaining: 36,    // 剩余
    records: [
      { id: 1, title: '钢琴启蒙课-第12课', date: '2023-11-01 15:00', cost: -1, status: '已完成' },
      { id: 2, title: '钢琴启蒙课-第11课', date: '2023-10-25 15:00', cost: -1, status: '已完成' },
      { id: 3, title: '购买课时包', date: '2023-10-20 10:00', cost: 24, status: '充值成功' }
    ]
  },
  onLoad() {
    const menu = wx.getMenuButtonBoundingClientRect();
    this.setData({
      navTop: menu.top,
      navHeight: menu.height
    });
  },
  goBack() {
    wx.navigateBack();
  }
})