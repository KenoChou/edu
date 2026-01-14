// services/api.js
import { request } from '../utils/request.js';

// 获取用户信息（包含余额、身份等）
export const getUserProfile = () => request({ url: '/user/profile' });

// 获取钱包账单流水
export const getWalletBills = (page) => request({ 
  url: '/wallet/bills', 
  data: { page } 
});

// 充值中心：创建预支付订单
export const createRechargeOrder = (amountId) => request({
  url: '/pay/recharge/create',
  method: 'POST',
  data: { amountId }
});

// 充值中心：获取充值金额配置（用于展示 100/300/500 那几个格子）
export const getRechargeConfig = () => request({ url: '/pay/config' });