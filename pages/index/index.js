Page({
  data: {
    statusBarHeight: 20,
    navBarHeight: 44,
    menuWidth: 80, // 胶囊宽度
    menus: [
      { icon: '🏀', text: '体育' }, { icon: '🎹', text: '音乐' },
      { icon: '🎨', text: '美术' }, { icon: '💃', text: '舞蹈' },
      { icon: '🧪', text: '科学' }, { icon: '☕', text: '生活' },
      { icon: '🌐', text: '语言' }, { icon: '🧩', text: '其他' },
      { icon: '🔳', text: '全部' }
    ]
  },
  onLoad() {
    const sys = wx.getSystemInfoSync();
    const menu = wx.getMenuButtonBoundingClientRect();
    this.setData({
      statusBarHeight: sys.statusBarHeight,
      navBarHeight: (menu.top - sys.statusBarHeight) * 2 + menu.height,
      menuWidth: sys.screenWidth - menu.left + 10 // 预留出胶囊宽度加间距
    });
  }
})