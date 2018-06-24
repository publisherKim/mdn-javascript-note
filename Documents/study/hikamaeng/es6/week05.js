import { request } from "https";

// block noneblock 
// flow is blocking
// 프로그램이 실행되면 도중에 멈춰지지 않고 끝까지 실행됨
for(const i of (function *(){
  let i = 0;
  while(true) yield i++;
})()) console.log(i);
// script timeout
// 플랫폼의 안정성을 위해 블록되는 시간이 길면 강제 종료시킴
// 스크립트 구동시간 15초 ie 기준 안드로이드 os 기준으로 5초
// 제어권이 os에 있음
// blocking function: 점유하는 시간만큼 블록을 일으키는 함수
const f = v => {
  let i = 0;
  while(i++ < v);
  return i
};
f(10);
f(100000000);
// block이란 코드의 흐름을 막는것을 의미한다. 위 코드의 경우 제어문이 진행되는 순가 다음 코드로 진행할수 없다.
// 배열순회, 정렬 = 배열크기에 따라
// DOM순회 - DOM의 하위 구조에 따라
// 이미지프로세싱 - 이미지 크기에 따라
// 블록함수는 메모리 허용량을 초과하지 않을때까지만 돌아간다.

// blocking evasion: 블로킹 회피
// 독점적인 cpu점유로 인해 모든 동작이 정지됨
// 타임아웃체크에 의해 프로그램이 강제 중단됨
// 블록킹의 조합을 예측할 수 없음
const f = v => other(some(v), v * 2);
f(10);
// block 연쇄시 어느 시점에 죽는지 파악이 불가능
// 순차적인 실행 1,2,3 적재, 실행완료 패턴
// 시분할 운영체제의 동시 실행 1, 2, 1, 2, 3, 1, 2, 1 동시진행인것처럼 느껴짐
// 전체 시간은 분명히 순차 실행이 빠름 이유 context switching expensive
// javascript thread
// main ui thread l
// background thread n
// web worker thread
// 최소 7개
const looper = (n, f) => {
  for(let i = 0; i < n; i++) f(i);
};
looper(10, console.log);
looper(10000, console.log);

// the slicing manual
const looper = (n, f, slice = 3) => {
  let limit = 0, i = 0;
  const runner = _ => {
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
looper(10000, console.log);
// 위의 코드는 noneblock 함수이다.
// i = 유지하고 , 재귀함수를 이용해 limit를 초기화해서 noneblocking을 유지한다. 시간에 대한 관리 iframe을 3으로 쪼갰다.

// time slicing auto
const looper = (n, f, ms = 5000, i = 0) => {
  let old = performance.now(), curr;
  const runner = _ => {
    while(i < n){
      curr  = performance.now();
      if(curr - old < ms) f(i++);
      else {
        old = curr;
        requestAnimationFrame(runner);
        break;
      }
    }
  };
  requestAnimationFrame(runner);
};
looper(1000, console.log);
// perforamance.now는 date.now보다 빠르다. 다행히 크롬에서 performance.now는 inmemory객체이다.

// web worker
const backRun = (f, end, ...arg)=>{
  const blob = new Blob([`
    onmessage = e => postMessage((${f})(e.data));
  `], {type: 'text/javscript'});
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);
  worker.onmessage = e => end(e.data);
  worker.onerror = e => end(null);
  worker.postMessage(arg);
};
backRun(v => v[0] + v[1], console.log, 3, 5);

const backRun2 = (f, end, ...arg)=>{
  const blob = new Blob([`
    onmessage = e => postMessage((${f})(e.data));
  `], {type: 'text/javscript'});
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);
  worker.onmessage = e => end(e.data);
  worker.onerror = e => end(null);
  worker.postMessage(arg);
};
const test2 = backRun2(v => v[0] + v[1], alert, 3, 5);
// 서브루틴이 즉시 플로우 제어권을 내놓는 것
const a = 123;
looper(12, console.log);
backRun(v => v[0] + v[1], console.log, 3,5);
console.log(a); // 어쩃든 콘솔은 1,2,3,부터 출력, looper가 먼저 실행되지 않았다.
// 순차에 무관한 병행성 프로그램을 짤수 있어야 한다.

// sync, async

// sync: 서브루틴이 즉시 값을 반환함
const double = v => v*2;
console.log(double(2)); // 4

// async: 서브루틴이 콜백을 통해 값을 반환함
const double = (v, f) => f(v*2);
double(2, console.log); // 4;

// sync -> block 즉시 플로우 제어권을 반환하지 않음
const sum = n => {
  let sum = 0;
  for(let i = 1; i <= n; i++) sum += i;
  return sum;
};
sum(100);

// sync -> non block 즉시 플로우 제어권을 반환함
const sum = n => {
  const result = {isCompleted:false}
  requestAnimationFrame(_ => {
    let sum  = 0;
    for(let i = 1; i <= n; i++) sum += i;
    result.isComplete = true;
    result.value = sum;
  });
  return result;
}
const result = sum(100);
while(!result.isComplete);
console.log(result.value);

// async => block 
const sum = (n, f) => {
  let sum = 0;
  for(let i = 0; i <= n; i++) sum += i;
  return f(sum);
};
sum(10, console.log);
console.log(123);
// 55 -> 123

// async => non block
const sum = (n, f) => {
  requestAnimationFrame(_=>{
    let sum = 0;
    for(let i = 1; i <= n; i++) sum += i;
    f(sum)
  });
};
sum(10, console.log);
console.log(123);
// 123 => 55