var app = getApp();
var fmt = require('../../utils/format.js');
var addrStore = require('../../utils/addresses.js');
Page({
  data: {
    cart: [], mode: 'delivery', pay: 'tng',
    addressLine: '', hasAddress: false,
    itemCount: 0, etaText: '',
    promoApplied: false, promoCode: 'FRESH15', discount: 0, discountText: 'RM 0.00',
    subtotalText: '', feeText: '', totalText: '', total: 0
  },
  onLoad(q) {
    var self = this;
    var mode = q.mode || 'delivery';
    var cart = app.globalData.cart.map(function (i) {
      return {
        id: i.id, name: i.name, qty: i.qty, price: i.price,
        unit: i.unit || '', icon: i.icon || 'basket', image: i.image || '',
        bg: i.bg || '#E8EEFB', iconColor: i.iconColor || '#1A56DB',
        lineText: fmt.rm(i.price * i.qty)
      };
    });
    var count = app.globalData.cart.reduce(function (s, i) { return s + i.qty; }, 0);
    this.setData({
      cart: cart, mode: mode, itemCount: count,
      etaText: mode === 'pickup' ? 'Ready in ~15 min' : 'Arrives in 25–35 min',
      addressLine: mode === 'pickup' ? 'Jaya Grocer — Mid Valley' : 'Add a delivery address',
      hasAddress: mode === 'pickup'
    });
    this.computeTotals();
    if (mode === 'delivery') {
      addrStore.getDefault(function (addr) {
        if (addr) { self.setData({ addressLine: addr.address + ', ' + addr.city + ' ' + addr.postalCode, hasAddress: true }); }
      });
    }
  },
  computeTotals() {
    var fee = this.data.mode === 'delivery' ? 2.20 : 0;
    var t = fmt.cartTotals(app.globalData.cart, fee);
    var discount = this.data.discount || 0;
    var total = t.total - discount;
    this.setData({
      subtotalText: fmt.rm(t.subtotal), feeText: fmt.rm(fee),
      discountText: fmt.rm(discount), totalText: fmt.rm(total), total: total
    });
  },
  applyPromo() {
    var self = this;
    if (this.data.promoApplied) {
      this.setData({ promoApplied: false, discount: 0 }, function () { self.computeTotals(); });
      my.showToast({ content: 'Promo removed', type: 'none' });
    } else {
      this.setData({ promoApplied: true, discount: 2.00 }, function () { self.computeTotals(); });
      my.showToast({ content: this.data.promoCode + ' applied', type: 'success' });
    }
  },
  editAddress() { my.navigateTo({ url: '/pages/location/index' }); },
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