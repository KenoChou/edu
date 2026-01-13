Page({
  data: {
    navTop: 0,
    navHeight: 0,
    activeTab: 0,
    tabs: ['全部', '待支付', '已完成', '退款'],
    orderList: [
      {
        id: 'ORD2023110199',
        childName: '小明',
        courseName: '钢琴私教课 - 24课时包',
        price: '4800.00',
        date: '2023-11-01 14:20',
        status: 1, // 1:待支付, 2:已完成, 3:已退款
        statusText: '待支付'
      },
      {
        id: 'ORD2023102045',
        childName: '小明',
        courseName: '乐理基础班 - 季度包',
        price: '1200.00',
        date: '2023-10-20 09:15',
        status: 2,
        statusText: '已完成'
      }
    ]
  },
  onLoad() {
    const menuButton = wx.getMenuButtonBoundingClientRect();
    this.setData({
      navTop: menuButton.top,
      navHeight: menuButton.height
    });
  },
  switchTab(e) {
    this.setData({ activeTab: e.currentTarget.dataset.index });
    // 这里可以根据状态过滤 orderList
  },
  goBack() {
    wx.navigateBack();
  }
})