Component({
  props: {
    min: 0,
    max: 100,
    low: 0,
    high: 100,
    onChange: function () {}
  },
  data: {
    lowPct: 0,
    highPct: 100
  },
  didMount() {
    this._measure();
    this._syncPct(this.props);
  },
  deriveDataFromProps(next) {
    this._syncPct(next);
  },
  methods: {
    _measure() {
      var self = this;
      my.createSelectorQuery().in(this).select('#track').boundingClientRect().exec(function (res) {
        var rect = res && res[0];
        if (rect) { self._trackLeft = rect.left; self._trackWidth = rect.width; }
      });
    },
    _syncPct(props) {
      var span = (props.max - props.min) || 1;
      this.setData({
        lowPct: ((props.low - props.min) / span) * 100,
        highPct: ((props.high - props.min) / span) * 100
      });
    },
    _valueFromClientX(clientX) {
      var width = this._trackWidth || 1;
      var left = this._trackLeft || 0;
      var ratio = (clientX - left) / width;
      if (ratio < 0) { ratio = 0; }
      if (ratio > 1) { ratio = 1; }
      return Math.round(this.props.min + ratio * (this.props.max - this.props.min));
    },
    onThumbMove(e) {
      var thumb = e.currentTarget.dataset.thumb;
      var touch = e.touches[0];
      var v = this._valueFromClientX(touch.clientX);
      var low = this.props.low;
      var high = this.props.high;
      if (thumb === 'low') {
        if (v > high) { v = high; }
        low = v;
      } else {
        if (v < low) { v = low; }
        high = v;
      }
      this._syncPct({ min: this.props.min, max: this.props.max, low: low, high: high });
      this.props.onChange(low, high);
    }
  }
});
