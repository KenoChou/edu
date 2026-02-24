export const TEST_ACCOUNT = {
  phone: '13800000000',
  code: '123456',
  roleType: 0,
  profile: {
    name: '测试家长',
    userId: 'TEST10001',
    city: '北京'
  }
};

export const MOCK_COURSES = [
  {
    id: '1001',
    name: '少儿钢琴启蒙',
    category: '音乐',
    price: 200,
    desc: '菲伯尔教学法，趣味识谱与弹奏入门。',
    tags: ['线下授课', '含教材', '随时退'],
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300',
    hot: true
  },
  {
    id: '1002',
    name: '少儿篮球基础班',
    category: '体育',
    price: 180,
    desc: '提升协调性与团队意识，适合 6-10 岁儿童。',
    tags: ['小班制', '周末班', '可插班'],
    cover: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300',
    hot: true
  },
  {
    id: '1003',
    name: '创意美术色彩课',
    category: '美术',
    price: 160,
    desc: '通过主题创作激发想象力与表达能力。',
    tags: ['材料包', '主题创作'],
    cover: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=300',
    hot: false
  },
  {
    id: '1004',
    name: '少儿编程思维启蒙',
    category: '科学',
    price: 220,
    desc: '图形化编程入门，培养逻辑与问题解决能力。',
    tags: ['项目制', '进阶路径'],
    cover: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=300',
    hot: true
  }
];

export function getMockCourseById(id) {
  return MOCK_COURSES.find((item) => String(item.id) === String(id));
}

export function getHotMockCourse() {
  return MOCK_COURSES.find((item) => item.hot) || MOCK_COURSES[0];
}
