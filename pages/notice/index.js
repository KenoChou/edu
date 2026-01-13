Page({
  data: {
    menuTop: 0,
    menuHeight: 0,
    notices: [
      {
        id: 1,
        type: 'course',
        title: '上课提醒',
        content: '您今天 15:00 有一节《钢琴启蒙》课程，请准时参加。',
        time: '10:28 09:00',
        isRead: false
      },
      {
        id: 2,
        type: 'system',
        title: '系统升级通知',
        content: '为了提供更好的服务，系统将于今晚 24:00 进行维护升级。',
        time: '10:27 18:30',
        isRead: true
      },
      {
        id: 3,
        type: 'income',
        title: '收入到账',
        content: '您的 10 月份课时费结算已完成，请在账户余额中查看。',
        time: '10:26 14:00',
        isRead: true
      }
    ]
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