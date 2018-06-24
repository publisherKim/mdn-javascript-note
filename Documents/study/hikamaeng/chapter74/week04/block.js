const Block = class {
  constructor(color) {
    Object.assign(this, {color, blocks, rotate:0});
  }
  left(){
    if(--this.rotate < 0) this.rotate = 3;
  }
  right() {
    if(++this.rotate > 3) this.rotate = 0;
  }
  getBlock() {
    return this.blocks[this.rotate];
  }
}
const blocks = [class extends Block, ....];

class extends Block {
  constructor() {
    super('#f8cbad', 
      [[1],[1],[1],[1]],
      [[1,1,1,1]],
      [[1],[1],[1],[1]],
      [[1,1,1,1]]
    );
  }
}

class extends Block {
  constructor() {
    super('#ffe699',
      [[0,1,0], [1,1,1]],
      [[1,0], [1,1], [1,0]],
      [[1,1,1], [0,1,0]],
      [[0,1], [1,1], [0,1]]
    );
  }
}