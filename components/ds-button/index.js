Component({
  props: { text: 'Button', type: 'primary', icon: '', block: false, data: null, onTap: function () {} },
  methods: { onTap() { this.props.onTap(this.props.data); } }
});
