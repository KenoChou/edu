// utils/request.js
import config from '../config.js';

export const request = (options) => {
  const token = wx.getStorageSync('token');
  
  return new Promise((resolve, reject) => {
    if (!options.noLoading) wx.showLoading({ title: '加载中', mask: true });

    wx.request({
      url: config.baseUrl + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Authorization': `Bearer ${token}`, // 这里的Token可以区分身份
        'Content-Type': 'application/json'
      },
      success: (res) => {
        if (res.statusCode === 200 && res.data.code === 0) {
          resolve(res.data.data);
        } else if (res.data.code === 401) {
          wx.navigateTo({ url: '/pages/login/login' }); // Token失效去登录
          reject('Unauthorized');
        } else {
          wx.showToast({ title: res.data.msg || '服务器错误', icon: 'none' });
          reject(res.data);
        }
      },
      fail: (err) => {
        wx.showToast({ title: '网络连接超时', icon: 'none' });
        reject(err);
      },
      complete: () => {
        if (!options.noLoading) wx.hideLoading();
      }
    });
  });
};