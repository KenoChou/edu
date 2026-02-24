import {
  AUTH_STATUS,
  ROLE_TYPES
} from '../../utils/state.js';

const app = getApp();

const AUTH_STATUS_LABEL = {
  [AUTH_STATUS.UNVERIFIED]: '未认证',
  [AUTH_STATUS.PENDING]: '审核中',
  [AUTH_STATUS.VERIFIED]: '已认证',
  [AUTH_STATUS.REJECTED]: '审核失败'
};

const MENU_ROUTE_MAP = {
  家长版: {
    我的钱包: '/pages/account/index',
    我的孩子: '/pages/child/index',
    课时记录: '/pages/record/index',
    订单管理: '/pages/order/index'
  },
  教师版: {
    排课日程: '/pages/teacherSchedule/index',
    我的学员: '/pages/studentList/index',
    课酬结算: '/pages/income/index',
    请假审批: '/pages/apply/index',
    资质管理: '/pages/certs/index',
    消息通知: '/pages/notice/index',
    评价中心: '/pages/eval/index',
    更多: '/pages/notice/index'
  },
  通用: {
    实名认证: '/pages/verify/index',
    账号与安全: '/pages/login/index',
    联系客服: '/pages/notice/index',
    关于: '/pages/logs/logs'
  }
};

Page({
  data: {
    role: ROLE_TYPES.PARENT,
    navTop: 0,
    navHeight: 0,
    isLoggedIn: false,
    canShowTeacher: false,
    userName: '未登录用户',
    userId: '--',
    city: '--',
    authStatus: AUTH_STATUS.UNVERIFIED,
    authStatusText: AUTH_STATUS_LABEL[AUTH_STATUS.UNVERIFIED],
    parentMenus: [
      { name: '我的钱包', icon: '💰', color: 'blue' },
      { name: '我的孩子', icon: '👶', color: 'orange' },
      { name: '课时记录', icon: '📅', color: 'blue' },
      { name: '订单管理', icon: '📑', color: 'green' }
    ],
    teacherMenus: [
      { name: '排课日程', icon: '🗓️', color: 'blue' },
      { name: '我的学员', icon: '👥', color: 'indigo' },
      { name: '课酬结算', icon: '🧧', color: 'green' },
      { name: '请假审批', icon: '📝', color: 'red' },
      { name: '资质管理', icon: '🏅', color: 'orange' },
      { name: '消息通知', icon: '🔔', color: 'cyan' },
      { name: '评价中心', icon: '⭐', color: 'purple' },
      { name: '更多', icon: '...', color: 'gray' }
    ],
    settingList: ['实名认证', '账号与安全', '联系客服', '关于']
  },
  onLoad() {
    const res = wx.getMenuButtonBoundingClientRect();
    this.setData({
      navTop: res.top,
      navHeight: res.height
    });

    this.unsubscribe = app.getStore().subscribe((state) => {
      this.syncFromStore(state);
    });

    this.syncFromStore(app.getStore().getState());
  },
  onUnload() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  },
  syncFromStore(state) {
    const role = state?.session?.roleType ?? ROLE_TYPES.PARENT;
    const token = state?.session?.token || '';
    const isLoggedIn = !!token;
    const userProfile = state?.userProfile || {};
    const authStatus = userProfile.authStatus || AUTH_STATUS.UNVERIFIED;
    const canShowTeacher = isLoggedIn && role === ROLE_TYPES.TEACHER && authStatus === AUTH_STATUS.VERIFIED;

    this.setData({
      role,
      isLoggedIn,
      canShowTeacher,
      userName: isLoggedIn ? (userProfile.name || '李子轩') : '未登录用户',
      userId: isLoggedIn ? (userProfile.userId || '882930') : '--',
      city: isLoggedIn ? (userProfile.city || '北京') : '--',
      authStatus,
      authStatusText: AUTH_STATUS_LABEL[authStatus] || AUTH_STATUS_LABEL[AUTH_STATUS.UNVERIFIED]
    });
  },
  switchRole(e) {
    if (!this.data.isLoggedIn) {
      this.goLogin();
      return;
    }

    const role = parseInt(e.currentTarget.dataset.role, 10);
    if (role === ROLE_TYPES.TEACHER && this.data.authStatus !== AUTH_STATUS.VERIFIED) {
      wx.showToast({ title: '请先完成教师认证', icon: 'none' });
      return;
    }

    app.getStore().setSession({ roleType: role });
  },
  goLogin() {
    wx.navigateTo({ url: '/pages/login/index' });
  },
  onAvatarTap() {
    if (!this.data.isLoggedIn) {
      this.goLogin();
    }
  },
  navigateTo(path) {
    if (!path) {
      wx.showToast({ title: '功能开发中', icon: 'none' });
      return;
    }

    const tabPages = ['/pages/index/index', '/pages/calendar/index', '/pages/me/index'];
    if (tabPages.includes(path)) {
      wx.switchTab({ url: path });
      return;
    }

    wx.navigateTo({ url: path });
  },
  onMenuTap(e) {
    if (!this.data.isLoggedIn) {
      this.goLogin();
      return;
    }

    const { name } = e.currentTarget.dataset;
    const scene = this.data.canShowTeacher ? '教师版' : '家长版';
    const path = MENU_ROUTE_MAP[scene][name];
    this.navigateTo(path);
  },
  onSettingTap(e) {
    const { name } = e.currentTarget.dataset;
    const path = MENU_ROUTE_MAP.通用[name];
    this.navigateTo(path);
  },
  onBannerTap() {
    if (!this.data.isLoggedIn) {
      this.goLogin();
      return;
    }

    const path = '/pages/certs/index';
    this.navigateTo(path);
  },
  onLogout() {
    app.getStore().clearSession();
    wx.reLaunch({ url: '/pages/login/index' });
  }
});
