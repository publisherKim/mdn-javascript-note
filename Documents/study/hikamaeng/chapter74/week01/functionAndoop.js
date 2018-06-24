/*
  sub routine flow
  main flow
                    routine A
                    subflow
  a = routineA        
                    routine B
                    subflow
  c = routineB

  함수가 너무 커지면 안된다. 우리가 함수를 쪼개야 하는 이유: 컴퓨터 한대가 한 함수에 들어갈수도 있음
*/

/*
  communicate with routine
    main flow       
                      routineA
                      arguments
                      return
  a = routuneA(B)
*/

const a = {
  get a() {
    console.log('hello');
    return 1;
  },
  set b(v) {
    console.log('world');
    return v + 1;
  }
};
console.log(a.a);
a.b;
// get 함수, set 함수 호출시 () 없이도 가능하다. 엔진이 제공 

/*
  main flow
  a = routuneA(B) +  routineA(C) + routineA(D)
*/

/* 
  sub routine in sub routine

  main flow                 routine A               routine B
  a = routineA(B)           arguments               arguments
                            routineB()              return
                            return
  m 
  a = r1()
  r1
  re()
  return
  ...
  r6 return
  서브 루틴안에서 함수들을 여러단계에 걸쳐서 호출할 겨우 그 중간 단계의 메모리들을 freezing 해야함
  call stack keep 하고 나중에 쌓인걸 먼저 처리함
  선입 후출입 방식
  call stack을 줄일수록 좋음 메모리 스택이 쌓을수록 프로그램이 죽을 확률이 높음(메모리 사용이 높아져서)
*/

/*
  value vs reference
  main flow
  a = routine(B)            routine
                            arguments
                            local variables
                            return
  value 타입인 경우엔 복사본이 넘어감 arguments 또는 return
  동시성 누가 호출해도 value 타입을 받아서 복사본을 반환해야함
  상태 안정 혹은 수학점 함수
  참조의 안정성을 보장해주어야함
  참조로 넘어온 인자의 경우는 read only로 사용                          
*/
const a = new Number(3);
const b = new Number(3);
a == b // false
a === b // false
//메모리의 주소지를 비교하는것이 참조
a + b // 6
const c = 3;
consdt d = 3;
c == d; // true

/*
  value vs reference
  larry constantine - structured design
  낮은 결합도 와 높은 응집도를 가진 프로그램
*/
const A = class{
  constructor(v) {
    this.v = v;
  }
};
const B = class{
  constructor(v) {
    this.v = a.v;
  }
};
const b = new B(new A(3));
// contents 결합 최악

const Common = class {
  constructor(v){
    this.v = v;
  }
};
const A = class {
  constructor(c) {
    this.v = c.v;
  }
};
const B = class{
  constructor(c) {
    this.v = c.v;
  }
};
const a = new A(new Common(3));
const b = new B(new Common(3));
// common 결합 외존성 이 연결되어있어 common을 바꿀경우 문제가 심각해짐

const A = class {
  constructor(v) {
    this.v = v;
  }
};
const B = class {
  constructor(a) {
    this.v = a.getValue();
  }
};
const b = new B(new A(3));
// external 결합 getValue에만 의존성이 있음

const A = class {
  process(flag, v) {
    switch(flag) {
      case 1: return this.run1(v);
      case 2: return this.run2(v);
      case 3: return this.run3(v);
    }
  }
};
const B = class{
  constructor(a) {
    this.a = a;
  }
  noop(){this.a.process(1);}
  echo(data){
    this.a.process(2, data);
  }
};
const b = new B(new A());
b.noop();
b.echo("test");
// control 결합 flag에대한 의존성이 생김 값을 전달해야만 유의미함 편의상 사용함

const A = class {
  count(v) {
    v.count++;
  }
};

const B = class {
  constructor(a) {
    this.a = a;
    this.counter = {counter:0}
  }
  count() {
    this.a.count(this.counter);
  }
};
const b = new B(new A());
b.count();
b.count();
// stamp 결합

const A = class {
  count(v) {
    return ++v;
  }
};
const B = class {
  constructor(a) {
    this.a = a;
    this.counter = 0;
  }
  count() {
    this.counter = this.a.count(this.counter);
  }
};
const b = new B(new A());
b.count();
b.count();
/*
  결합도
    content
    common
    external
    control
    stamp
    data
  응집도
    coincidental
    logical
    temporal
    procedural
    communication
    sequential
    functional
*/
const Util = class {
  static isConnect(){}
  static log(){}
  static isLogin(){}
};
// coincidental 관련 없는 애들을 우연히 모아두면 안된다. 수정할떄 문제가 발생

const Math = class {
  static sin(r) {}
  static cos(r) {}
  static random() {}
  static sqrt(v) {}
};
// logical 상대적인 개념임 특정 집단에겐 비논리적일 수 있음

const App = class {
  init() {
    this.db.init();
    this.net.init();
    this.asset.init();
    this.ui.start();
  }
};
// temporal 순차적 실행(code로 설명이 불가능함 왜 저러한 순서를 가지는지), 병렬에대한 개념이 없음, 순서에 비의존적인 형태를 짜려고 노력해야함

const Account = class {
  login() {
    p = this.ptoken();
    s = this.stoken(p);
    if(!s) this.newLogin();
    else this.auth(s);
  }
};
// procedural 절차의 표현이 들어가있음

const Array = class {
  push(v) {}
  pop() {}
  shift() {}
  unshift(v) {}
};
// communication

const Account = class {
  ptoken() {
    return this.pk || (this.pk = ID.cookie.get("ptoken"))
  }
  stoken() {
    if(this.sk) return this.sk;
    if(this.pk) {
      const sk = Net.getSessionFromPtoken(this.pk);
      sk.then(v => this.sk);
    }
  }
  auth() {
    if(this.isLogin) return;
    Net.auth(this.sk).then(v => this.isLogin);
  }
};
// sequential
/*
  FUNCTIONAL

  역활모델에 충실하게 단일한 기능이 의존성 없이 생성된 경우
*/