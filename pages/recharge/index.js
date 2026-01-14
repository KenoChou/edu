Page({
  data: {
    activeId: 3, // 默认选中500元
    rechargeList: [
      { id: 1, value: '100', price: '100' },
      { id: 2, value: '300', price: '300' },
      { id: 3, value: '500', price: '500' },
      { id: 4, value: '1000', price: '1000' },
      { id: 5, value: '2000', price: '2000' },
      { id: 6, value: '5000', price: '5000' }
    ]
  },
  selectAmount(e) {
    this.setData({ activeId: e.currentTarget.dataset.id });
  },
  goBack() {
    wx.navigateBack();
  }
})