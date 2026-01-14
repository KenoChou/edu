Page({
  data: {
    navTop: 0,
    navHeight: 0,
    history: [{ className: '钢琴进阶课 - 小明', date: '2026.01.14', time: '09:00', amount: 1 },
    { className: '乐理基础课 - 小明', date: '2026.01.10', time: '14:30', amount: 1 },
    { className: '钢琴进阶课 - 小明', date: '2026.01.07', time: '09:00', amount:1 }] // 你的数据
  },
  onLoad() {
    // 获取胶囊按钮和状态栏高度
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      navTop: systemInfo.statusBarHeight,
      navHeight: menuButtonInfo.height + (menuButtonInfo.top - systemInfo.statusBarHeight) * 2
    });
  },
  goBack() {
    wx.navigateBack({ delta: 1 });
  }
})