Page({
  data: {
    navTop: 0,
    navHeight: 0,
    activeTab: 0,
    tabs: ['全部(128)', '好评(120)', '有图(8)', '中/差评(0)'],
    // 模拟真实的学员评价数据
    evalList: [
      {
        id: 1,
        name: '王小丫 (钢琴启蒙班)',
        avatar: '王',
        avatarBg: '#6b5af0',
        date: '2023-11-01',
        score: 5,
        tags: ['专业性强', '很有耐心', '孩子喜欢'],
        content: '陈老师讲得非常细致，孩子从零基础开始，现在已经能完整弹奏《小星星》了。每节课课后都有详细反馈，非常负责！'
      },
      {
        id: 2,
        name: '李雷 (成人速成)',
        avatar: '李',
        avatarBg: '#5a86f0',
        date: '2023-10-28',
        score: 4,
        tags: ['亲和力好', '环境优美'],
        content: '课程安排很合理，老师很有亲和力，纠正了我很多指法上的老毛病。教室环境很安静，适合沉浸式学习。'
      },
      {
        id: 3,
        name: '王梦莹 (钢琴四级)',
        avatar: '王',
        avatarBg: '#f05a8d',
        date: '2023-10-25',
        score: 5,
        tags: ['干货满满', '考级必备'],
        content: '针对考级曲目的讲解非常透彻，特别是强弱的处理，听完老师示范豁然开朗。'
      }
    ]
  },
  onLoad() {
    const menu = wx.getMenuButtonBoundingClientRect();
    this.setData({
      navTop: menu.top,
      navHeight: menu.height
    });
  },
  switchTab(e) {
    this.setData({ activeTab: e.currentTarget.dataset.index });
    // 这里后续可以加入 wx.showLoading 进行数据请求模拟
  },
  goBack() {
    wx.navigateBack();
  }
})