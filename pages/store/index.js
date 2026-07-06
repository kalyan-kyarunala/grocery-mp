var app = getApp();
var fmt = require('../../utils/format.js');
var PRODUCTS_BY_CAT = require('../../utils/catalog.js').PRODUCTS_BY_CAT;
var STORES = {
  jg: { name: 'Jaya Grocer — Mid Valley', rating: '4.8', distance: '1.2 km', eta: '25 min', bg: '#E8EEFB', iconColor: '#1A56DB', image: '/images/store1.jpeg' },
  vg: { name: 'Village Grocer — The Gardens', rating: '4.6', distance: '2.0 km', eta: '30 min', bg: '#E9F7EF', iconColor: '#16A34A', image: '/images/store2.jpeg' },
  lh: { name: 'Lotus’s — Bangsar South', rating: '4.5', distance: '2.4 km', eta: '35 min', bg: '#FBEEE6', iconColor: '#B45309', image: '/images/store3.jpeg' }
};
Page({
  data: {
    store: STORES.jg,
    storeId: 'jg',
    categories: ['Veggies', 'Fruits', 'Cooking', 'Snacks', 'Bakery'],
    activeCat: 'Veggies',
    products: [],
    cartCount: 0,
    cartTotalText: 'RM 0.00',
    toast: { show: false, name: '' },
    showFilter: false,
    filterTitle: '',
    priceBounds: { min: 0, max: 0 },
    filterMinPrice: 0,
    filterMaxPrice: 0,
    hideOutOfStock: false,
    filtersActive: false,
    titleJustApplied: false,
    priceJustApplied: false,
    catsThumbLeft: 0,
    catsScrolling: false
  },
  onLoad(q) {
    var sid = q.id || 'jg';
    this.setData({ store: STORES[sid] || STORES.jg, storeId: sid });

    // Flattened list of every product across all categories, tagged with its
    // category, so a filter can search the whole store regardless of which
    // category tab is currently selected.
    this._allProducts = Object.keys(PRODUCTS_BY_CAT).reduce(function (acc, cat) {
      return acc.concat(PRODUCTS_BY_CAT[cat].map(function (p) { return Object.assign({}, p, { category: cat }); }));
    }, []);
    var allPrices = this._allProducts.map(function (p) { return p.price; });
    this._priceBounds = {
      min: Math.floor(Math.min.apply(null, allPrices)),
      max: Math.ceil(Math.max.apply(null, allPrices))
    };

    this.loadCategory(this.data.activeCat);
  },
  onShow() { this.refreshCart(); this.syncQty(); },
  onCatsScroll(e) {
    var self = this;
    var scrollLeft = e.detail.scrollLeft;
    var scrollWidth = e.detail.scrollWidth;
    var clientWidth = e.detail.clientWidth || 375;
    var maxScroll = scrollWidth - clientWidth;

    var trackWidth = 120;
    var barWidth = 40;
    var maxBarLeft = trackWidth - barWidth;

    var ratio = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    var barLeft = Math.round(ratio * maxBarLeft);

    this.setData({ catsScrolling: true, catsThumbLeft: barLeft });
    clearTimeout(this._catsHideTimer);
    this._catsHideTimer = setTimeout(function () {
      self.setData({ catsScrolling: false });
    }, 700);
  },
  onCatsScrollEnd() {
    var self = this;
    clearTimeout(this._catsHideTimer);
    this._catsHideTimer = setTimeout(function () {
      self.setData({ catsScrolling: false });
    }, 700);
  },
  setCat(e) { this.loadCategory(e.target.dataset.c); },
  loadCategory(cat) {
    this._categoryProducts = (PRODUCTS_BY_CAT[cat] || []).map(function (p) {
      return Object.assign({}, p, { category: cat });
    });
    var bounds = this._priceBounds;
    this.setData({
      activeCat: cat,
      priceBounds: bounds,
      filterTitle: '',
      filterMinPrice: bounds.min,
      filterMaxPrice: bounds.max,
      hideOutOfStock: false
    });
    this.applyFilters();
  },
  openFilter() { this.setData({ showFilter: true }); },
  closeFilter() { this.setData({ showFilter: false }); },
  closeFilterDelayed() {
    var self = this;
    clearTimeout(this._closeFilterTimer);
    this._closeFilterTimer = setTimeout(function () {
      self.setData({ showFilter: false, titleJustApplied: false, priceJustApplied: false });
    }, 500);
  },
  resetFilters() {
    var bounds = this._priceBounds;
    this.setData({
      filterTitle: '',
      filterMinPrice: bounds.min,
      filterMaxPrice: bounds.max,
      hideOutOfStock: false
    });
    this.applyFilters();
    this.closeFilterDelayed();
  },
  noop() {},
  onFilterTitleInput(e) { this.setData({ filterTitle: e.detail.value }); },
  onMinPriceChange(e) {
    var v = Math.min(e.detail.value, this.data.filterMaxPrice);
    this.setData({ filterMinPrice: v });
  },
  onMaxPriceChange(e) {
    var v = Math.max(e.detail.value, this.data.filterMinPrice);
    this.setData({ filterMaxPrice: v });
  },
  toggleHideOOS() {
    this.setData({ hideOutOfStock: !this.data.hideOutOfStock });
    this.applyFilters();
    this.closeFilterDelayed();
  },
  applyTitleFilter() {
    this.applyFilters();
    this.setData({ titleJustApplied: true });
    this.closeFilterDelayed();
  },
  applyPriceFilter() {
    this.applyFilters();
    this.setData({ priceJustApplied: true });
    this.closeFilterDelayed();
  },
  applyFilters() {
    var title = (this.data.filterTitle || '').trim().toLowerCase();
    var min = this.data.filterMinPrice;
    var max = this.data.filterMaxPrice;
    var hideOOS = this.data.hideOutOfStock;
    var bounds = this._priceBounds;
    var filtersActive = !!title || min > bounds.min || max < bounds.max || hideOOS;

    // Once any filter is active, search every category instead of just the
    // one currently selected — the category tabs stop applying until the
    // filters are cleared (switching category clears them, see loadCategory).
    var source = filtersActive ? this._allProducts : this._categoryProducts;
    var filtered = (source || []).filter(function (p) {
      if (title && p.name.toLowerCase().indexOf(title) === -1) { return false; }
      if (p.price < min || p.price > max) { return false; }
      if (hideOOS && p.inStock === false) { return false; }
      return true;
    });
    this.setData({ products: filtered, filtersActive: filtersActive });
    this.syncQty();
  },
  openProduct(item) {
    app.globalData.selectedProduct = Object.assign({}, item, { category: item.category || this.data.activeCat });
    app.globalData.currentStoreId = this.data.storeId;
    app.globalData.currentStoreName = this.data.store.name;
    my.navigateTo({ url: '/pages/product/index?id=' + item.id });
  },
  addToCart(item) {
    var self = this;
    var sid = this.data.storeId;
    var sname = this.data.store.name;
    if (app.globalData.cart.length > 0 && app.globalData.cartStoreId && app.globalData.cartStoreId !== sid) {
      my.confirm({
        title: 'Start a new cart?',
        content: 'Your cart has items from ' + app.globalData.cartStoreName + '. Clear it and add from this store?',
        confirmButtonText: 'Clear & Add',
        cancelButtonText: 'Keep cart',
        success: function(res) {
          if (res.confirm) {
            app.globalData.cart = [];
            app.globalData.cartStoreId = sid;
            app.globalData.cartStoreName = sname;
            self._doAdd(item);
          }
        }
      });
      return;
    }
    app.globalData.cartStoreId = sid;
    app.globalData.cartStoreName = sname;
    this._doAdd(item);
  },
  _doAdd(item) {
    var cart = app.globalData.cart;
    var found = cart.filter(function (c) { return c.id === item.id; })[0];
    if (found) { found.qty += 1; } else { cart.push(Object.assign({}, item, { qty: 1 })); }
    this.refreshCart();
    this.syncQty();
    this.showAddedToast(item);
  },
  showAddedToast(item) {
    var self = this;
    this.setData({ toast: { show: true, name: item.name } });
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(function () {
      self.setData({ 'toast.show': false });
    }, 1400);
  },
  changeQty(item, qty) {
    var cart = app.globalData.cart;
    var found = cart.filter(function (c) { return c.id === item.id; })[0];
    if (qty <= 0) {
      app.globalData.cart = cart.filter(function (c) { return c.id !== item.id; });
      if (app.globalData.cart.length === 0) { app.globalData.cartStoreId = null; app.globalData.cartStoreName = ''; }
    } else if (found) {
      found.qty = qty;
    } else {
      cart.push(Object.assign({}, item, { qty: qty }));
    }
    this.refreshCart();
    this.syncQty();
  },
  syncQty() {
    var cart = app.globalData.cart;
    var products = this.data.products.map(function (p) {
      var found = cart.filter(function (c) { return c.id === p.id; })[0];
      return Object.assign({}, p, { qty: found ? found.qty : 0 });
    });
    this.setData({ products: products });
  },
  refreshCart() {
    var cart = app.globalData.cart;
    var count = cart.reduce(function (s, i) { return s + i.qty; }, 0);
    var t = fmt.cartTotals(cart, 0);
    this.setData({ cartCount: count, cartTotalText: fmt.rm(t.total) });
  },
  goCart() { my.navigateTo({ url: '/pages/cart/index' }); }
});
