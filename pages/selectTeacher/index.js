Page({
  data: {
    statusBarHeight: 20,
    navHeight: 44,
    selectedId: 'ai',
    teachers: [
      {
        id: 'ai',
        name: '系统智能推荐',
        tips: '快速匹配 · 优选师资',
        type: 'ai'
      },
      {
        id: 'teacher1',
        name: '张雅琴',
        tips: '中央音乐学院 · 5年教龄',
        type: 'teacher'
      }
    ]
  },
  onLoad(options = {}) {
    const menuButton = wx.getMenuButtonBoundingClientRect();
    const systemInfo = wx.getSystemInfoSync();

    this.setData({
      statusBarHeight: systemInfo.statusBarHeight,
      navHeight: (menuButton.top - systemInfo.statusBarHeight) * 2 + menuButton.height,
      selectedId: options.selectedId || 'ai'
    });
  },
  goBack() {
    wx.navigateBack();
  },
  viewCert() {
    wx.navigateTo({ url: '/pages/certs/index' });
  },
  onSelect(e) {
    const { id } = e.currentTarget.dataset;
    const teacher = this.data.teachers.find((item) => item.id === id);

    if (!teacher) {
      return;
    }

    this.setData({ selectedId: id });

    const eventChannel = this.getOpenerEventChannel();
    eventChannel.emit('teacherSelected', teacher);
    wx.navigateBack();
  }
});
