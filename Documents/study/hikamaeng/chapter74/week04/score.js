const Score = class {
  init(listener) {
    this.listener = listener;
  }
  clear(line, stage) {
    const score = parseInt((stage * 5) * (2 ** line));
    this.curr += score, this.total += score;
    this.listener();
  }
  [Symbol.toPrimitive](hint) {
    return `<div>Score ${this.curr} / ${this.total}</div>`
  }
}