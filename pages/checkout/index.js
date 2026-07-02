var app = getApp();
var fmt = require('../../utils/format.js');
var addrStore = require('../../utils/addresses.js');
Page({
  data: { cart: [], mode: 'delivery', pay: 'tng', addressLine: '', subtotalText: '', feeText: '', totalText: '', total: 0 },
  onLoad(q) {
    var self = this;
    var mode = q.mode || 'delivery';
    var cart = app.globalData.cart.map(function (i) { return Object.assign({}, i, { lineText: fmt.rm(i.price * i.qty) }); });
    var fee = mode === 'delivery' ? 2.20 : 0;
    var t = fmt.cartTotals(app.globalData.cart, fee);
    this.setData({
      cart: cart, mode: mode,
      addressLine: mode === 'pickup' ? 'Jaya Grocer — Mid Valley' : 'Add a delivery address',
      subtotalText: fmt.rm(t.subtotal), feeText: fmt.rm(fee), totalText: fmt.rm(t.total), total: t.total
    });
    if (mode === 'delivery') {
      addrStore.getDefault(function (addr) {
        if (addr) { self.setData({ addressLine: addr.address + ', ' + addr.city + ' ' + addr.postalCode }); }
      });
    }
  },
  setPay(e) { this.setData({ pay: e.target.dataset.p }); },
  pay() {
    var method = this.data.pay === 'tng' ? 'TNG eWallet' : 'Card / FPX';
    my.showLoading({ content: 'Processing…' });
    setTimeout(function () {
      my.hideLoading();
      my.alert({ title: 'Payment successful', content: 'Paid via ' + method, buttonText: 'Done',
        success: function () { app.globalData.cart = []; my.reLaunch({ url: '/pages/home/index' }); } });
    }, 900);
  },
  back() { my.navigateBack(); }
});
