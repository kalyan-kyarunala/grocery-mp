var app = getApp();
var fmt = require('../../utils/format.js');
Page({
  data: { cart: [], mode: 'delivery', addr1: '', addr2: '', subtotalText: '', feeText: '', totalText: '' },
  onShow() { this.render(); },
  render() {
    var cart = app.globalData.cart.map(function (i) { return Object.assign({}, i, { lineText: fmt.rm(i.price * i.qty) }); });
    var fee = this.data.mode === 'delivery' ? 2.20 : 0;
    var t = fmt.cartTotals(app.globalData.cart, fee);
    this.setData({ cart: cart, subtotalText: fmt.rm(t.subtotal), feeText: fmt.rm(fee), totalText: fmt.rm(t.total) });
  },
  setMode(e) { this.setData({ mode: e.target.dataset.m }, this.render); },
  changeQty(v, e) {
    var id = e.target.dataset.id;
    var cart = app.globalData.cart;
    for (var i = 0; i < cart.length; i++) { if (cart[i].id === id) { cart[i].qty = v; break; } }
    app.globalData.cart = cart.filter(function (c) { return c.qty > 0; });
    this.render();
  },
  onAddr1(e) { this.setData({ addr1: e.detail.value }); },
  onAddr2(e) { this.setData({ addr2: e.detail.value }); },
  checkout() { my.navigateTo({ url: '/pages/checkout/index?mode=' + this.data.mode }); },
  back() { my.navigateBack(); }
});
