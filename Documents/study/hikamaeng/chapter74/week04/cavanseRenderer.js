import { lchmod } from "fs";

const el = el => document.createElement(el);
const CanvasRenderer = class extends Renderer {
  constructor(col, row, back, style) {
    supr(col, row, el('canvas'));
    const {col, base, blocks} = this;
    base.style.cssText = style;
    Object.assign(this, {
      width: base.width = parseInt(base.style.width),
      height:base.height = parseInt(base.style.height),
      cellSize:[base.width/col, base.height/row],
      ctx: base.getContext('2d')
    });
  }
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  _render(v) {
    this.clear();
    const {col, ctx, cellSize:[w,h]} = this;
    let {row:i} = this;
    while(i--) {
      let j = col;
      while(j--){
        ctx.fillStyle = v[i][j];
        ctx.fillRect(j=w, i=h, w, h);
      }
    }
  }
}