var app = getApp();
var fmt = require('../../utils/format.js');

var DESCS = {
  apple:  'Crisp, sweet Fuji apples sourced fresh daily. Great for snacking, salads, and baking.',
  banana: 'Naturally sweet Cavendish bananas, ripened to perfection. Perfect for smoothies and snacking.',
  mango:  'Juicy, fragrant mangoes picked at peak ripeness. Perfect on their own or in a smoothie.',
  orange: 'Sweet and tangy oranges packed with vitamin C. Great for juicing or eating fresh.',
  grapes: 'Seedless table grapes — sweet, crisp, and refreshing. Ideal for snacking.',
  melon:  'Sweet honeydew melon with a soft, juicy flesh. Perfect chilled on a warm day.',
  guava:  'Tropical guava with a sweet, musky flavour. Rich in vitamin C and fibre.',
  lime:   'Zesty, aromatic limes — essential for Malaysian cooking and refreshing drinks.',
  papaya: 'Ripe, sweet papaya with vibrant orange flesh. Great for breakfast or smoothies.',
  carrot:    'Crunchy, naturally sweet carrots. Perfect raw, steamed, or in soups and stews.',
  tomato:    'Vine-ripened tomatoes bursting with flavour. Essential for curries and salads.',
  potato:    'Versatile potatoes ideal for frying, roasting, mashing, or boiling.',
  onion:     'Flavourful onions — the base of almost every great dish. Fresh and pungent.',
  cabbage:   'Crisp, fresh cabbage great for stir-fries, soups, and coleslaw.',
  coriander: 'Fragrant fresh coriander leaves to garnish and flavour all your favourite dishes.',
  beans:     'Tender long beans, perfect stir-fried with garlic or in a spicy sambal.',
  broccoli:  'Nutrient-rich broccoli florets — steam, stir-fry, or roast for a healthy side.',
  capsicum:  'Colourful, crunchy capsicums great for stir-fries, salads, and stuffed dishes.',
  spinach:   'Tender baby spinach leaves, packed with iron. Great in salads or wilted in a pan.',
  chips:           'Crispy potato chips in a classic salted flavour — the perfect snack any time.',
  boondi:          'Light, airy boondi bites — great as a snack or tossed into raita.',
  bhelpuri:        'A classic Mumbai-style bhel puri mix — tangy, crunchy, and full of flavour.',
  noodles:         'Quick-cook instant noodles in a rich, savory broth. Ready in minutes.',
  peanut_cookies:  'Buttery, melt-in-your-mouth peanut cookies — a timeless Malaysian favourite.',
  corn_flakes:     'Golden crispy corn flakes — great with milk or yoghurt for a quick breakfast.',
  chicken_nuggets: 'Juicy, golden-crumbed chicken nuggets. A crowd-pleasing family favourite.',
  oil:             'Pure refined cooking oil with a high smoke point — ideal for all cooking methods.',
  soya_sauce:      'Rich, umami-packed soya sauce — the go-to condiment for Malaysian cooking.',
  sugar:           'Fine white granulated sugar, perfect for cooking, baking, and beverages.',
  vinegar:         'Sharp, tangy white vinegar great for pickling, marinades, and dressings.',
  black_pepper:    'Aromatic black pepper for seasoning meats, soups, and stir-fries.',
  chilli_flakes:   'Fiery dried chilli flakes to add a spicy kick to any dish.',
  coriander_seeds: 'Earthy, citrusy coriander seeds essential for curries and spice blends.',
  turmeric_powder: 'Golden turmeric powder with a warm, earthy flavour and anti-inflammatory properties.',
  ajinomoto:       'Umami seasoning powder that elevates the flavour of soups, stir-fries, and marinades.',
  ayam_percik:     'Authentic Kelantanese ayam percik spice mix — just add chicken and coconut milk.',
  bread:               'Soft, fluffy white sandwich bread — fresh baked daily. Perfect for toasts and sandwiches.',
  croissant:           'Buttery, flaky French croissants baked to a golden crisp. Best enjoyed warm.',
  bagel:               'New York-style bagels with a chewy crust and soft interior. Great with cream cheese.',
  scone:               'Classic British scones, lightly sweetened and perfect with jam and clotted cream.',
  banana_cake:         'Moist, flavourful banana cake made with ripe bananas. A homestyle classic.',
  seeded_wholemeal_loaf: 'Hearty wholemeal loaf loaded with seeds — nutritious and full of texture.',
  wraps:               'Soft, pliable wheat tortilla wraps — perfect for burritos, fajitas, and packed lunches.'
};

