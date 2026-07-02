// Local (device-only) saved-address store, shared by the manage-address,
// cart, and checkout pages. No backend in this app — persisted via my.storage.
var KEY = 'groceria_addresses';

function getAll(cb) {
  my.getStorage({
    key: KEY,
    success: function (res) {
      var list = [];
      try { list = JSON.parse(res.data) || []; } catch (e) { list = []; }
      cb(list);
    },
    fail: function () { cb([]); }
  });
}

function saveAll(list) {
  my.setStorage({ key: KEY, data: JSON.stringify(list) });
}

function getDefault(cb) {
  getAll(function (list) {
    cb(list.filter(function (a) { return a.isDefault; })[0] || list[0] || null);
  });
}

module.exports = { getAll: getAll, saveAll: saveAll, getDefault: getDefault };
