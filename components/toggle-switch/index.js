Component({
  props: { checked: false, id: '', onChange: function () {} },
  methods: { toggle() { this.props.onChange(!this.props.checked, this.props.id); } }
});
