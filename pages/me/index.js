Page({
  data: {
    role: 0, // 0: 家长版 (橙色), 1: 教师版 (蓝色)
    navTop: 0,
    navHeight: 0,
    // 家长版专属菜单
    parentMenus: [
      { name: '我的孩子', icon: '👶', color: 'orange' },
      { name: '课时记录', icon: '📅', color: 'blue' },
      { name: '订单管理', icon: '📑', color: 'green' }
    ],
    // 教师版专属菜单
    teacherMenus: [
      { name: '排课日程', icon: '🗓️', color: 'blue' },
      { name: '我的学员', icon: '👥', color: 'indigo' },
      { name: '课酬结算', icon: '🧧', color: 'green' },
      { name: '请假审批', icon: '📝', color: 'red' },
      { name: '资质管理', icon: '🏅', color: 'orange' },
      { name: '消息通知', icon: '🔔', color: 'cyan' },
      { name: '评价中心', icon: '⭐', color: 'purple' },
      { name: '更多', icon: '...', color: 'gray' }
    ]
  },
  onLoad() {
    // 获取胶囊位置，确保顶部不穿帮
    const res = wx.getMenuButtonBoundingClientRect();
    this.setData({
      navTop: res.top,
      navHeight: res.height
    });
  },
  switchRole(e) {
    const role = parseInt(e.currentTarget.dataset.role);
    this.setData({ role });
  }
})