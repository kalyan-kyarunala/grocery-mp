var app = getApp();
Page({
  data: {
    address: app.globalData.address,
    filters: ['All', 'Nearby', 'Open now', 'Promo', 'Free delivery'],
    activeFilter: 'All',
    outlets: [
      { id: 'jg', name: 'Jaya Grocer — Mid Valley', rating: '4.8', distance: '1.2 km', eta: '25 min', badge: '20% OFF', bg: '#E8EEFB', iconColor: '#1A56DB', image: '/images/store1.jpeg' },
      { id: 'vg', name: 'Village Grocer — The Gardens', rating: '4.6', distance: '2.0 km', eta: '30 min', badge: '', bg: '#E9F7EF', iconColor: '#16A34A', image: '/images/store2.jpeg' },
      { id: 'lh', name: 'Lotus’s — Bangsar South', rating: '4.5', distance: '2.4 km', eta: '35 min', badge: 'Free delivery', bg: '#FBEEE6', iconColor: '#B45309', image: '/images/store3.jpeg' }
    ]
  },
  onShow() { this.setData({ address: app.globalData.address }); },
  setFilter(e) { this.setData({ activeFilter: e.target.dataset.f }); },
  openStore(outlet) { my.navigateTo({ url: '/pages/store/index?id=' + outlet.id }); },
  openLocationPicker() { my.navigateTo({ url: '/pages/location/index' }); },
  noop() {}
});
