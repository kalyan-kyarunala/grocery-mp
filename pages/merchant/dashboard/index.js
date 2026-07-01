Page({
  data: {
    open: true,
    store: { name: 'Jaya Grocer', outlet: 'Mid Valley outlet' },
    m: { sales: 'RM 1,248', orders: '37', pending: '2', prep: '14 min' },
    newOrders: [
      { id: '#JG-2041', summary: '3 items · Delivery · RM 28.50' },
      { id: '#JG-2040', summary: '7 items · Pickup · RM 64.10' }
    ]
  },
  toggleOpen(v) { this.setData({ open: v }); },
  goOrders() { my.navigateTo({ url: '/pages/merchant/orders/index' }); },
  goInv() { my.navigateTo({ url: '/pages/merchant/inventory/index' }); },
  openOrder(e) { my.navigateTo({ url: '/pages/merchant/order-detail/index?id=' + e.currentTarget.dataset.id }); },
  soon() { my.showToast({ content: 'Coming soon', type: 'none' }); }
});
