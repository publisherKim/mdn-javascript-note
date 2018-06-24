const Data = class extends Array {
  constructor(row, col) {
    Object.assign(this, {row, col});
  }
  cell(row, col, color) {
    if(row > this.row || col > this.col) throw 'invalid!';
    (this[row] || (this[row] = []))[col] = color;
  }
  row(row, ...color) {
    color.forEach((v,i) => this.cell(row, i, v));
  }
  all(...rows){
    rows.forEach((v,i)=>this.row(i, ...v));
  }
};