Component({
  props: { outlet: {}, onOpen: function () {} },
  methods: { open() { this.props.onOpen(this.props.outlet); } }
});
