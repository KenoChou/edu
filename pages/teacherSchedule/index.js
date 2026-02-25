import { getTeacherSchedule } from '../../services/api';

// Mock 数据
const MOCK_SCHEDULE = [
  {
    id: 101,
    date: '2月22日',
    time: '10:00',
    course: '钢琴进阶课',
    student: '小明',
    level: '钢琴5级',
    duration: '60分钟',
    status: '已完成'
  },
  {
    id: 102,
    date: '2月21日',
    time: '14:30',
    course: '乐理基础课',
    student: '小红',
    level: '钢琴3级',
    duration: '45分钟',
    status: '已完成'
  },
  {
    id: 103,
    date: '2月20日',
    time: '16:00',
    course: '声乐训练课',
    student: '阿强',
    level: '乐理入门',
    duration: '50分钟',
    status: '已完成'
  },
  {
    id: 104,
    date: '2月19日',
    time: '09:30',
    course: '视唱练耳课',
    student: '小王',
    level: '初级',
    duration: '40分钟',
    status: '已完成'
  }
];

Page({
  data: {
    navTop: 0,
    navHeight: 0,
    historyClasses: [],
    loading: true,
    useMock: true
  },
  onLoad() {
    // 核心：获取胶囊按钮位置
    const menuButton = wx.getMenuButtonBoundingClientRect();
    this.setData({
      navTop: menuButton.top,
      navHeight: menuButton.height
    });
    
    // 获取排课数据
    this.fetchScheduleData();
  },
  fetchScheduleData() {
    // 如果使用mock数据，直接显示
    if (this.data.useMock) {
      this.setData({
        historyClasses: MOCK_SCHEDULE,
        loading: false
      });
      return;
    }
    
    getTeacherSchedule()
      .then(res => {
        if (res.code === 200 && res.data) {
          this.setData({
            historyClasses: res.data,
            loading: false
          });
        }
      })
      .catch(err => {
        console.error('获取排课数据失败:', err);
        this.setData({ loading: false });
      });
  },
  goBack() { wx.navigateBack(); }
})