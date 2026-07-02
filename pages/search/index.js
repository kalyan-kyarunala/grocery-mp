var app = getApp();
var fmt = require('../../utils/format.js');
var PRODUCTS_BY_CAT = require('../../utils/catalog.js').PRODUCTS_BY_CAT;

var ALL_PRODUCTS = Object.keys(PRODUCTS_BY_CAT).reduce(function (acc, cat) {
  return acc.concat(PRODUCTS_BY_CAT[cat].map(function (p) {
    return Object.assign({}, p, { category: cat });
  }));
}, []);

var DEFAULT_STORE_ID = 'jg';
var DEFAULT_STORE_NAME = 'Jaya Grocer — Mid Valley';

Page({
  data: {
    query: '',
    results: [],
    popular: ['Apple', 'Banana', 'Tomato', 'Bread', 'Chips', 'Cooking Oil'],
    cartCount: 0,
    cartTotalText: 'RM 0.00',
    toast: { show: false, name: '' }
  },
  onShow() { this.refreshCart(); this.runSearch(this.data.query); },
  onInput(e) { this.runSearch(e.detail.value); },
  pickPopular(e) { this.runSearch(e.target.dataset.q); },
  clear() { this.runSearch(''); },
  runSearch(query) {
    var q = (query || '').trim().toLowerCase();
    var results = q ? ALL_PRODUCTS.filter(function (p) { return p.name.toLowerCase().indexOf(q) !== -1; }) : [];
    this.setData({ query: query || '', results: results });
    this.syncQty();
  },
  openProduct(item) {
    app.globalData.selectedProduct = Object.assign({}, item);
    app.globalData.currentStoreId = DEFAULT_STORE_ID;
    app.globalData.currentStoreName = DEFAULT_STORE_NAME;
    my.navigateTo({ url: '/pages/product/index?id=' + item.id });
  },
  addToCart(item) {
    var self = this;
    if (app.globalData.cart.length > 0 && app.globalData.cartStoreId && app.globalData.cartStoreId !== DEFAULT_STORE_ID) {
      my.confirm({
        title: 'Start a new cart?',
        content: 'Your cart has items from ' + app.globalData.cartStoreName + '. Clear it and add from this store?',
        confirmButtonText: 'Clear & Add',
        cancelButtonText: 'Keep cart',
        success: function (res) {
          if (res.confirm) {
            app.globalData.cart = [];
            app.globalData.cartStoreId = DEFAULT_STORE_ID;
            app.globalData.cartStoreName = DEFAULT_STORE_NAME;
            self._doAdd(item);
          }
        }
      });
      return;
    }
    app.globalData.cartStoreId = DEFAULT_STORE_ID;
    app.globalData.cartStoreName = DEFAULT_STORE_NAME;
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
    var results = this.data.results.map(function (p) {
      var found = cart.filter(function (c) { return c.id === p.id; })[0];
      return Object.assign({}, p, { qty: found ? found.qty : 0 });
    });
    this.setData({ results: results });
  },
  refreshCart() {
    var cart = app.globalData.cart;
    var count = cart.reduce(function (s, i) { return s + i.qty; }, 0);
    var t = fmt.cartTotals(cart, 0);
    this.setData({ cartCount: count, cartTotalText: fmt.rm(t.total) });
  },
  goCart() { my.navigateTo({ url: '/pages/cart/index' }); },
  back() { my.navigateBack(); }
});
