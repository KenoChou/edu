Page({
  data: {
    navTop: 0,
    navHeight: 0,
    studentList: []
  },

  onLoad() {
    const menuBtn = wx.getMenuButtonBoundingClientRect()
    this.setData({
      navTop: menuBtn.top,
      navHeight: menuBtn.height
    })
  },

  goBack() {
    wx.navigateBack();
  }
})
