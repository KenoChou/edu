Page({
  data: {
    menuTop: 0,
    menuHeight: 0,
    studentList: [
      { id: 1, name: '张小明', avatar: '', status: '在读', info: '剩余 12 课时', level: '钢琴二级' },
      { id: 2, name: '李华', avatar: '', status: '已结课', info: '剩余 0 课时', level: '入门启蒙' },
      { id: 3, name: '王梦莹', avatar: '', status: '在读', info: '剩余 8 课时', level: '钢琴四级' }
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