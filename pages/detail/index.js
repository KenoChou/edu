import { createCourseOrder, getCourseDetail } from '../../services/api.js';
import { getMockCourseById } from '../../mocks/demo.js';

function buildDefaultPackages(basePrice = 200) {
  return [
    { id: 'pkg_12', title: '12课时体验包', lessons: 12, totalPrice: basePrice * 12, active: true },
    { id: 'pkg_24', title: '24课时进阶包', lessons: 24, totalPrice: basePrice * 24, active: false }
  ];
}

Page({
  data: {
    statusBarHeight: 0,
    navHeight: 0,
    loading: false,
    submitting: false,
    courseId: '',
    courseName: '少儿钢琴启蒙',
    coursePrice: 200,
    courseDesc: '菲伯尔教学法，通过趣味识谱和律动练习，让孩子在快乐中开启音乐之旅。课程包含基础乐理与初步弹奏技巧。',
    courseTags: ['线下授课', '含教材', '随时退'],
    selectedTeacherId: 'ai',
    selectedTeacherName: '系统智能推荐',
    selectedTeacherTips: '根据您的需求匹配最合适的老师',
    packageList: buildDefaultPackages(),
    remark: '',
    agreed: true,
    isFavorite: false
  },
  onLoad(options = {}) {
    const sys = wx.getSystemInfoSync();
    const menu = wx.getMenuButtonBoundingClientRect();
    this.setData({
      statusBarHeight: sys.statusBarHeight,
      navHeight: menu.height + (menu.top - sys.statusBarHeight) * 2,
      courseId: options.id || ''
    });

    this.fetchCourseDetail();
    this.syncFavoriteState(options.id || 'default');
  },
  async fetchCourseDetail() {
    if (!this.data.courseId) return;

    this.setData({ loading: true });

    try {
      const detail = await getCourseDetail(this.data.courseId);
      const unitPrice = Number(detail?.price || 200);

      this.setData({
        courseName: detail?.name || detail?.title || '少儿钢琴启蒙',
        coursePrice: unitPrice,
        courseDesc: detail?.desc || detail?.introduction || this.data.courseDesc,
        courseTags: detail?.tags || ['线下授课', '含教材', '随时退'],
        packageList: buildDefaultPackages(unitPrice)
      });
    } catch (error) {
      const mockDetail = getMockCourseById(this.data.courseId);
      if (mockDetail) {
        this.setData({
          courseName: mockDetail.name,
          coursePrice: Number(mockDetail.price || 200),
          courseDesc: mockDetail.desc || this.data.courseDesc,
          courseTags: mockDetail.tags || ['线下授课', '含教材', '随时退'],
          packageList: buildDefaultPackages(Number(mockDetail.price || 200))
        });
      }
      console.warn('getCourseDetail failed:', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  syncFavoriteState(courseId) {
    const favoriteIds = wx.getStorageSync('favoriteCourseIds') || [];
    const key = String(courseId || 'default');
    this.setData({
      courseId: key,
      isFavorite: favoriteIds.includes(key)
    });
  },
  toggleFavorite() {
    const key = String(this.data.courseId || 'default');
    const favoriteIds = wx.getStorageSync('favoriteCourseIds') || [];
    const hasFavorite = favoriteIds.includes(key);
    const nextList = hasFavorite
      ? favoriteIds.filter((id) => id !== key)
      : [...favoriteIds, key];

    wx.setStorageSync('favoriteCourseIds', nextList);
    this.setData({ isFavorite: !hasFavorite });
    wx.showToast({
      title: hasFavorite ? '已取消收藏' : '已收藏课程',
      icon: 'none'
    });
  },
  goBack() {
    wx.navigateBack();
  },
  onChangeTeacher() {
    wx.navigateTo({
      url: `/pages/selectTeacher/index?selectedId=${this.data.selectedTeacherId}`,
      success: (res) => {
        res.eventChannel.on('teacherSelected', (teacher) => {
          if (!teacher) return;
          this.setData({
            selectedTeacherId: teacher.id,
            selectedTeacherName: teacher.name,
            selectedTeacherTips: teacher.tips || ''
          });
        });
      }
    });
  },
  onSelectPackage(e) {
    const { id } = e.currentTarget.dataset;
    const packageList = this.data.packageList.map((item) => ({
      ...item,
      active: item.id === id
    }));
    this.setData({ packageList });
  },
  onRemarkInput(e) {
    this.setData({ remark: (e.detail.value || '').trim() });
  },
  toggleAgree() {
    this.setData({ agreed: !this.data.agreed });
  },
  async handleSubmitOrder() {
    if (this.data.submitting) return;

    if (!this.data.agreed) {
      wx.showToast({ title: '请先阅读并同意协议', icon: 'none' });
      return;
    }

    const selectedPackage = this.data.packageList.find((item) => item.active);
    if (!selectedPackage) {
      wx.showToast({ title: '请选择课时套餐', icon: 'none' });
      return;
    }

    this.setData({ submitting: true });

    try {
      await createCourseOrder({
        courseId: this.data.courseId,
        teacherId: this.data.selectedTeacherId,
        packageId: selectedPackage.id,
        packageLessons: selectedPackage.lessons,
        remark: this.data.remark
      });

      wx.showToast({ title: '下单成功', icon: 'success' });
      setTimeout(() => {
        wx.navigateTo({ url: '/pages/order/index' });
      }, 300);
    } catch (error) {
      console.warn('createCourseOrder failed:', error);
      wx.showToast({ title: '下单接口暂不可用，已进入演示流程', icon: 'none' });
      setTimeout(() => {
        wx.navigateTo({ url: '/pages/order/index' });
      }, 300);
    } finally {
      this.setData({ submitting: false });
    }
  }
});
