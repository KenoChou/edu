import { AUTH_STATUS, ROLE_TYPES } from '../../utils/state.js';

const app = getApp();

const VERIFIED_CERT_LIST = [
  { id: 1, name: '钢琴十级专业证书', date: '2023-05-12', status: '已认证', image: 'https://via.placeholder.com/300x200' },
  { id: 2, name: '全国音乐教师资格证', date: '2022-08-20', status: '已认证', image: 'https://via.placeholder.com/300x200?text=Teacher+Cert' }
];

const PENDING_CERT_LIST = [
  { id: 1, name: '钢琴十级专业证书', date: '2023-05-12', status: '已认证', image: 'https://via.placeholder.com/300x200' },
  { id: 2, name: '全国音乐教师资格证', date: '2022-08-20', status: '审核中', image: '' }
];

Page({
  data: {
    menuTop: 0,
    menuHeight: 0,
    authStatus: AUTH_STATUS.UNVERIFIED,
    certList: PENDING_CERT_LIST
  },
  onLoad() {
    const menu = wx.getMenuButtonBoundingClientRect();
    this.setData({
      menuTop: menu.top,
      menuHeight: menu.height
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
    const authStatus = state?.userProfile?.authStatus || AUTH_STATUS.UNVERIFIED;
    this.setData({
      authStatus,
      certList: authStatus === AUTH_STATUS.VERIFIED ? VERIFIED_CERT_LIST : PENDING_CERT_LIST
    });
  },
  mockVerifySuccess() {
    app.getStore().setState((state) => ({
      session: {
        ...state.session,
        roleType: ROLE_TYPES.TEACHER
      },
      userProfile: {
        ...state.userProfile,
        authStatus: AUTH_STATUS.VERIFIED
      }
    }));

    wx.showToast({ title: '教师认证已通过（Mock）', icon: 'success' });
  },
  uploadCert() {
    wx.chooseImage({
      count: 1,
      success: () => {
        wx.showLoading({ title: '上传中...' });
        setTimeout(() => {
          wx.hideLoading();
          wx.showToast({ title: '提交成功' });
        }, 1000);
      }
    });
  },
  goBack() {
    wx.navigateBack();
  }
});
