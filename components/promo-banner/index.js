Component({
  props: { promo: {}, onTap: function () {} },
  data: {
    // bunting flag colours (alternating), rendered as CSS triangles
    flags: ['#ffffff', '#34D27B', '#93B4F5', '#ffffff', '#34D27B', '#93B4F5', '#ffffff', '#34D27B', '#93B4F5']
  },
  methods: { tap() { this.props.onTap(this.props.promo); } }
});
