var fmt = require('../../../utils/format.js');
var ITEMS = [
  { id: 'apple', name: 'Fuji apples', price: 9.90, stock: 48, available: true, icon: 'apple', bg: '#FCEBEB', iconColor: '#A32D2D' },
  { id: 'banana', name: 'Bananas', price: 6.50, stock: 12, available: true, icon: 'lemon', bg: '#FAEEDA', iconColor: '#BA7517' },
  { id: 'milk', name: 'Fresh milk 1L', price: 7.20, stock: 0, available: false, icon: 'egg', bg: '#E8EEFB', iconColor: '#1A56DB' },
  { id: 'bread', name: 'Wholemeal bread', price: 4.80, stock: 23, available: true, icon: 'bread', bg: '#FBEEE6', iconColor: '#B45309' }
];
Page({
  data: { q: '', visible: [] },
  onLoad() { this.render(''); },
  render(q) {
    var list = ITEMS
      .filter(function (i) { return i.name.toLowerCase().indexOf(q.toLowerCase()) > -1; })
      .map(function (i) { return Object.assign({}, i, { priceText: fmt.rm(i.price) }); });
    this.setData({ visible: list });
  },
  onSearch(e) { this.setData({ q: e.detail.value }); this.render(e.detail.value); },
  toggleAvail(checked, id) {
    for (var i = 0; i < ITEMS.length; i++) { if (ITEMS[i].id === id) { ITEMS[i].available = checked; break; } }
    this.render(this.data.q);
  },
  add() { my.showToast({ content: 'Add product', type: 'none' }); }
});
