Component({
  data: {
    selected: 0,
    color: "#999999",
    selectedColor: "#3a86ff",
    list: [{
      pagePath: "/pages/index/index",
      text: "选课",
      iconPath: "/assets/tabbar/home.png",
      selectedIconPath: "/assets/tabbar/home_active .png"
    }, {
      pagePath: "/pages/category/index",
      text: "课表",
      iconPath: "/assets/tabbar/calendar.png",
      selectedIconPath: "/assets/tabbar/calendar_active.png"
    }, {
      pagePath: "/pages/me/index",
      text: "我的",
      iconPath: "/assets/tabbar/user.png",
      selectedIconPath: "/assets/tabbar/user_active.png"
    }]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
    }
  }
})