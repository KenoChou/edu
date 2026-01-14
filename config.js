// config.js
const ENV = 'development'; // 切换为 'production' 即可切换正式环境

const CONFIG = {
  development: {
    baseUrl: 'https://dev.api.yourdomain.com',
    appId: 'wx123456789'
  },
  production: {
    baseUrl: 'https://api.yourdomain.com',
    appId: 'wx123456789'
  }
};

export default CONFIG[ENV];
