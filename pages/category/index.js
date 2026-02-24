import { MOCK_COURSES } from '../../mocks/demo.js';

Page({
  data: {
    statusBarHeight: 0,
    navHeight: 0,
    searchWidth: 0,
    tabs: [],
    currentTab: 0,
    menuId: null,
    menuText: '',
    displayedCourses: []
  },

  onLoad(options) {
    const menuId = options.id || null;
    const menuText = options.text || '';
    const tabs = ['体育', '音乐', '美术', '舞蹈', '科学', '生活', '语言', '其他', '全部'];
    const tabIndex = tabs.indexOf(menuText);

    if (tabIndex > 0) {
      const selected = tabs.splice(tabIndex, 1)[0];
      tabs.unshift(selected);
    }

    this.setData({
      menuId,
      menuText,
      tabs,
      currentTab: 0
    });

    const sys = wx.getSystemInfoSync();
    const menu = wx.getMenuButtonBoundingClientRect();
    this.setData({
      statusBarHeight: sys.statusBarHeight,
      navHeight: menu.height + (menu.top - sys.statusBarHeight) * 2,
      searchWidth: menu.left - 60
    });

    this.loadContent();
  },

  loadContent() {
    const activeTabName = this.data.tabs[this.data.currentTab] || '全部';
    const displayedCourses = activeTabName === '全部'
      ? MOCK_COURSES
      : MOCK_COURSES.filter((item) => item.category === activeTabName);

    this.setData({ displayedCourses });
  },

  goBack() {
    wx.navigateBack();
  },

  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ currentTab: index });
    this.loadContent();
  },

  goToDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/detail/index?id=${id}` });
  }
});
