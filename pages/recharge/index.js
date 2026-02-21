// pages/recharge/recharge.js
import { createRechargeOrder } from '../../services/api.js';

Page({
  data: {
    activeId: 3,
    rechargeList: [
      { id: 1, value: '100', price: '100' },
      { id: 2, value: '300', price: '300' },
      { id: 3, value: '500', price: '500' },
      { id: 4, value: '1000', price: '1000' },
      { id: 5, value: '2000', price: '2000' },
      { id: 6, value: '5000', price: '5000' }
    ],
    isProcessing: false // 防止重复点击的状态位
  },

  goBack() {
    wx.navigateBack();
  },

  // 选中金额
  selectAmount(e) {
    this.setData({ activeId: e.currentTarget.dataset.id });
  },

  // --- 核心绑定函数 ---
  async handlePay() {
    // 1. 如果正在处理中，则直接返回
    if (this.data.isProcessing) return;
    
    this.setData({ isProcessing: true });
    const selectedId = this.data.activeId;

    try {
      // 2. 调用后端接口下单
      // 这里的 createRechargeOrder 是你刚才在 services/api.js 里封装好的
      const payParams = await createRechargeOrder(selectedId);

      // 3. 唤起微信收银台
      wx.requestPayment({
        ...payParams,
        success: (res) => {
          wx.showToast({ title: '充值成功', icon: 'success' });
          // 通知全局刷新余额
          getApp().globalData.needsRefresh = true;
          setTimeout(() => { wx.navigateBack(); }, 1500);
        },
        fail: (err) => {
          console.log('用户取消或支付失败', err);
          wx.showToast({ title: '支付未完成', icon: 'none' });
        }
      });
    } catch (error) {
      console.error('支付流程异常', error);
    } finally {
      // 4. 无论成功失败，恢复按钮可点击状态
      this.setData({ isProcessing: false });
    }
  }
});