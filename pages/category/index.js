Page({
  data: {
    statusBarHeight: 0,
    navHeight: 0,
    searchWidth: 0,
    tabs: ['全部', '手工制作', '茶艺', '烘焙', '烹饪', '园艺'],
    currentTab: 0
  },
  onLoad() {
    const sys = wx.getSystemInfoSync();
    const menu = wx.getMenuButtonBoundingClientRect();
    
    // 计算导航栏高度和搜索框可用宽度
    this.setData({
      statusBarHeight: sys.statusBarHeight,
      navHeight: menu.height + (menu.top - sys.statusBarHeight) * 2,
      // 搜索框宽度 = 胶囊左边界 - 返回键宽度(80) - 边距(20)
      searchWidth: menu.left - 60 
    });
  },
  goBack() { wx.navigateBack(); },
  switchTab(e) { this.setData({ currentTab: e.currentTarget.dataset.index }); }
})