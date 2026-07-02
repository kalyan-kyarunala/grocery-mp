var addrStore = require('../../utils/addresses.js');

var STATES = [
  'Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 'Melaka',
  'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 'Perlis', 'Putrajaya',
  'Sabah', 'Sarawak', 'Selangor', 'Terengganu'
];

Page({
  data: {
    addresses: [],
    showForm: false,
    showStatePicker: false,
    editingId: '',
    addressTypes: ['Home', 'Work', 'Other'],
    formType: 'Home',
    formName: '',
    formPhone: '',
    formAddress: '',
    formCity: '',
    formPostalCode: '',
    formState: '',
    formIsDefault: false,
    stateList: STATES
  },
  onShow() { this.load(); },
  load() {
    var self = this;
    addrStore.getAll(function (list) { self.setData({ addresses: list }); });
  },
  onAddNew() {
    this.setData({
      showForm: true, editingId: '',
      formType: 'Home', formName: '', formPhone: '', formAddress: '',
      formCity: '', formPostalCode: '', formState: '',
      formIsDefault: this.data.addresses.length === 0
    });
  },
  onEdit(e) {
    var id = e.target.dataset.id;
    var a = this.data.addresses.filter(function (x) { return x.id === id; })[0];
    if (!a) return;
    this.setData({
      showForm: true, editingId: id,
      formType: a.type, formName: a.recipientName, formPhone: a.phone,
      formAddress: a.address, formCity: a.city, formPostalCode: a.postalCode,
      formState: a.state, formIsDefault: a.isDefault
    });
  },
  onDelete(e) {
    var self = this;
    var id = e.target.dataset.id;
    my.confirm({
      title: 'Delete address?',
      content: 'This address will be removed from your account.',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      success: function (res) {
        if (!res.confirm) return;
        addrStore.getAll(function (list) {
          var next = list.filter(function (a) { return a.id !== id; });
          if (next.length && !next.some(function (a) { return a.isDefault; })) { next[0].isDefault = true; }
          addrStore.saveAll(next);
          self.setData({ addresses: next });
        });
      }
    });
  },
  onSetDefault(e) {
    var self = this;
    var id = e.target.dataset.id;
    addrStore.getAll(function (list) {
      var next = list.map(function (a) { return Object.assign({}, a, { isDefault: a.id === id }); });
      addrStore.saveAll(next);
      self.setData({ addresses: next });
    });
  },
  onTypeTap(e) { this.setData({ formType: e.target.dataset.type }); },
  onFormInput(e) {
    var field = e.target.dataset.field;
    var patch = {};
    patch[field] = e.detail.value;
    this.setData(patch);
  },
  onToggleDefault() { this.setData({ formIsDefault: !this.data.formIsDefault }); },
  onStateTap() { this.setData({ showStatePicker: true }); },
  onCloseStatePicker() { this.setData({ showStatePicker: false }); },
  onPickState(e) { this.setData({ formState: e.target.dataset.value, showStatePicker: false }); },
  onCloseForm() { this.setData({ showForm: false }); },
  onSave() {
    var d = this.data;
    if (!d.formName.trim()) { my.showToast({ content: 'Enter recipient name', type: 'none' }); return; }
    if (!d.formPhone.trim()) { my.showToast({ content: 'Enter phone number', type: 'none' }); return; }
    if (!d.formAddress.trim()) { my.showToast({ content: 'Enter address', type: 'none' }); return; }
    if (!d.formCity.trim()) { my.showToast({ content: 'Enter city', type: 'none' }); return; }
    if (!d.formPostalCode.trim()) { my.showToast({ content: 'Enter postal code', type: 'none' }); return; }
    if (!d.formState) { my.showToast({ content: 'Select a state', type: 'none' }); return; }

    var self = this;
    addrStore.getAll(function (list) {
      var entry = {
        id: d.editingId || ('addr_' + Date.now()),
        type: d.formType, recipientName: d.formName.trim(), phone: d.formPhone.trim(),
        address: d.formAddress.trim(), city: d.formCity.trim(), postalCode: d.formPostalCode.trim(),
        state: d.formState, country: 'Malaysia', isDefault: d.formIsDefault
      };
      var next = d.editingId
        ? list.map(function (a) { return a.id === d.editingId ? entry : a; })
        : list.concat([entry]);
      if (entry.isDefault) {
        next = next.map(function (a) { return Object.assign({}, a, { isDefault: a.id === entry.id }); });
      }
      addrStore.saveAll(next);
      self.setData({ addresses: next, showForm: false });
      my.showToast({ content: d.editingId ? 'Address updated' : 'Address added', type: 'success' });
    });
  },
  noop() {},
  back() { my.navigateBack(); }
});
