Page({
  data: {
    menuTop: 0,
    menuHeight: 0,
    certList: [
      { id: 1, name: '钢琴十级专业证书', date: '2023-05-12', status: '已认证', image: 'https://via.placeholder.com/300x200' },
      { id: 2, name: '全国音乐教师资格证', date: '2022-08-20', status: '审核中', image: '' }
    ]
  },
  onLoad() {
    const menu = wx.getMenuButtonBoundingClientRect();
    this.setData({
      menuTop: menu.top,
      menuHeight: menu.height
    });
  },
  uploadCert() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        wx.showLoading({ title: '上传中...' });
        setTimeout(() => {
          wx.hideLoading();
          wx.showToast({ title: '提交成功' });
        }, 1500);
      }
    });
  },
  goBack() {
    wx.navigateBack();
  }
})