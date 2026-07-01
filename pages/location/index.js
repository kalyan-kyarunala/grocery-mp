var app = getApp();
Page({
  data: { address: '' },
  onLoad() { this.setData({ address: app.globalData.address }); },
  onAddressInput(e) { this.setData({ address: e.detail.value }); },
  clearAddress() { this.setData({ address: '' }); },
  confirmAddress() {
    if (!this.data.address) return;
    app.globalData.address = this.data.address;
    my.navigateBack();
  },
  useCurrentLocation() {
    app.globalData.address = 'Kuala Lumpur';
    my.showToast({ content: 'Using current location', type: 'none' });
    my.navigateBack();
  },
  close() { my.navigateBack(); }
});
