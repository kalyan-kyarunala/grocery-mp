// Currency + small formatters. Wire locale-aware MYR formatting here.
function rm(n) {
  return 'RM ' + Number(n || 0).toFixed(2);
}
function cartTotals(cart, deliveryFee) {
  var subtotal = cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
  var fee = deliveryFee || 0;
  return { subtotal: subtotal, fee: fee, total: subtotal + fee };
}
module.exports = { rm: rm, cartTotals: cartTotals };
