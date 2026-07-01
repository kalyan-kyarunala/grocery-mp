Component({
  props: { promo: {}, onTap: function () {} },
  methods: { tap() { this.props.onTap(this.props.promo); } }
});
