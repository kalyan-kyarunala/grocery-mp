// Shared product catalog used by the store and search pages.
var PRODUCTS_BY_CAT = {
  Fruits: [
    { id: 'apple',  name: 'Apple',  unit: 'per kg',    price: 9.90,  priceText: 'RM 9.90',  image: '/images/fruits/apple.jpeg', bg: '#FCEBEB', inStock: true },
    { id: 'banana', name: 'Banana', unit: 'per bunch', price: 6.50,  priceText: 'RM 6.50',  image: '/images/fruits/banana.jpeg', bg: '#FCEBEB', inStock: true },
    { id: 'grapes', name: 'Grapes', unit: 'per kg',    price: 11.90, priceText: 'RM 11.90', image: '/images/fruits/grapes.jpeg', bg: '#FCEBEB', inStock: true },
    { id: 'orange', name: 'Orange', unit: 'per kg',    price: 7.50,  priceText: 'RM 7.50',  image: '/images/fruits/orange.jpeg', bg: '#FCEBEB', inStock: true },
    { id: 'melon',  name: 'Melon',  unit: 'each',      price: 6.90,  priceText: 'RM 6.90',  image: '/images/fruits/melon.jpeg', bg: '#FCEBEB', inStock: true },
    { id: 'mango',  name: 'Mango',  unit: 'per kg',    price: 8.90,  priceText: 'RM 8.90',  image: '/images/fruits/mango.jpeg', bg: '#FCEBEB', inStock: true },
    { id: 'guava',  name: 'Guava',  unit: 'per kg',    price: 5.90,  priceText: 'RM 5.90',  image: '/images/fruits/guava.jpeg', bg: '#FFFFFF', inStock: false },
    { id: 'lime',   name: 'Lime',   unit: 'pack of 4', price: 3.20,  priceText: 'RM 3.20',  image: '/images/fruits/lime.jpeg', bg: '#FCEBEB', inStock: true },
    { id: 'papaya', name: 'Papaya', unit: 'each',      price: 6.50,  priceText: 'RM 6.50',  image: '/images/fruits/papaya.jpeg', bg: '#FCEBEB', inStock: true }
  ],
  Veggies: [
    { id: 'carrot',    name: 'Carrot',     unit: 'per kg',    price: 4.50, priceText: 'RM 4.50', image: '/images/vegetables/carrot.jpeg', bg: '#E9F7EF', inStock: true },
    { id: 'tomato',    name: 'Tomato',     unit: 'per kg',    price: 5.00, priceText: 'RM 5.00', image: '/images/vegetables/tomato.jpeg', bg: '#E9F7EF', inStock: true },
    { id: 'potato',    name: 'Potato',     unit: 'per kg',    price: 3.50, priceText: 'RM 3.50', image: '/images/vegetables/potato.jpeg', bg: '#E9F7EF', inStock: true },
    { id: 'onion',     name: 'Onion',      unit: 'per kg',    price: 4.00, priceText: 'RM 4.00', image: '/images/vegetables/onion.jpeg', bg: '#E9F7EF', inStock: true },
    { id: 'cabbage',   name: 'Cabbage',    unit: 'per kg',    price: 3.20, priceText: 'RM 3.20', image: '/images/vegetables/cabbage.jpeg', bg: '#E9F7EF', inStock: true },
    { id: 'coriander', name: 'Coriander',  unit: 'per bunch', price: 1.50, priceText: 'RM 1.50', image: '/images/vegetables/coriander.jpeg', bg: '#E9F7EF', inStock: true },
    { id: 'beans',     name: 'Long beans', unit: 'per kg',    price: 6.00, priceText: 'RM 6.00', image: '/images/vegetables/beans.jpeg', bg: '#E9F7EF', inStock: true },
    { id: 'broccoli',  name: 'Broccoli',   unit: 'per kg',    price: 8.90, priceText: 'RM 8.90', image: '/images/vegetables/broccoli.jpeg', bg: '#E9F7EF', inStock: true },
    { id: 'capsicum',  name: 'Capsicum',   unit: 'per kg',    price: 7.50, priceText: 'RM 7.50', image: '/images/vegetables/capsicum.jpeg', bg: '#E9F7EF', inStock: true },
    { id: 'spinach',   name: 'Spinach',    unit: 'per bunch', price: 3.90, priceText: 'RM 3.90', image: '/images/vegetables/spinach.jpeg', bg: '#E9F7EF', inStock: true }
  ],
  Snacks: [
    { id: 'chips',           name: 'Chips',            unit: 'per pack', price: 4.90, priceText: 'RM 4.90', image: '/images/snacks/chips.jpeg', bg: '#FFFFFF', inStock: true },
    { id: 'boondi',          name: 'Boondi',            unit: 'per pack', price: 5.50, priceText: 'RM 5.50', image: '/images/snacks/boondi.jpeg', bg: '#FFFFFF', inStock: true },
    { id: 'bhelpuri',        name: 'Bhel Puri',         unit: 'per pack', price: 6.20, priceText: 'RM 6.20', image: '/images/snacks/bhelpuri.jpeg', bg: '#FFFFFF', inStock: true },
    { id: 'noodles',         name: 'Noodles',           unit: 'per pack', price: 3.90, priceText: 'RM 3.90', image: '/images/snacks/noodles.jpeg', bg: '#FFFFFF', inStock: true },
    { id: 'peanut_cookies',  name: 'Peanut Cookies',    unit: 'per pack', price: 7.50, priceText: 'RM 7.50', image: '/images/snacks/peanut_cookies.jpeg', bg: '#FFFFFF', inStock: true },
    { id: 'corn_flakes',     name: 'Corn Flakes',       unit: 'per box',  price: 9.90, priceText: 'RM 9.90', image: '/images/snacks/corn_flakes.jpeg', bg: '#FFFFFF', inStock: true },
    { id: 'chicken_nuggets', name: 'Chicken Nuggets',   unit: 'per pack', price: 12.50, priceText: 'RM 12.50', image: '/images/snacks/chicken_nuggets.jpeg', bg: '#FFFFFF', inStock: false }
  ],
  Cooking: [
    { id: 'soya_sauce',      name: 'Soya Sauce',       unit: 'per bottle', price: 5.90,  priceText: 'RM 5.90',  image: '/images/cooking/soya_sauce.jpeg',      bg: '#FFF8E7', inStock: true },
    { id: 'ayam_percik',     name: 'Ayam Percik Mix',  unit: 'per pack',   price: 7.90,  priceText: 'RM 7.90',  image: '/images/cooking/ayam_percik.jpeg',     bg: '#FFF8E7', inStock: true },
    { id: 'black_pepper',    name: 'Black Pepper',     unit: 'per pack',   price: 6.90,  priceText: 'RM 6.90',  image: '/images/cooking/black_pepper.jpeg',    bg: '#FFF8E7', inStock: true },
    { id: 'coriander_seeds', name: 'Coriander Seeds',  unit: 'per pack',   price: 4.20,  priceText: 'RM 4.20',  image: '/images/cooking/coriander_seeds.jpeg', bg: '#FFF8E7', inStock: true },
    { id: 'chilli_flakes',   name: 'Chilli Flakes',    unit: 'per pack',   price: 5.50,  priceText: 'RM 5.50',  image: '/images/cooking/chilli_flakes.jpeg',   bg: '#FFF8E7', inStock: true },
    { id: 'oil',             name: 'Cooking Oil',      unit: 'per bottle', price: 12.90, priceText: 'RM 12.90', image: '/images/cooking/oil.jpeg',             bg: '#FFF8E7', inStock: true },
    { id: 'turmeric_powder', name: 'Turmeric Powder',  unit: 'per pack',   price: 3.90,  priceText: 'RM 3.90',  image: '/images/cooking/turmeric_powder.jpeg', bg: '#FFF8E7', inStock: true },
    { id: 'ajinomoto',       name: 'Ajinomoto',        unit: 'per pack',   price: 2.90,  priceText: 'RM 2.90',  image: '/images/cooking/ajinomoto.jpeg',       bg: '#FFF8E7', inStock: true },
    { id: 'vinegar',         name: 'Vinegar',          unit: 'per bottle', price: 4.50,  priceText: 'RM 4.50',  image: '/images/cooking/vinegar.jpeg',         bg: '#FFF8E7', inStock: true }
  ],
  Bakery: [
    { id: 'croissant',           name: 'Croissant',           unit: 'each',     price: 3.90,  priceText: 'RM 3.90',  image: '/images/bakery/croissant.jpeg',           bg: '#FFFFFF', inStock: true },
    { id: 'seeded_wholemeal_loaf', name: 'Wholemeal Loaf',   unit: 'per loaf', price: 6.50,  priceText: 'RM 6.50',  image: '/images/bakery/seeded_wholemeal_loaf.jpeg', bg: '#FFFFFF', inStock: true },
    { id: 'scone',               name: 'Scone',               unit: 'each',     price: 2.90,  priceText: 'RM 2.90',  image: '/images/bakery/scone.jpeg',               bg: '#FFFFFF', inStock: true },
    { id: 'banana_cake',         name: 'Banana Cake',         unit: 'per slice', price: 5.90, priceText: 'RM 5.90',  image: '/images/bakery/banana_cake.jpeg',         bg: '#FFFFFF', inStock: true },
    { id: 'bagel',               name: 'Bagel',               unit: 'each',     price: 3.50,  priceText: 'RM 3.50',  image: '/images/bakery/bagel.jpeg',               bg: '#FFFFFF', inStock: true },
    { id: 'bread',               name: 'Bread',               unit: 'per loaf', price: 4.50,  priceText: 'RM 4.50',  image: '/images/bakery/bread.jpeg',               bg: '#FFFFFF', inStock: true },
    { id: 'wraps',               name: 'Wraps',               unit: 'pack of 4', price: 5.20, priceText: 'RM 5.20',  image: '/images/bakery/wraps.jpeg',               bg: '#FFFFFF', inStock: true }
  ]
};

module.exports = { PRODUCTS_BY_CAT: PRODUCTS_BY_CAT };
