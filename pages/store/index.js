var app = getApp();
var fmt = require('../../utils/format.js');
var STORES = {
  jg: { name: 'Jaya Grocer — Mid Valley', rating: '4.8', distance: '1.2 km', eta: '25 min', bg: '#E8EEFB', iconColor: '#1A56DB', image: '/images/store1.jpeg' },
  vg: { name: 'Village Grocer — The Gardens', rating: '4.6', distance: '2.0 km', eta: '30 min', bg: '#E9F7EF', iconColor: '#16A34A', image: '/images/store2.jpeg' },
  lh: { name: 'Lotus’s — Bangsar South', rating: '4.5', distance: '2.4 km', eta: '35 min', bg: '#FBEEE6', iconColor: '#B45309', image: '/images/store3.jpeg' }
};
var PRODUCTS_BY_CAT = {
  Fruits: [
    { id: 'apple',  name: 'Apple',  unit: 'per kg',    price: 9.90,  priceText: 'RM 9.90',  image: '/images/fruits/apple.jpeg', bg: '#FCEBEB' },
    { id: 'banana', name: 'Banana', unit: 'per bunch', price: 6.50,  priceText: 'RM 6.50',  image: '/images/fruits/banana.jpeg', bg: '#FCEBEB' },
    { id: 'grapes', name: 'Grapes', unit: 'per kg',    price: 11.90, priceText: 'RM 11.90', image: '/images/fruits/grapes.jpeg', bg: '#FCEBEB' },
    { id: 'orange', name: 'Orange', unit: 'per kg',    price: 7.50,  priceText: 'RM 7.50',  image: '/images/fruits/orange.jpeg', bg: '#FCEBEB' },
    { id: 'melon',  name: 'Melon',  unit: 'each',      price: 6.90,  priceText: 'RM 6.90',  image: '/images/fruits/melon.jpeg', bg: '#FCEBEB' },
    { id: 'mango',  name: 'Mango',  unit: 'per kg',    price: 8.90,  priceText: 'RM 8.90',  image: '/images/fruits/mango.jpeg', bg: '#FCEBEB' },
    { id: 'guava',  name: 'Guava',  unit: 'per kg',    price: 5.90,  priceText: 'RM 5.90',  image: '/images/fruits/guava.jpeg', bg: '#FCEBEB' },
    { id: 'lime',   name: 'Lime',   unit: 'pack of 4', price: 3.20,  priceText: 'RM 3.20',  image: '/images/fruits/lime.jpeg', bg: '#FCEBEB' },
    { id: 'papaya', name: 'Papaya', unit: 'each',      price: 6.50,  priceText: 'RM 6.50',  image: '/images/fruits/papaya.jpeg', bg: '#FCEBEB' }
  ],
  Veggies: [
    { id: 'carrot',    name: 'Carrot',     unit: 'per kg',    price: 4.50, priceText: 'RM 4.50', image: '/images/vegetables/carrot.jpeg', bg: '#E9F7EF' },
    { id: 'tomato',    name: 'Tomato',     unit: 'per kg',    price: 5.00, priceText: 'RM 5.00', image: '/images/vegetables/tomato.jpeg', bg: '#E9F7EF' },
    { id: 'potato',    name: 'Potato',     unit: 'per kg',    price: 3.50, priceText: 'RM 3.50', image: '/images/vegetables/potato.jpeg', bg: '#E9F7EF' },
    { id: 'onion',     name: 'Onion',      unit: 'per kg',    price: 4.00, priceText: 'RM 4.00', image: '/images/vegetables/onion.jpeg', bg: '#E9F7EF' },
    { id: 'cabbage',   name: 'Cabbage',    unit: 'per kg',    price: 3.20, priceText: 'RM 3.20', image: '/images/vegetables/cabbage.jpeg', bg: '#E9F7EF' },
    { id: 'coriander', name: 'Coriander',  unit: 'per bunch', price: 1.50, priceText: 'RM 1.50', image: '/images/vegetables/coriander.jpeg', bg: '#E9F7EF' },
    { id: 'beans',     name: 'Long beans', unit: 'per kg',    price: 6.00, priceText: 'RM 6.00', image: '/images/vegetables/beans.jpeg', bg: '#E9F7EF' },
    { id: 'broccoli',  name: 'Broccoli',   unit: 'per kg',    price: 8.90, priceText: 'RM 8.90', image: '/images/vegetables/broccoli.jpeg', bg: '#E9F7EF' },
    { id: 'capsicum',  name: 'Capsicum',   unit: 'per kg',    price: 7.50, priceText: 'RM 7.50', image: '/images/vegetables/capsicum.jpeg', bg: '#E9F7EF' },
    { id: 'spinach',   name: 'Spinach',    unit: 'per bunch', price: 3.90, priceText: 'RM 3.90', image: '/images/vegetables/spinach.jpeg', bg: '#E9F7EF' }
  ],
  Snacks: [
    { id: 'chips',           name: 'Chips',            unit: 'per pack', price: 4.90, priceText: 'RM 4.90', image: '/images/snacks/chips.jpeg', bg: '#FFFFFF' },
    { id: 'boondi',          name: 'Boondi',            unit: 'per pack', price: 5.50, priceText: 'RM 5.50', image: '/images/snacks/boondi.jpeg', bg: '#FFFFFF' },
    { id: 'bhelpuri',        name: 'Bhel Puri',         unit: 'per pack', price: 6.20, priceText: 'RM 6.20', image: '/images/snacks/bhelpuri.jpeg', bg: '#FFFFFF' },
    { id: 'noodles',         name: 'Noodles',           unit: 'per pack', price: 3.90, priceText: 'RM 3.90', image: '/images/snacks/noodles.jpeg', bg: '#FFFFFF' },
    { id: 'peanut_cookies',  name: 'Peanut Cookies',    unit: 'per pack', price: 7.50, priceText: 'RM 7.50', image: '/images/snacks/peanut_cookies.jpeg', bg: '#FFFFFF' },
    { id: 'corn_flakes',     name: 'Corn Flakes',       unit: 'per box',  price: 9.90, priceText: 'RM 9.90', image: '/images/snacks/corn_flakes.jpeg', bg: '#FFFFFF' },
    { id: 'chicken_nuggets', name: 'Chicken Nuggets',   unit: 'per pack', price: 12.50, priceText: 'RM 12.50', image: '/images/snacks/chicken_nuggets.jpeg', bg: '#FFFFFF' }
  ],
  Cooking: [
    { id: 'soya_sauce',      name: 'Soya Sauce',       unit: 'per bottle', price: 5.90,  priceText: 'RM 5.90',  image: '/images/cooking/soya_sauce.jpeg',      bg: '#FFF8E7' },
    { id: 'ayam_percik',     name: 'Ayam Percik Mix',  unit: 'per pack',   price: 7.90,  priceText: 'RM 7.90',  image: '/images/cooking/ayam_percik.jpeg',     bg: '#FFF8E7' },
    { id: 'black_pepper',    name: 'Black Pepper',     unit: 'per pack',   price: 6.90,  priceText: 'RM 6.90',  image: '/images/cooking/black_pepper.jpeg',    bg: '#FFF8E7' },
    { id: 'coriander_seeds', name: 'Coriander Seeds',  unit: 'per pack',   price: 4.20,  priceText: 'RM 4.20',  image: '/images/cooking/coriander_seeds.jpeg', bg: '#FFF8E7' },
    { id: 'chilli_flakes',   name: 'Chilli Flakes',    unit: 'per pack',   price: 5.50,  priceText: 'RM 5.50',  image: '/images/cooking/chilli_flakes.jpeg',   bg: '#FFF8E7' },
    { id: 'oil',             name: 'Cooking Oil',      unit: 'per bottle', price: 12.90, priceText: 'RM 12.90', image: '/images/cooking/oil.jpeg',             bg: '#FFF8E7' },
    { id: 'turmeric_powder', name: 'Turmeric Powder',  unit: 'per pack',   price: 3.90,  priceText: 'RM 3.90',  image: '/images/cooking/turmeric_powder.jpeg', bg: '#FFF8E7' },
    { id: 'ajinomoto',       name: 'Ajinomoto',        unit: 'per pack',   price: 2.90,  priceText: 'RM 2.90',  image: '/images/cooking/ajinomoto.jpeg',       bg: '#FFF8E7' },
    { id: 'vinegar',         name: 'Vinegar',          unit: 'per bottle', price: 4.50,  priceText: 'RM 4.50',  image: '/images/cooking/vinegar.jpeg',         bg: '#FFF8E7' }

  ],
  Bakery: [
    { id: 'croissant',           name: 'Croissant',           unit: 'each',     price: 3.90,  priceText: 'RM 3.90',  image: '/images/bakery/croissant.jpeg',           bg: '#FFFFFF' },
    { id: 'seeded_wholemeal_loaf', name: 'Wholemeal Loaf',   unit: 'per loaf', price: 6.50,  priceText: 'RM 6.50',  image: '/images/bakery/seeded_wholemeal_loaf.jpeg', bg: '#FFFFFF' },
    { id: 'scone',               name: 'Scone',               unit: 'each',     price: 2.90,  priceText: 'RM 2.90',  image: '/images/bakery/scone.jpeg',               bg: '#FFFFFF' },
    { id: 'banana_cake',         name: 'Banana Cake',         unit: 'per slice', price: 5.90, priceText: 'RM 5.90',  image: '/images/bakery/banana_cake.jpeg',         bg: '#FFFFFF' },
    { id: 'bagel',               name: 'Bagel',               unit: 'each',     price: 3.50,  priceText: 'RM 3.50',  image: '/images/bakery/bagel.jpeg',               bg: '#FFFFFF' },
    { id: 'bread',               name: 'Bread',               unit: 'per loaf', price: 4.50,  priceText: 'RM 4.50',  image: '/images/bakery/bread.jpeg',               bg: '#FFFFFF' },
    { id: 'wraps',               name: 'Wraps',               unit: 'pack of 4', price: 5.20, priceText: 'RM 5.20',  image: '/images/bakery/wraps.jpeg',               bg: '#FFFFFF' }
  ]
};
Page({
  data: {
    store: STORES.jg,
    storeId: 'jg',
    categories: ['Veggies', 'Fruits', 'Cooking', 'Snacks', 'Bakery'],
    activeCat: 'Veggies',
    products: PRODUCTS_BY_CAT.Veggies,
    cartCount: 0,
    cartTotalText: 'RM 0.00',
    toast: { show: false, name: '' }
  },
  onLoad(q) {
    var sid = q.id || 'jg';
    this.setData({ store: STORES[sid] || STORES.jg, storeId: sid });
  },
  onShow() { this.refreshCart(); this.syncQty(); },
  setCat(e) {
    var cat = e.target.dataset.c;
    this.setData({ activeCat: cat, products: PRODUCTS_BY_CAT[cat] || [] });
    this.syncQty();
  },
  openProduct(item) {
    app.globalData.selectedProduct = Object.assign({}, item, { category: this.data.activeCat });
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
