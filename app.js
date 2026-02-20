import store from './utils/store.js';

// app.js
App({
  onLaunch() {
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    store.init();

    wx.login({
      success: () => {
        // 发送 code 到后台换取 openId/session
      }
    });
  },
  globalData: {
    userInfo: null
  },
  getStore() {
    return store;
  }
});
