// utils/request.js
import config from '../config.js';

let loadingCount = 0;
let isRedirectingToLogin = false;

/* ===================== Loading 管理 ===================== */
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

/* ===================== 主请求方法 ===================== */
export const request = (options = {}) => {
  const {
    url,
    method = 'GET',
    data = {},
    header = {},
    noLoading = false,
    noAuth = false
  } = options;

  const token = wx.getStorageSync('token');
  const roleType = wx.getStorageSync('roleType'); // ⭐ 关键

  return new Promise((resolve, reject) => {
    if (!noLoading) showLoading();

    // 需要登录但没有 token
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

        // ⭐ 自动携带 token
        ...(token && !noAuth
          ? { Authorization: `Bearer ${token}` }
          : {}),

        // ⭐ 自动携带角色
        ...(roleType !== undefined
          ? { 'X-Role-Type': roleType }
          : {}),

        ...header
      },

      success(res) {
        const { statusCode, data: resData } = res;

        // HTTP 成功
        if (statusCode === 200) {
          if (resData.code === 0) {
            resolve(resData.data);
          }
          // Token 失效（后端业务态）
          else if (resData.code === 401) {
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

/* ===================== 401 统一处理 ===================== */
function handleUnauthorized() {
  wx.removeStorageSync('token');
  wx.removeStorageSync('roleType');
  redirectToLogin();
}

/* ===================== 跳登录页（防抖） ===================== */
function redirectToLogin() {
  if (isRedirectingToLogin) return;

  isRedirectingToLogin = true;

  wx.navigateTo({
    url: '/pages/login/login',
    complete() {
      setTimeout(() => {
        isRedirectingToLogin = false;
      }, 1500);
    }
  });
}
