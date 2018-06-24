const Stage = class {
  init(listener) {
    this.listener = listener;
  }
  clear() {
    this.stage = 0;
    this.next();
  }
  next() {
    if(this.stage++ < Stage.maxStage) {
      this.speed = 500 - 450 * this.stage / Stage.maxStage;
      this.listener();
    }
  }
  [Symbol.toPrimitive](hint) {
    return `<div>Stage ${this.stage}</div>`;
  }
}
Stage.maxStage = 20;