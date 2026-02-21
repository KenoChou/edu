import {
  ORDER_STATUS,
  filterOrdersByTab,
  getOrderStatusText
} from '../../utils/state.js';
import { getMyOrders } from '../../services/api.js';

const app = getApp();

function normalizeOrder(raw = {}) {
  return {
    id: raw.id || raw.orderId || raw.orderNo || '',
    childName: raw.childName || raw.studentName || '-',
    courseName: raw.courseName || raw.productName || '-',
    price: raw.price || raw.payAmount || '0.00',
    date: raw.date || raw.createTime || '',
    status: Number(raw.status) || ORDER_STATUS.PENDING_PAY
  };
}

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
      this.loadOrdersFromStore(state);
    });

    this.loadOrdersFromStore(app.getStore().getState());
    this.fetchOrders();
  },
  onShow() {
    this.fetchOrders();
  },
  onUnload() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  },
  async fetchOrders() {
    try {
      const result = await getMyOrders({ status: ORDER_STATUS.ALL, page: 1, pageSize: 50 });
      const list = Array.isArray(result) ? result : (result?.list || []);
      const normalized = list.map(normalizeOrder);
      app.getStore().setOrders(normalized);
    } catch (error) {
      console.warn('getMyOrders failed:', error);
    }
  },
  loadOrdersFromStore(state) {
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
