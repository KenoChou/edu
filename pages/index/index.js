Page({
  data: {
    statusBarHeight: 20,
    navBarHeight: 44,
    menuWidth: 80,
    menus: [
      { id: 1, icon: '🏀', text: '体育' },
      { id: 2, icon: '🎹', text: '音乐' },
      { id: 3, icon: '🎨', text: '美术' },
      { id: 4, icon: '💃', text: '舞蹈' },
      { id: 5, icon: '🧪', text: '科学' },
      { id: 6, icon: '☕', text: '生活' },
      { id: 7, icon: '🌐', text: '语言' },
      { id: 8, icon: '🧩', text: '其他' },
      { id: 9, icon: '🔳', text: '全部' }
    ]
  },

  handleClick(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/category/index?id=${item.id}&text=${item.text}`
    });
  },

  goToNotice() {
    wx.navigateTo({ url: '/pages/notice/index' });
  },

  goToAllCategory() {
    wx.navigateTo({ url: '/pages/category/index?id=9&text=全部' });
  },

  goToCourseDetail() {
    wx.navigateTo({ url: '/pages/detail/index?id=1001' });
  },

  onLoad() {
    const sys = wx.getSystemInfoSync();
    const menu = wx.getMenuButtonBoundingClientRect();
    this.setData({
      statusBarHeight: sys.statusBarHeight,
      navBarHeight: (menu.top - sys.statusBarHeight) * 2 + menu.height,
      menuWidth: sys.screenWidth - menu.left + 10
    });
  }
});
