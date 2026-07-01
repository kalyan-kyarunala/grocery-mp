var ALL = [
  { id: '#JG-2041', status: 'new', ago: '2 min ago', mode: 'Delivery', count: 3, customer: 'Siti A.', items: '2× Fuji apples, 1× Bananas …', total: 'RM 28.50' },
  { id: '#JG-2040', status: 'new', ago: '5 min ago', mode: 'Pickup', count: 7, customer: 'Daniel L.', items: '1× Milk, 2× Eggs, 1× Bread …', total: 'RM 64.10' },
  { id: '#JG-2039', status: 'preparing', ago: '12 min ago', mode: 'Delivery', count: 4, customer: 'Aisyah R.', items: '1× Rice 5kg, 2× Oil …', total: 'RM 51.30' }
];
Page({
  data: {
    tabs: [{ key: 'new', label: 'New', count: 2 }, { key: 'preparing', label: 'Preparing', count: 1 }, { key: 'ready', label: 'Ready', count: 0 }],
    activeTab: 'new', visible: []
  },
  onLoad() { this.filter('new'); },
  setTab(e) { var k = e.target.dataset.k; this.setData({ activeTab: k }); this.filter(k); },
  filter(k) { this.setData({ visible: ALL.filter(function (o) { return o.status === k; }) }); },
  accept(id) { my.showToast({ content: 'Order accepted', type: 'success' }); my.navigateTo({ url: '/pages/merchant/order-detail/index?id=' + id }); },
  reject() { my.confirm({ title: 'Reject order?', content: 'The customer will be refunded.', confirmButtonText: 'Reject',
    success: function (r) { if (r.confirm) my.showToast({ content: 'Order rejected', type: 'none' }); } }); },
  back() { my.navigateBack(); }
});
