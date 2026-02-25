Component({
  properties: {
    top: { type: Number, value: 0 },
    height: { type: Number, value: 44 },
    title: { type: String, value: '' },
    background: { type: String, value: '#f7f8fa' },
    backIcon: { type: String, value: '←' },
    fixed: { type: Boolean, value: true }
  },
  methods: {
    onBackTap() {
      this.triggerEvent('back');
    },
    goBack() {
      wx.navigateBack();
    }
  }
  
});
