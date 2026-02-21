// utils/request.js
import config from '../config.js';
import { STORAGE_KEYS } from './state.js';
import store from './store.js';

let loadingCount = 0;
let isRedirectingToLogin = false;

function showLoading() {
  if (loadingCount === 0) {
    wx.showLoading({ title: '加载中', mask: true });
  }
  loadingCount++;
}

function hideLoading() {
  loadingCount--;
  if (loadingCount <= 0) {
    loadingCount = 0;
    wx.hideLoading();
  }
}

export const request = (options = {}) => {
  const {
    url,
    method = 'GET',
    data = {},
    header = {},
    noLoading = false,
    noAuth = false
  } = options;

  const state = store.getState();
  const token = state.session?.token || wx.getStorageSync(STORAGE_KEYS.TOKEN);
  const roleType = state.session?.roleType;

  return new Promise((resolve, reject) => {
    if (!noLoading) showLoading();

    if (!token && !noAuth) {
      redirectToLogin();
      !noLoading && hideLoading();
      return reject('NO_TOKEN');
    }

    wx.request({
      url: config.baseUrl + url,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        ...(token && !noAuth ? { Authorization: `Bearer ${token}` } : {}),
        ...(roleType !== undefined ? { 'X-Role-Type': roleType } : {}),
        ...header
      },
      success(res) {
        const { statusCode, data: resData } = res;

        if (statusCode === 200) {
          if (resData.code === 0) {
            resolve(resData.data);
          } else if (resData.code === 401) {
            handleUnauthorized();
            reject(resData);
          } else {
            wx.showToast({
              title: resData.msg || '请求失败',
              icon: 'none'
            });
            reject(resData);
          }
        } else if (statusCode === 401) {
          handleUnauthorized();
          reject(res);
        } else {
          wx.showToast({
            title: `网络错误(${statusCode})`,
            icon: 'none'
          });
          reject(res);
        }
      },
      fail(err) {
        wx.showToast({
          title: '网络异常，请检查网络',
          icon: 'none'
        });
        reject(err);
      },
      complete() {
        if (!noLoading) hideLoading();
      }
    });
  });
};

function handleUnauthorized() {
  store.clearSession();
  redirectToLogin();
}

function redirectToLogin() {
  if (isRedirectingToLogin) return;

  isRedirectingToLogin = true;

  wx.navigateTo({
    url: '/pages/login/index',
    complete() {
      setTimeout(() => {
        isRedirectingToLogin = false;
      }, 1500);
    }
  });
}
