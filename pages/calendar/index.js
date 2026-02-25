import { getTeacherSchedule } from '../../services/api.js';

const STATUS_MAP = {
  upcoming: { left: '待开始', right: '待上课', color: 'blue' },
  ongoing: { left: '进行中', right: '上课中', color: 'orange' },
  finished: { left: '已结束', right: '已完成', color: 'gray' },
  canceled: { left: '已取消', right: '已取消', color: 'gray' }
};

function buildDateList() {
  const list = [];
  const weekMap = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const now = new Date();

  for (let i = 0; i < 6; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    list.push({
      key: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
      week: weekMap[d.getDay()],
      date: `${d.getDate()}`,
      active: i === 0,
      fullDate: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    });
  }

  return list;
}

function normalizeScheduleItem(item = {}) {
  const rawStatus = item.status || item.lessonStatus || 'upcoming';
  const mapped = STATUS_MAP[rawStatus] || STATUS_MAP.upcoming;
  const studentName = item.studentName || item.childName || '待分配';

  return {
    id: item.id || item.lessonId || `${item.time || '00:00'}_${studentName}`,
    time: item.time || item.startTime || '--:--',
    title: item.title || item.courseName || '课程安排',
    student: studentName,
    sFirst: studentName.slice(0, 1) || '-',
    room: item.room || item.classroom || '待定教室',
    leftStatus: mapped.left,
    rightStatus: mapped.right,
    color: item.color || mapped.color
  };
}

/* ========================= */
/* 新增：按人员分组函数 */
/* ========================= */
function groupByPerson(list = []) {
  const map = {};

  list.forEach(item => {
    if (!map[item.student]) {
      map[item.student] = {
        person: item.student,
        first: item.sFirst,
        color: item.color,
        courses: []
      };
    }
    map[item.student].courses.push(item);
  });

  return Object.values(map);
}

Page({
  data: {
    statusBarHeight: 20,
    navHeight: 44,
    viewMode: 'time',
    loading: false,
    days: buildDateList(),
    selectedDate: '',
    courseList: [],
    personCourseList: [] // 新增
  },

  onLoad() {
    const sys = wx.getSystemInfoSync();
    const menu = wx.getMenuButtonBoundingClientRect();
    const days = buildDateList();

    this.setData({
      statusBarHeight: sys.statusBarHeight,
      navHeight: (menu.top - sys.statusBarHeight) * 2 + menu.height,
      days,
      selectedDate: days[0]?.fullDate || ''
    });

    this.fetchSchedule();
  },

  /* ========================= */
  /* 模式切换（不再重复请求） */
  /* ========================= */
  switchViewMode(e) {
    const mode = e.currentTarget.dataset.mode;
    if (!mode || mode === this.data.viewMode) return;

    this.setData({
      viewMode: mode
    });
  },

  onSelectDay(e) {
    const { key } = e.currentTarget.dataset;
    const days = this.data.days.map((item) => ({
      ...item,
      active: item.key === key
    }));
    const selected = days.find((item) => item.active);

    this.setData({
      days,
      selectedDate: selected?.fullDate || ''
    });

    this.fetchSchedule();
  },

  async fetchSchedule() {
    this.setData({ loading: true });

    try {
      const res = await getTeacherSchedule({
        date: this.data.selectedDate
      });

      const rawList = Array.isArray(res) ? res : (res?.list || []);
      const normalizedList = rawList.map(normalizeScheduleItem);

      this.setData({
        courseList: normalizedList,
        personCourseList: groupByPerson(normalizedList)
      });

    } catch (error) {

      const mockList = [
        normalizeScheduleItem({
          id: 'mock_1',
          time: '14:00',
          title: '钢琴一对一',
          studentName: '王小明',
          room: '302',
          status: 'ongoing'
        }),
        normalizeScheduleItem({
          id: 'mock_2',
          time: '16:00',
          title: '少儿合唱排练',
          studentName: '李萌萌',
          room: '多功能厅',
          status: 'upcoming'
        }),
        normalizeScheduleItem({
          id: 'mock_3',
          time: '18:00',
          title: '吉他提升课',
          studentName: '王小明',
          room: '305',
          status: 'finished'
        })
      ];

      this.setData({
        courseList: mockList,
        personCourseList: groupByPerson(mockList)
      });

      console.warn('getTeacherSchedule failed:', error);

    } finally {
      this.setData({ loading: false });
    }
  }
});