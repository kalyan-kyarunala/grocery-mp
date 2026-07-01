Page({
  data: {
    order: {
      id: '#JG-2041', status: 'Preparing', customer: 'Siti Aminah', initials: 'SA',
      modeLine: 'Delivery · Bangsar South', payment: 'TNG eWallet',
      items: [{ name: '2× Fuji apples', price: 'RM 19.80' }, { name: '1× Bananas', price: 'RM 6.50' }],
      fee: 'RM 2.20', total: 'RM 28.50'
    }
  },
  onLoad(q) { if (q.id) this.setData({ 'order.id': q.id }); },
  call() { my.makePhoneCall ? my.makePhoneCall({ number: '0123456789' }) : my.showToast({ content: 'Calling…', type: 'none' }); },
  markReady() { my.showToast({ content: 'Marked as ready', type: 'success' }); setTimeout(function () { my.navigateBack(); }, 700); },
  back() { my.navigateBack(); }
});
