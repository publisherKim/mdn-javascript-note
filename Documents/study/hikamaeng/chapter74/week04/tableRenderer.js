const el = el => document.createElement(el);
const back = (s, v)=>{s.backgroundColor = v;};
const TableRenderer = class extends Renderer {
  constructor(col, row, back, style) {
    super(col, row, el('table'), back);
    const {col, base, blocks} = this;
    base.style.cssText = style;
    let i = this.row;
    while(i--) {
      const tr = base.appendChild(el('tr'));
      const curr = [];
      let j = col;
      blocks.push(curr);
      while(j--) curr.push(tr.appendChild(el('td')).style);
    }
  }
  clear() {
    this.blocks.forEach(curr=> curr.forEach(s=>back(s, this.back)));
  }
  _render(v) {
    this.blocks.forEach((curr, i)=>curr.forEach((s,j)=> back(s, v[i][j])));
  }
};