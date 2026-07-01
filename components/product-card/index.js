Component({
  props: { item: {}, onOpen: function () {}, onAdd: function () {}, onChange: function () {} },
  methods: {
    open() { this.props.onOpen(this.props.item); },
    add() { this.props.onAdd(this.props.item); },
    inc() { this.props.onChange(this.props.item, (this.props.item.qty || 0) + 1); },
    dec() { this.props.onChange(this.props.item, (this.props.item.qty || 0) - 1); },
    noop() {}
  }
});
