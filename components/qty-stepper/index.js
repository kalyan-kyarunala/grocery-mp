Component({
  props: { value: 1, min: 0, id: '', onChange: function () {} },
  methods: {
    inc() { this.props.onChange(this.props.value + 1, this.props.id); },
    dec() { var v = this.props.value - 1; if (v < this.props.min) v = this.props.min; this.props.onChange(v, this.props.id); }
  }
});