var NUTRITION_BY_CAT = {
  Fruits: 'Naturally rich in vitamins A & C, dietary fibre, and antioxidants. Low in fat and sodium.',
  Veggies: 'A good source of vitamins, minerals, and dietary fibre. Naturally low in calories and fat.',
  Snacks: 'Provides carbohydrates and fats for quick energy — best enjoyed in moderation.',
  Cooking: 'Nutritional value varies by use — see packaging after delivery for full details.',
  Bakery: 'A source of carbohydrates for energy, best enjoyed as part of a balanced diet.'
};
var STORAGE_BY_CAT = {
  Fruits: 'Keep refrigerated at 2–8°C. Best consumed within 5–7 days of delivery for peak freshness.',
  Veggies: 'Store in the refrigerator crisper drawer. Use within 5–7 days for best quality.',
  Snacks: 'Store in a cool, dry place away from direct sunlight. Reseal the pack after opening.',
  Cooking: 'Store in a cool, dry pantry away from heat and moisture. Keep tightly sealed.',
  Bakery: 'Best enjoyed fresh within 2–3 days. Store in an airtight container at room temperature.'
};
var SHIPPING_INFO = 'Free delivery on orders over RM50. Standard delivery arrives in 25–35 minutes. Not fully satisfied? Items can be returned within 24 hours of delivery for a full refund.';

Page({
  data: { product: {}, qty: 1, totalText: 'RM 0.00', faved: false, openSection: '', shippingInfo: SHIPPING_INFO },
  onLoad(q) {
    var p = Object.assign({}, app.globalData.selectedProduct || {});
    if (!p.id) { p = { id: q.id, name: q.id, price: 0, unit: '', bg: '#F5F5F5' }; }
    p.priceText = fmt.rm(p.price || 0);
    p.stock = 20 + Math.floor(Math.random() * 40);
    p.desc = DESCS[p.id] || (p.name + ' — fresh and high quality, delivered straight to your door.');
    p.details = [
      { label: 'Category', value: p.category || 'Groceries' },
      { label: 'Unit', value: p.unit || '—' },
      { label: 'Availability', value: p.stock + ' units in stock' },
      { label: 'Sourced from', value: 'Trusted local suppliers' }
    ];
    p.nutrition = NUTRITION_BY_CAT[p.category] || 'Nutritional information varies by product — see packaging after delivery for full details.';
    p.storage = STORAGE_BY_CAT[p.category] || 'Store in a cool, dry place and check packaging for any specific storage instructions.';
    this.setData({ product: p });
    this.recalc(1);
  },
  toggleSection(e) {
    var key = e.target.dataset.key;
    this.setData({ openSection: this.data.openSection === key ? '' : key });
  },
  setQty(v) { this.setData({ qty: v }); this.recalc(v); },
  recalc(qty) { this.setData({ totalText: fmt.rm((this.data.product.price || 0) * qty) }); },
  addToCart() {
    var self = this;
    var p = this.data.product;
    var qty = this.data.qty;
    var sid = app.globalData.currentStoreId;
    var sname = app.globalData.currentStoreName;
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
            self._doAdd(p, qty);
          }
        }
      });
      return;
    }
    app.globalData.cartStoreId = sid;
    app.globalData.cartStoreName = sname;
    this._doAdd(p, qty);
  },
  _doAdd(p, qty) {
    var cart = app.globalData.cart;
    var found = cart.filter(function (c) { return c.id === p.id; })[0];
    if (found) { found.qty += qty; } else { cart.push(Object.assign({}, p, { qty: qty })); }
    my.showToast({ content: 'Added to cart', type: 'success' });
    my.navigateBack();
  },
  back() { my.navigateBack(); },
  fav() {
    var next = !this.data.faved;
    this.setData({ faved: next });
    my.showToast({ content: next ? 'Added to wishlist' : 'Removed from wishlist', type: 'none' });
  }
});
