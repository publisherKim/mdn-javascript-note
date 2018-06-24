const infinity = (function*(){
  let i = 0;
  while(true) yield i++;
});
console.log(infinity.next());
console.log(infinity.next());

// blocking evasion
// time slicing manual
const looper = (n, f, slice = 3) => {
  let limit = 0, i = 0;
  const runner = _ =>{
    while(i < n){
      if(limit++ < slice) f(i++);
      else {
        limit = 0;
        requestAnimationFrame(runner);
        break;
      }
    }
  };
  requestAnimationFrame(runner);
};

looper(10, console.log);

// time slicing manual using generator
const loop = function(n, f, slice = 3) {
  let i = 0, limit = 0;
  while( i < n){
    if(limit++ < slice) f(i++)
    else {
      limit = 0;
      yield;
    }
  }
};

const executor = iter => {
  const runner = _ =>{
    iter.next();
    requestAnimationFrame(runner);
  };
  requestAnimationFrame(runner);
};

executor(loop(10, console.log));

// generator + async + executor
const profile = function*(end, next, r) {
  const userid = yield $.post('member.php', {r}, next);
  let added = yield $.post('detail.php', {userid}, next);
  added = added.split(",");
  end({userid, nick:added[0], thumb:added[1]});
};

const executor = (end, gene, ...arg) => {
  const next = v => {
    iter.next(v);
  };
  const iter = gene(end, next, ...arg);
  iter.next();
}

executor(console.log, profile, 123);

// promise
// passive async controll: 콜백을 보낼 수는 있지만 언제 올지는 모른다.
$.post(url, data, e => {
  // 언제 올까?
});

// 왜 언제가 중요한가?
let result;
$.post(url1, data1, v => {
  result = v;
});
$.post(url2, data2, v => {
  result.nick = v.nick;
  report(result);
});

// active async controll
let result;
const promise = new Promise(r => $.post(url1, data1, r));
promise.then(v => {
  result = v;
});

const promise1 = new Promise(r => $.post(url1, data1, r));
const promise2 = new Promise(r => $.post(url2, data2, r));
promise1.then(result => {
  promise2.then(v => {
    result.nick = v.nick;
    report(result);
  });
});

const profile = function*(end, r) {
  const userid = yield new Promise(res => $.post('member.php', {r}, res));
  let added = yield new Promise(res =>$.post('member.php', {userid}, next), res);
  added = added.split(",");
  end({userid, nick:added[0], thumb:added[1]});
};

const executor = (gene, end, ...arg) => {
  const iter = gene(end, ...arg);
  const next = ({value, done}) => {
    if(!done) value.then(v => next(iter.next(v)));
  };
  next(iter.next());
};

executor(profile, console.log, 123);

// async await
const profile = async function(end, r) {
  const userid = await new Promise(res => $.post('member.php', {r}, res));
  let added = await new Promise(res =>$.post('member.php', {userid}, next), res);
  added = added.split(",");
  end({userid, nick:added[0], thumb:added[1]});
};

profile(console.log, 123);