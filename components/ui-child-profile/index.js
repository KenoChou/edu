Component({
  properties: {
    child: { type: Object, value: {} }
  },
  methods: {
    onSwitchTap() {
      this.triggerEvent('switch');
    }
  }
});
