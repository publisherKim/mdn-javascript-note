// ABSTRACT LOOP

// COMPLEX RECURSION
// 단순한 배열의 루프인 경우는 간단히 이터레이션을 작성 할수 있음
{
  [Symbol.iterator](){return this;},
  data:[1,2,3,4],
  next(){
    return {
      done: this.data.length === 0,
      value: this.data.shift()
    }
  }
}

const data = [
  {a: [1,2,3,4], b: '-'}, 
  [5,6,7], 
  8, 7
];

const next = () => {
  let v;
  while(v = data.shift()){
    switch(true) {
      case Array.isArray(v):
        data.unshift(...v);
        break;
      case v && typeof v === 'object':
        for (let k in v) data.unshift(v[k]);
        break;
      default:
        return { value: v, done: false};
    }
  }
  return { done: true};
};
const a = {
  [Symbol.iterator]() {
    return this;
  },
  next
};
console.log([...a]);

{
  [Symbol.iterator](){return this;},
  data: [{a:[1,2,3,4], b: '-'}, [5,6,7], 8,9],
  next(){
    let v;
    while(v = this.data.shift()){
      if(!(v instanceof Object)) return {value:v}
      if(!Array.isArray(v)) v = Object.values(v);
      this.data.unshift(...v);
    }
    return {done: true};
  }

}

const Compx = class {
  constructor(data){this.data = data;}
  [Symbol.iterator](){
    const data = JSON.parse(JSON.stringify(this.data));
    return {
      next(){
        let v;
        while(v = data.shift()){
          if(!(v instanceof Object)) return {value: v}
          if(!Array.isArray(v)) v = Object.values(v);
          data.unshift(...v);
        }
        return {done: true};
      }
    };
  }
};

const a = new Compx([{a: [1,2,3,4], b: '-'}, [5,6,7], 8,9]);
console.log([...a]);
console.log([...a]);

const Compx = class {
  constructor(data){this.data = data;}
  *gene(){
    const data = JSON.parse(JSON.stringify(this.data));
    return {
      next(){
        "use strict";
        let v;
        while(v = data.shift()){
          if(!(v instanceof Object)) yield v;
          else {
            if(!Array.isArray(v)) v = Object.values(v);
            data.unshift(...v);
          }
        }
      }
    };
  }
};

const a = new Compx([{a: [1,2,3,4], b: '-'}, [5,6,7], 8,9]);
console.log([...a.gene()]);

// 팩토리 + 컴포지트 패턴
const Operator = class {
  static factory(v){
    if(v instanceof Object){
      if(!Array.isArray(v)) v = Object.values(v);
      return new ArrayOp(v.map(v => Operator.factory(v)));
    }else {
      return new PrimeOp(v);
    }
  }
  constructor(v){this.v = v;}
  operation(f){throw 'override';}
};
const PrimeOp = class extends Operator{
  constructor(v){super(v);}
  operation(f){f(this.v);}
};

const ArrayOp = class extends Operator{
  constructor(v){super(v);}
  operation(f){for(const v of this.v) v.operation(f);}
};

Operator.factory(([1,2,3,{a:4, b:5},6,7])).operation(console.log);

// 팩토리 + 컴포지트 패턴 + es6
const Operator = class {
  static factory(v){
    if(v instanceof Object){
      if(!Array.isArray(v)) v = Object.values(v);
      return new ArrayOp(v.map(v => Operator.factory(v)));
    }else {
      return new PrimeOp(v);
    }
  }
  constructor(v){this.v = v;}
  *gene(){throw 'override';}
};
const PrimeOp = class extends Operator{
  constructor(v){super(v);}
  *gene(){yield this.v;}
};

const ArrayOp = class extends Operator{
  constructor(v){super(v);}
  *gene(){for(const v of this.v) yield * v.gene();}
};

for(const v of Operator.factory([1,2,3,{a:4, b:5}, 6,7]).gene()) console.log(v);

const odd = function *(data) {
  for(const v of data){
    console.log("odd", odd.cnt++);
    if(v % 2) yield v;
  }
};
odd.cnt = 0;
for(const v of odd([1,2,3,4])) console.log(v);

const take = function*(data, n){
  for(const v of data){
    console.log("take", take.cnt++);
    if(n--) yield v; else break;
  }
};
take.cnt = 0;
for(const v of take([1,2,3,4], 2)) console.log(v);

for(const v of take(odd([1,2,3,4]), 2)) console.log(v);

// yield
const Stream = class {
  static get(v){return new Stream(v);}
  constructor(v){
    this.v = v;
    this.filters = [];
  }
  add(gene, ...arg){
    this.filters.push(v=>gene(v, ...arg));
    return this;
  }
  *gene(){
    let v = this.v;
    for(const f of this.filters) v = f(v);
    yield* v;
  }
};

const odd = function*(data){
  for(const v of data) if(v % 2) yield v;
};

const take = function*(data, n){
  for(const v of data) if(n--) yield v; else break;
};

for(const v of Stream.get([1,2,3,4]).add(odd).add(take,2).gene()) console.log(v);