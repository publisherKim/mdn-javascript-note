const Renderer = class {
  constructor(col, row, base, back) {
    Object.assign(this, {col, row, base, blocks:[]});
  }
  clear() {
    throw 'override';
  }
  render(data) {
    if(!data instanceof Data) throw 'invalid data';
    this._render(data);
  }
  _render(data){throw 'override!';}
};