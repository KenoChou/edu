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
    // 显示资质弹窗（使用示例数据或真实数据请求）
    const cert = {
      id: 1,
      name: '钢琴十级证书',
      date: '2023-05-12',
      status: '已认证',
      image: 'https://via.placeholder.com/600x400?text=Cert+Image',
      issuer: '国家音乐学院'
    };
    this.setData({ modalCert: cert, showCertModal: true });
  },
  noop() {},
  hideCertModal() {
    this.setData({ showCertModal: false, modalCert: null });
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
