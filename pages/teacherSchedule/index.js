import { getTeacherSchedule } from '../../services/api';

// Mock 数据（更多条目，供按学员分组显示）
const MOCK_SCHEDULE = [
  { id: 101, date: '2月22日', time: '10:00', course: '钢琴进阶课', student: '小明', level: '钢琴5级', duration: '60分钟', status: '已完成' },
  { id: 102, date: '2月22日', time: '11:30', course: '视唱练耳', student: '小明', level: '初级', duration: '40分钟', status: '已完成' },
  { id: 103, date: '2月21日', time: '14:30', course: '乐理基础课', student: '小红', level: '钢琴3级', duration: '45分钟', status: '已完成' },
  { id: 104, date: '2月21日', time: '16:00', course: '声乐训练课', student: '阿强', level: '乐理入门', duration: '50分钟', status: '已完成' },
  { id: 105, date: '2月20日', time: '09:30', course: '视唱练耳课', student: '小王', level: '初级', duration: '40分钟', status: '已完成' },
  { id: 106, date: '2月20日', time: '15:00', course: '钢琴陪练', student: '小红', level: '钢琴4级', duration: '30分钟', status: '已完成' },
  { id: 107, date: '2月19日', time: '10:00', course: '声乐进修', student: '阿强', level: '中级', duration: '60分钟', status: '已完成' },
  { id: 108, date: '2月18日', time: '13:00', course: '钢琴基础', student: '小明', level: '入门', duration: '45分钟', status: '已完成' }
];

Page({
  data: {
    navTop: 0,
    navHeight: 0,
    historyClasses: [],
    groupedByStudent: [],
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
      // 按学员分组
      const groups = {};
      MOCK_SCHEDULE.forEach((s) => {
        if (!groups[s.student]) groups[s.student] = [];
        groups[s.student].push(s);
      });

      const grouped = Object.keys(groups).map((student) => ({
        student,
        sessions: groups[student].sort((a,b) => {
          // 按日期+时间降序（近在上面），简单字符串比较即可用于 mock
          const ta = `${a.date} ${a.time}`;
          const tb = `${b.date} ${b.time}`;
          return tb.localeCompare(ta);
        })
      }));

      this.setData({
        historyClasses: MOCK_SCHEDULE,
        groupedByStudent: grouped,
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