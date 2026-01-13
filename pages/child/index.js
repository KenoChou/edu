Page({
  data: {
    navTop: 0,
    navHeight: 0,
    activeChildIndex: 0,
    childList: [
      {
        id: 101,
        name: '小明',
        age: '7岁',
        gender: '男',
        avatar: '小',
        joinDate: '2023-05-20',
        courses: [
          { id: 1, name: '钢琴启蒙课', teacher: '陈老师', progress: '12/48', percent: 25 },
          { id: 2, name: '乐理基础', teacher: '王老师', progress: '5/20', percent: 25 }
        ]
      }
      // 可以继续添加其他孩子数据...
    ]
  },
  onLoad() {
    // 获取胶囊按钮的实时坐标
    const menuButton = wx.getMenuButtonBoundingClientRect();
    this.setData({
      navTop: menuButton.top,
      navHeight: menuButton.height
    });
  },
  switchChild() {
    const nextIndex = (this.data.activeChildIndex + 1) % this.data.childList.length;
    this.setData({ activeChildIndex: nextIndex });
  },
  goBack() {
    wx.navigateBack();
  }
})