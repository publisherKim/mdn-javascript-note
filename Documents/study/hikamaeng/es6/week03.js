// iterator interface
const iterator = {
	next() {
		return {
			done: true,
			value: 1
		}
	}
}

const iterator2 = {
  data: [1,2,3,4],
  next() {
    return {
      done: this.data.length == 0,
      value: this.data.pop()
    }
  }
};

let b = 0;
const a = {
  [b++]: 3,
  [b++]: 5,
  [Symbol()]: 7,
  [b++]: 6
};

const Iterator = class {
  constructor() {
    this.data = [1,2,3,4];
  }
  next() {
    return {
      done: this.data.length == 0,
      value: this.data.pop()
    }
  }
};

// iterable interface
const s = Symbol();
const iterable = {
  [Symbol.iterator]() {
    return new Iterator();
  }
};
iterable['@@iterator'];

// loop
// 호출지연 함수로 바꾸고 흐름음 컨트롤 할수 있게 해줌
// 문은 바로 실행됨 컴퓨터 성능에 영향을 받음

// es6 + loop
// 사용자 반복처리기 직접 구현
const loop = (iter, f) => {
  // iterable이라면 iterator을 얻음
  if(typeof iter[Symbol.iterator] == 'function'){
    iter = iter[Symbol.iterator]();
  }

  // iteratorObject가 아니면 건더뜀
  if(typeof iter.next != 'function') return;

  while(true){
    const v = iter.next();
    if(v.done) return;  // 종료처리
    if(v.value);  // 현재 값을 전달함
  }
};

// 내장반복처리기
// Array destructuring (배열 해체)
const iter = {
  [Symbol.iterator](){return this},
  arr: [1, 2, 3, 4],
  next() {
    return {
      done: this.arr.length == 0,
      value: this.arr.pop()
    };
  }
};

const [a, ...b] = iter; // iter[Symbol.iterator]();
a
b
typeof [][Symbol.iterator];
typeof ""[Symbol.iterator];

// Spread operator
const iter = {
  [Symbol.iterator](){return this;},
  arr: [1,2,3,4],
  next(){
    return {
      done: this.arr.length == 0,
      value: this.arr.pop()
    };
  }
};

const a = [...iter];
console.log(a);

// rest paramater
const iter = {
  [Symbol.iterator](){return this;},
  arr: [1,2,3,4],
  next(){
    return {
      done: this.arr.length == 0,
      value: this.arr.pop()
    };
  }
};

const test = (...arg)=>console.log(arg);
test(...iter);

const cls = function(...arg) {
  this.base = arguments;
};
new cls(1,2);
new cls(1,2,3);
const arr = [1,2,3,4,5,6];
new cls(...arr);  // es6 가능

// for of
const iter = {
  [Symbol.iterator](){return this;},
  arr: [1,2,3,4],
  next(){
    return {
      done: this.arr.length == 0,
      value: this.arr.pop()
    };
  }
};

for(const v of iter) {
  console.log(v);
}

// 제곱을 요소로 갖는 가상 컬렉션
const N2 = class {
  constructor(max){
    this.max = max;
  }
  [Symbol.iterator](){
    let cursor = 1, max = this.max;
    return {
      done: false,
      next() {
        if(cursor > max) {
          this.done = true;
        }else {
          this.value = cursor * cursor;
          cursor++;
        }
        return this;
      }
    }
  }
};

const test = [...new N2(9)];

// generator
const generator = function*(max) {
  let cursor = 1;
  while(cursor < max) {
    yield cursor * cursor;
    cursor++;
  }
};

[...generator(4)];
for(const v of generator(5)) {
  console.log(v)
}