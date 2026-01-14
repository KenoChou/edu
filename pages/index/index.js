Page({
  data: {
    statusBarHeight: 20,
    navBarHeight: 44,
    menuWidth: 80, // 胶囊宽度
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

  // 点击菜单
  handleClick(e) {
    const item = e.currentTarget.dataset.item; // 当前菜单对象
    wx.navigateTo({
      url: `/pages/category/index?id=${item.id}&text=${item.text}` // 传 id 和 text
    });
    console.log('点击了菜单:', item);
  },

  onLoad() {
    const sys = wx.getSystemInfoSync();
    const menu = wx.getMenuButtonBoundingClientRect();
    this.setData({
      statusBarHeight: sys.statusBarHeight,
      navBarHeight: (menu.top - sys.statusBarHeight) * 2 + menu.height,
      menuWidth: sys.screenWidth - menu.left + 10 // 预留出胶囊宽度加间距
    });
  },

  // 暂时不用
  onCategoryTap(e) {
    // const { id, name } = e.currentTarget.dataset;
    // wx.navigateTo({
    //   url: `/pages/index/index?categoryId=${id}&categoryName=${name}`
    // });
  }
});
