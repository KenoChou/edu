Page({
  data: {
    statusBarHeight: 0,
    navHeight: 0,
    selectedTeacherId: 'ai',
    selectedTeacherName: '系统智能推荐',
    selectedTeacherTips: '根据您的需求匹配最合适的老师'
  },
  onLoad() {
    const sys = wx.getSystemInfoSync();
    const menu = wx.getMenuButtonBoundingClientRect();
    this.setData({
      statusBarHeight: sys.statusBarHeight,
      navHeight: menu.height + (menu.top - sys.statusBarHeight) * 2
    });
  },
  goBack() {
    wx.navigateBack();
  },
  onChangeTeacher() {
    wx.navigateTo({
      url: `/pages/selectTeacher/index?selectedId=${this.data.selectedTeacherId}`,
      success: (res) => {
        res.eventChannel.on('teacherSelected', (teacher) => {
          if (!teacher) return;
          this.setData({
            selectedTeacherId: teacher.id,
            selectedTeacherName: teacher.name,
            selectedTeacherTips: teacher.tips || ''
          });
        });
      }
    });
  }
});
