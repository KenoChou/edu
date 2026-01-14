// services/api.js
import { request } from '../utils/request.js';

/* ===================== 用户与登录 ===================== */
export const login = (code) =>
  request({ url: '/auth/login', method: 'POST', data: { code } });

export const getUserProfile = () =>
  request({ url: '/user/profile' });

export const updateUserInfo = (data) =>
  request({ url: '/user/update', method: 'POST', data });

/* ===================== 角色与身份 ===================== */
export const getMyRoles = () =>
  request({ url: '/user/roles' });

export const switchRole = (roleType) =>
  request({
    url: '/user/switch-role',
    method: 'POST',
    data: { roleType }
  });

/* ===================== 教师认证 ===================== */
export const getTeacherAuthStatus = () =>
  request({ url: '/teacher/auth-status' });

export const submitTeacherAuth = (data) =>
  request({
    url: '/teacher/apply',
    method: 'POST',
    data
  });

/* ===================== 钱包与支付 ===================== */
export const getWalletInfo = () =>
  request({ url: '/wallet/info' });

export const getWalletDetail = () =>
  request({ url: '/wallet/detail' });

export const getBillList = (params) =>
  request({
    url: '/wallet/bills',
    data: params
  });

export const getRechargeOptions = () =>
  request({ url: '/pay/config-list' });

export const createPayOrder = (configId) =>
  request({
    url: '/pay/order/create',
    method: 'POST',
    data: { configId }
  });

export const queryPayStatus = (orderNo) =>
  request({
    url: '/pay/order/status',
    data: { orderNo }
  });

/* ===================== 资产 / 积分 / 优惠券 ===================== */
export const getUserAssetsSummary = () =>
  request({ url: '/user/assets/summary' });

export const getPointsMall = () =>
  request({ url: '/points/goods' });

export const getMyCoupons = (status) =>
  request({
    url: '/coupon/my-list',
    data: { status }
  });

/* ===================== 孩子管理 ===================== */
export const getChildrenList = () =>
  request({ url: '/user/children' });

export const saveChildInfo = (data) =>
  request({
    url: '/user/child/save',
    method: 'POST',
    data
  });

export const updateChildInfo = (data) =>
  request({
    url: '/user/child/update',
    method: 'POST',
    data
  });

/* ===================== 课时与学习 ===================== */
export const getStudentLessons = () =>
  request({ url: '/edu/student/lesson-stats' });

export const getLessonDetail = (lessonId) =>
  request({ url: `/edu/lesson/detail/${lessonId}` });

export const getLessonLogs = (params) =>
  request({
    url: '/edu/lesson/logs',
    data: params
  });

export const getUsageLogs = (params) =>
  request({
    url: '/edu/lesson/usage-logs',
    data: params
  });

export const getLessonHistory = (params) =>
  request({
    url: '/lesson/history',
    data: params
  });

export const getLessonReport = () =>
  request({ url: '/lesson/report' });

/* ===================== 课程与探索 ===================== */
export const getCourseCategories = () =>
  request({ url: '/course/categories' });

export const getCourseList = (params) =>
  request({
    url: '/course/list',
    data: {
      page: params.page || 1,
      pageSize: params.pageSize || 10,
      categoryId: params.categoryId || '',
      keyword: params.keyword || '',
      sort: params.sort || 'default'
    }
  });

export const getCourseDetail = (id) =>
  request({ url: `/course/detail/${id}` });

export const getHotCourses = (limit = 4) =>
  request({
    url: '/course/hot-recommend',
    data: { limit }
  });

/* ===================== 订单 ===================== */
export const getMyOrders = (status = 'all') =>
  request({
    url: '/order/my-list',
    data: { status }
  });

export const getOrderDetail = (orderId) =>
  request({ url: `/order/detail/${orderId}` });

export const cancelOrder = (orderId) =>
  request({
    url: '/order/cancel',
    method: 'POST',
    data: { orderId }
  });

/* ===================== 教师业务 ===================== */
export const getTeacherStats = () =>
  request({ url: '/teacher/dashboard-stats' });

export const getTeacherStudents = () =>
  request({ url: '/teacher/students' });

export const getTeacherSchedule = (params) =>
  request({
    url: '/teacher/schedule',
    data: params
  });

export const submitAttendance = (data) =>
  request({
    url: '/teacher/check-in',
    method: 'POST',
    data
  });

export const getSalarySettlement = () =>
  request({ url: '/teacher/salary/list' });

/* ===================== 请假与审批 ===================== */
export const getLeaveApplications = () =>
  request({ url: '/teacher/leave/list' });

export const auditLeave = (data) =>
  request({
    url: '/teacher/leave/audit',
    method: 'POST',
    data
  });

/* ===================== 评价与消息 ===================== */
export const getMyReviews = (page) =>
  request({
    url: '/teacher/reviews',
    data: { page }
  });

export const getUnreadCount = () =>
  request({
    url: '/msg/unread-count',
    noLoading: true
  });

export const getMsgList = (type) =>
  request({
    url: '/msg/list',
    data: { type }
  });

export const readMsg = (id) =>
  request({
    url: '/msg/read',
    method: 'POST',
    data: { id }
  });

/* ===================== 系统与公共 ===================== */
export const getSystemConfig = () =>
  request({ url: '/sys/settings' });

export const getHomeConfig = () =>
  request({ url: '/home/config' });

export const getNotifications = () =>
  request({ url: '/sys/notifications' });

export const getMoreTools = () =>
  request({ url: '/sys/tools/more' });
