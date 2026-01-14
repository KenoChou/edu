Page({
  data: {
    statusBarHeight: 0,
    navHeight: 0,
    searchWidth: 0,
    tabs: [],        // 动态 tabs
    currentTab: 0,   // 当前高亮 tab
    menuId: null,
    menuText: ''
  },

  onLoad(options) {
    const menuId = options.id || null;
    const menuText = options.text || '';

    // 原始 tabs 列表（可以从接口或菜单页获取）
    let tabs = ['体育','音乐','美术','舞蹈','科学','生活','语言','其他','全部'];

    // 找到点击的分类索引
    const tabIndex = tabs.indexOf(menuText);

    // 如果找到，把它放到首位
    if (tabIndex > 0) {
      const selected = tabs.splice(tabIndex, 1)[0]; // 移除选中
      tabs.unshift(selected); // 插入首位
    }

    this.setData({
      menuId,
      menuText,
      tabs,
      currentTab: 0 // 因为选中的分类现在在首位，所以高亮索引是 0
    });

    // 计算导航栏高度和搜索栏宽度
    const sys = wx.getSystemInfoSync();
    const menu = wx.getMenuButtonBoundingClientRect();
    this.setData({
      statusBarHeight: sys.statusBarHeight,
      navHeight: menu.height + (menu.top - sys.statusBarHeight) * 2,
      searchWidth: menu.left - 60
    });

    console.log('详情页收到菜单 id:', menuId, 'text:', menuText, '高亮 tab:', this.data.currentTab);
    
    // 根据 id 加载内容
    this.loadContent(menuId);
  },

  loadContent(id) {
    console.log('加载分类内容，菜单 id:', id);
    // 可以在这里请求接口或者筛选列表
  },

  goBack() {
    wx.navigateBack();
  },

  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ currentTab: index });
    console.log('切换到 tab:', this.data.tabs[index]);
    // 可以刷新内容
  }
});
