Page({
  data: {
    navTop: 0,
    navHeight: 0,
    studentList: [
      { id: 1, name: '小明', level: '钢琴5级' },
      { id: 2, name: '小红', level: '钢琴3级' },
      { id: 3, name: '阿强', level: '乐理入门' }
    ],
    historyClasses: [
      { id: 101, date: '1月14日', time: '09:00', course: '钢琴进阶课', student: '小明' },
      { id: 102, date: '1月13日', time: '14:30', course: '乐理基础', student: '小红' }
    ]
  },
  onLoad() {
    // 核心：获取胶囊按钮位置
    const menuButton = wx.getMenuButtonBoundingClientRect();
    this.setData({
      navTop: menuButton.top,
      navHeight: menuButton.height
    });
  },
  goBack() { wx.navigateBack(); }
})