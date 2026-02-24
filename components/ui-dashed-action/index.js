Component({
  properties: {
    text: { type: String, value: '' },
    icon: { type: String, value: '+' }
  },
  methods: {
    onTap() {
      this.triggerEvent('tap');
    }
  }
});
