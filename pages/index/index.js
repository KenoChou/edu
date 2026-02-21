Page({
  data: {
    statusBarHeight: 20,
    navBarHeight: 44,
    menuWidth: 80,
    showCampusSheet: false,
    currentCampus: '北京朝阳校区',
    campusList: [
      { id: 'bj-cy', name: '北京朝阳校区', address: '朝阳区望京街道 88 号' },
      { id: 'bj-hd', name: '北京海淀校区', address: '海淀区中关村南大街 27 号' },
      { id: 'sh-pd', name: '上海浦东校区', address: '浦东新区张杨路 500 号' },
      { id: 'gz-th', name: '广州天河校区', address: '天河区体育西路 102 号' }
    ],
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

  openCampusSheet() {
    this.setData({ showCampusSheet: true });
  },

  closeCampusSheet() {
    this.setData({ showCampusSheet: false });
  },

  selectCampus(e) {
    const { name } = e.currentTarget.dataset;
    this.setData({
      currentCampus: name,
      showCampusSheet: false
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
