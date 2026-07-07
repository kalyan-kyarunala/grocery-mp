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
      { id: 'jg', name: 'Jaya Grocer — Mid Valley', rating: '4.8', distance: '1.2 km', eta: '25 min', badge: '20% OFF', bg: '#E8EEFB', iconColor: '#1A56DB', image: '/images/store1.jpeg', freeDelivery: false },
      { id: 'vg', name: 'Village Grocer — The Gardens', rating: '4.6', distance: '2.0 km', eta: '30 min', badge: '', bg: '#E9F7EF', iconColor: '#16A34A', image: '/images/store2.jpeg', freeDelivery: false },
      { id: 'lh', name: 'Lotus’s — Bangsar South', rating: '4.5', distance: '2.4 km', eta: '35 min', badge: 'Free delivery', bg: '#FBEEE6', iconColor: '#B45309', image: '/images/store3.jpeg', freeDelivery: true }
    ],
    cartCount: 0,
    showFilter: false,
    filterName: '',
    distanceBounds: { min: 0, max: 0 },
    filterMaxDistance: 0,
    filterMaxDistanceText: '0.0',
    freeDeliveryOnly: false,
    filtersActive: false,
    activeFilterCount: 0,
    resultCount: 0
  },
  onLoad() {
    this._allOutlets = this.data.outlets;
    // Fixed 0–10km range for the slider rather than the mock data's actual
    // min/max, so it reads as a real distance filter, not just bounded by
    // whatever outlets happen to exist right now.
    var bounds = { min: 0, max: 100 };
    this._distanceBounds = bounds;
    this.setData({
      distanceBounds: bounds,
      filterMaxDistance: bounds.max,
      filterMaxDistanceText: (bounds.max / 10).toFixed(1)
    });
    this.applyOutletFilters();
  },
  onShow() {
    var cartCount = app.globalData.cart.reduce(function (s, i) { return s + i.qty; }, 0);
    this.setData({ address: app.globalData.address, cartCount: cartCount });
  },
  setFilter(e) { this.setData({ activeFilter: e.target.dataset.f }); },
  openFilter() { this.setData({ showFilter: true }); },
  closeFilter() { this.setData({ showFilter: false }); },
  onFilterNameInput(e) {
    this.setData({ filterName: e.detail.value });
    this.applyOutletFilters();
  },
  clearName() {
    this.setData({ filterName: '' });
    this.applyOutletFilters();
  },
  onMaxDistanceChange(e) {
    var v = e.detail.value;
    this.setData({ filterMaxDistance: v, filterMaxDistanceText: (v / 10).toFixed(1) });
    this.applyOutletFilters();
  },
  onFreeDeliverySwitchChange(e) {
    this.setData({ freeDeliveryOnly: e.detail.value });
    this.applyOutletFilters();
  },
  resetOutletFilters() {
    var bounds = this._distanceBounds;
    this.setData({
      filterName: '',
      filterMaxDistance: bounds.max,
      filterMaxDistanceText: (bounds.max / 10).toFixed(1),
      freeDeliveryOnly: false
    });
    this.applyOutletFilters();
  },
  applyOutletFilters() {
    var name = (this.data.filterName || '').trim().toLowerCase();
    var max = this.data.filterMaxDistance;
    var freeOnly = this.data.freeDeliveryOnly;
    var bounds = this._distanceBounds;
    var activeFilterCount = (name ? 1 : 0) + (max < bounds.max ? 1 : 0) + (freeOnly ? 1 : 0);
    var filtersActive = activeFilterCount > 0;
    var filtered = (this._allOutlets || []).filter(function (o) {
      if (name && o.name.toLowerCase().indexOf(name) === -1) { return false; }
      var d10 = Math.round(parseFloat(o.distance) * 10);
      if (d10 > max) { return false; }
      if (freeOnly && !o.freeDelivery) { return false; }
      return true;
    });
    this.setData({
      outlets: filtered,
      filtersActive: filtersActive,
      activeFilterCount: activeFilterCount,
      resultCount: filtered.length
    });
  },
  openPromo(promo) { my.showToast({ content: 'Promo ' + promo.code + ' applied', type: 'success' }); },
  openStore(outlet) { my.navigateTo({ url: '/pages/store/index?id=' + outlet.id }); },
  seeAllOutlets() { my.showToast({ content: 'Coming soon', type: 'none' }); },
  openLocationPicker() { my.navigateTo({ url: '/pages/location/index' }); },
  goSearch() { my.navigateTo({ url: '/pages/search/index' }); },
  noop() {}
});