import {
  ORDER_STATUS,
  filterOrdersByTab,
  getOrderStatusText
} from '../../utils/state.js';

const app = getApp();

Page({
  data: {
    navTop: 0,
    navHeight: 0,
    activeTab: ORDER_STATUS.ALL,
    tabs: ['全部', '待支付', '已完成', '退款'],
    orderList: [],
    sourceOrderList: []
  },
  onLoad() {
    const menuButton = wx.getMenuButtonBoundingClientRect();
    this.setData({
      navTop: menuButton.top,
      navHeight: menuButton.height
    });

    this.unsubscribe = app.getStore().subscribe((state) => {
      this.loadOrders(state);
    });

    this.loadOrders(app.getStore().getState());
  },
  onUnload() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  },
  loadOrders(state) {
    const sourceOrderList = (state.orders || []).map((order) => ({
      ...order,
      statusText: getOrderStatusText(order.status)
    }));

    this.setData({ sourceOrderList });
    this.applyFilter(this.data.activeTab);
  },
  applyFilter(activeTab) {
    const orderList = filterOrdersByTab(this.data.sourceOrderList, activeTab);
    this.setData({
      activeTab,
      orderList
    });
  },
  switchTab(e) {
    const activeTab = Number(e.currentTarget.dataset.index);
    this.applyFilter(activeTab);
  },
  onPayNow(e) {
    const { orderId } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/recharge/index?orderId=${orderId}` });
  },
  onViewContract(e) {
    const { orderId } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/detail/index?orderId=${orderId}` });
  },
  goBack() {
    wx.navigateBack();
  }
});
