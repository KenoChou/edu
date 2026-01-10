Page({
  data: {
    statusBarHeight: 20, // 默认状态栏高度
    navHeight: 44,       // 默认导航栏高度
    days: [
      { week: '周六', date: '10', active: true },
      { week: '周日', date: '11', active: false },
      { week: '周一', date: '12', active: false },
      { week: '周二', date: '13', active: false },
      { week: '周三', date: '14', active: false },
      { week: '周四', date: '15', active: false }
    ],
    courseList: [
      { time: '14:00', title: '钢琴一对一', student: '王小明', sFirst: '王', room: '302', color: 'blue' },
      { time: '16:00', title: '少儿合唱排练', student: '李萌萌', sFirst: '李', room: '多功能厅', color: 'orange' }
    ]
  },
  onLoad() {
    const sys = wx.getSystemInfoSync();
    const menu = wx.getMenuButtonBoundingClientRect();
    this.setData({
      statusBarHeight: sys.statusBarHeight,
      navHeight: (menu.top - sys.statusBarHeight) * 2 + menu.height
    });
  }
})