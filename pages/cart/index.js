var app = getApp();
var fmt = require('../../utils/format.js');
var addrStore = require('../../utils/addresses.js');
var FREE_DELIVERY_THRESHOLD = 50;

Page({
  data: {
    cart: [], mode: 'delivery', savedAddress: null, itemCount: 0,
    subtotalText: '', feeText: '', discountText: '', totalText: '',
    freeUnlocked: false, remainingText: '', progressPct: 0
  },
  onShow() {
    this.render();
    var self = this;
    addrStore.getDefault(function (addr) { self.setData({ savedAddress: addr }); });
  },
  render() {
    var mode = this.data.mode;
    var rawCart = app.globalData.cart;
    var cart = rawCart.map(function (i) { return Object.assign({}, i, { lineText: fmt.rm(i.price * i.qty) }); });
    var itemCount = rawCart.reduce(function (s, i) { return s + i.qty; }, 0);
    var subtotal = rawCart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
    var freeUnlocked = mode === 'delivery' && subtotal >= FREE_DELIVERY_THRESHOLD;
    var fee = mode === 'delivery' && !freeUnlocked ? 2.20 : 0;
    var t = fmt.cartTotals(rawCart, fee);
    var remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
    this.setData({
      cart: cart,
      itemCount: itemCount,
      subtotalText: fmt.rm(t.subtotal),
      feeText: mode === 'delivery' && freeUnlocked ? 'FREE' : fmt.rm(fee),
      discountText: fmt.rm(0),
      totalText: fmt.rm(t.total),
      freeUnlocked: freeUnlocked,
      remainingText: fmt.rm(remaining),
      progressPct: Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100))
    });
  },
  setMode(e) { this.setData({ mode: e.target.dataset.m }, this.render); },
  changeQty(v, id) {
    var cart = app.globalData.cart;
    for (var i = 0; i < cart.length; i++) { if (cart[i].id === id) { cart[i].qty = v; break; } }
    app.globalData.cart = cart.filter(function (c) { return c.qty > 0; });
    this.render();
  },
  removeItem(e) {
    var id = e.target.dataset.id;
    app.globalData.cart = app.globalData.cart.filter(function (c) { return c.id !== id; });
    this.render();
  },
  clearCart() {
    var self = this;
    if (!app.globalData.cart.length) return;
    my.confirm({
      title: 'Clear cart?',
      content: 'Remove all items from your cart?',
      confirmButtonText: 'Clear',
      cancelButtonText: 'Cancel',
      success: function (res) {
        if (res.confirm) {
          app.globalData.cart = [];
          app.globalData.cartStoreId = null;
          app.globalData.cartStoreName = '';
          self.render();
        }
      }
    });
  },
  goManageAddress() { my.navigateTo({ url: '/pages/manage-address/index' }); },
  startShopping() { my.navigateBack();},
  checkout() { my.navigateTo({ url: '/pages/checkout/index?mode=' + this.data.mode }); },
  back() { my.navigateBack(); }
});
