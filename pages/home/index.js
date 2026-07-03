var app = getApp();
Page({
  data: {
    address: app.globalData.address,
    filters: ['All', 'Nearby', 'Open now', 'Promo', 'Free delivery'],
    activeFilter: 'All',
    promo: {
      id: 'first15', code: 'FRESH15', kicker: 'MINIMUM',
      amount: 'RM15', off: 'OFF', subtitle: 'on your first order min spend RM50',
      cta: 'Shop now', bg: 'linear-gradient(165deg,#1E40AF,#1A56DB 70%)',
      mascots: [
        { src: '/images/apple.svg', delay: 0 },
        { src: '/images/milk.svg', delay: 300 },
        { src: '/images/bag-mascot.svg', delay: 600 },
        { src: '/images/banana.svg', delay: 900 }
      ]
    },
    outlets: [
      { id: 'jg', name: 'Jaya Grocer — Mid Valley', rating: '4.8', distance: '1.2 km', eta: '25 min', badge: '20% OFF', bg: '#E8EEFB', iconColor: '#1A56DB', image: '/images/store1.jpeg' },
      { id: 'vg', name: 'Village Grocer — The Gardens', rating: '4.6', distance: '2.0 km', eta: '30 min', badge: '', bg: '#E9F7EF', iconColor: '#16A34A', image: '/images/store2.jpeg' },
      { id: 'lh', name: 'Lotus’s — Bangsar South', rating: '4.5', distance: '2.4 km', eta: '35 min', badge: 'Free delivery', bg: '#FBEEE6', iconColor: '#B45309', image: '/images/store3.jpeg' }
    ],
    cartCount: 0
  },
  onShow() {
    var cartCount = app.globalData.cart.reduce(function (s, i) { return s + i.qty; }, 0);
    this.setData({ address: app.globalData.address, cartCount: cartCount });
  },
  setFilter(e) { this.setData({ activeFilter: e.target.dataset.f }); },
  openPromo(promo) { my.showToast({ content: 'Promo ' + promo.code + ' applied', type: 'success' }); },
  openStore(outlet) { my.navigateTo({ url: '/pages/store/index?id=' + outlet.id }); },
  seeAllOutlets() { my.showToast({ content: 'Coming soon', type: 'none' }); },
  openLocationPicker() { my.navigateTo({ url: '/pages/location/index' }); },
  goSearch() { my.navigateTo({ url: '/pages/search/index' }); }
});