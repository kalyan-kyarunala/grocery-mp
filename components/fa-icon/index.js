// Maps a friendly name -> FontAwesome 6 (solid) glyph codepoint.
// Add icons here as you need them; keeps markup readable: <fa-icon name="cart" />
var GLYPHS = {
  search: '\uf002', 'map-pin': '\uf3c5', bell: '\uf0f3', star: '\uf005',
  clock: '\uf017', truck: '\uf0d1', store: '\uf54e', cart: '\uf07a',
  plus: '\u002b', minus: '\uf068', heart: '\uf004', check: '\uf00c',
  'circle-check': '\uf058', circle: '\uf111', 'chevron-right': '\uf054',
  'chevron-down': '\uf078', 'arrow-left': '\uf060', wallet: '\uf555',
  card: '\uf09d', lock: '\uf023', home: '\uf015', receipt: '\uf543',
  user: '\uf007', menu: '\uf0c9', box: '\uf466', chart: '\uf080',
  gear: '\uf013', phone: '\uf095', checks: '\uf560', apple: '\uf5d1',
  lemon: '\uf094', carrot: '\uf787', bread: '\uf7ec', egg: '\uf7fb',
  basket: '\uf291', dashboard: '\uf0e4', xmark: '\uf00d', 'circle-xmark': '\uf057',
  'location-crosshairs': '\uf601', certificate: '\uf0a3',
  'rotate-left': '\uf2ea', shield: '\uf132', image: '\uf03e',
  leaf: '\uf06c', snowflake: '\uf2dc', gift: '\uf06b', 'trash-can': '\uf2ed'
};
Component({
  props: { name: '', size: 34, color: '#1A1A1A' },
  data: { glyph: '' },
  didMount() { this.setData({ glyph: GLYPHS[this.props.name] || '' }); },
  deriveDataFromProps(next) { this.setData({ glyph: GLYPHS[next.name] || '' }); }
});
