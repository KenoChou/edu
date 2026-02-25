Page({
  data: {
    navTop: 0,
    navHeight: 0,
    tabTop: 0,
    tabHeight: 0,
    contentPaddingTop: 0,
    // 可配置：tab 与内容之间的额外间距（像素）
    contentGap: 0,
    // 可配置：内容距 tab 的倍数（例如 2 => tabHeight * 2；0 => 无额外倍数）
    contentMultiplier: 0.08,
    tabOffset: 12, // 额外下移像素，可调整（增大以降低 tab）
    pendingCerts: [],
    currentIndex: 0, // swiper 当前索引
    loading: true,
    currentDetail: null,
    showDetail: false
  },
  onLoad() {
    // 获取胶囊按钮位置
    const menuButton = wx.getMenuButtonBoundingClientRect();
    // 先设置 nav 信息，并计算一个临时的 tabTop/contentPaddingTop
    const provisionalTabTop = menuButton.top + menuButton.height + (this.data.tabOffset || 0);
    const provisionalTabHeight = 60; // 预估 tab 高度
    const provisionalContentPadding = provisionalTabTop + provisionalTabHeight * (this.data.contentMultiplier || 1) + (this.data.contentGap || 0);
    this.setData({
      navTop: menuButton.top,
      navHeight: menuButton.height,
      tabTop: provisionalTabTop,
      contentPaddingTop: provisionalContentPadding
    });
    
    // 获取待审核的教师资质
    this.fetchPendingCerts();
  },
  onReady() {
    // 在渲染后测量 tab-bar 高度并计算固定位置与内容顶部间距
    const query = wx.createSelectorQuery();
    query.select('.tab-bar').boundingClientRect();
    query.exec((res) => {
      const tabRect = res[0] || { height: 0 };
      const tabHeight = tabRect.height || 0;
      const tabTop = this.data.navTop + this.data.navHeight + (this.data.tabOffset || 0);
      const contentPaddingTop = tabTop + tabHeight * (this.data.contentMultiplier || 1) + (this.data.contentGap || 0);
      this.setData({ tabTop, tabHeight, contentPaddingTop });
    });
  },
  fetchPendingCerts() {
    // Mock 数据
    const mockData = [
      {
        id: 1001,
        teacherName: '李老师',
        phone: '13800001111',
        certName: '钢琴十级证书',
        certImage: 'https://via.placeholder.com/300x200?text=Piano+Cert',
        applyDate: '2026-02-20',
        status: 'pending',
        certNo: 'CERT20260220001',
        yearsOfTeaching: 8,
        specialty: '钢琴'
      },
      {
        id: 1002,
        teacherName: '王老师',
        phone: '13800002222',
        certName: '全国音乐教师资格证',
        certImage: 'https://via.placeholder.com/300x200?text=Teacher+Cert',
        applyDate: '2026-02-21',
        status: 'pending',
        certNo: 'CERT20260221002',
        yearsOfTeaching: 12,
        specialty: '声乐'
      },
      {
        id: 1003,
        teacherName: '张老师',
        phone: '13800003333',
        certName: '钢琴初级证书',
        certImage: 'https://via.placeholder.com/300x200?text=Piano+Basic',
        applyDate: '2026-02-22',
        status: 'pending',
        certNo: 'CERT20260222003',
        yearsOfTeaching: 3,
        specialty: '钢琴'
      }
    ];
    
    this.setData({
      pendingCerts: mockData,
      loading: false
    });
  },
  switchTab(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({ currentIndex: index });
  },
  onSwiperChange(e) {
    this.setData({ currentIndex: e.detail.current });
  },
  showCertDetail(e) {
    const certId = e.currentTarget.dataset.id;
    const cert = this.data.pendingCerts.find(item => item.id === certId);
    this.setData({
      currentDetail: cert,
      showDetail: true
    });
  },
  hideCertDetail() {
    this.setData({ showDetail: false });
  },
  approveCert() {
    if (!this.data.currentDetail) return;
    
    wx.showToast({
      title: '已批准',
      icon: 'success',
      duration: 1500
    });
    
    this.hideCertDetail();
    // 刷新列表
    this.fetchPendingCerts();
  },
  rejectCert() {
    if (!this.data.currentDetail) return;
    
    wx.showModal({
      title: '拒绝申请',
      content: '请输入拒绝原因',
      editable: true,
      placeholderText: '输入拒绝原因...',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '已拒绝',
            icon: 'success',
            duration: 1500
          });
          this.hideCertDetail();
          this.fetchPendingCerts();
        }
      }
    });
  },
  goBack() {
    wx.navigateBack();
  }
})
