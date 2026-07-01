App({
  // Global state shared across pages (lightweight store)
  globalData: {
    role: 'customer',            // 'customer' | 'merchant'
    locale: 'en',                // 'en' | 'ms' (wire react-i18next-style dictionaries here)
    cart: [],                    // [{ id, name, price, qty, icon, bg, iconColor, unit }]
    address: 'Kuala Lumpur',
    cartStoreId: null,           // outlet that owns the current cart
    cartStoreName: ''
  },
  onLaunch() {
    // Place auth / TNG session bootstrap here.
  }
});
