Component({
  properties: {
    title: { type: String, value: '' },
    extraText: { type: String, value: '' },
    showLine: { type: Boolean, value: false }
  },
  methods: {
    onExtraTap() {
      this.triggerEvent('extra');
    }
  }
});
