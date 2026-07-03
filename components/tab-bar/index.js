var ROUTES = { home: '/pages/home/index', cart: '/pages/cart/index' };
Component({
  props: { active: 'home', cartCount: 0 },
  methods: {
    go(e) {
      var key = e.target.dataset.key;
      var url = ROUTES[key];
      if (!url) { my.showToast({ content: 'Coming soon', type: 'none' }); return; }
      my.reLaunch({ url: url });
    }
  }
});
