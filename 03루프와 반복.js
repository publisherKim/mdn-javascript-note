var step;
for (step = 0; step < 5; step++) {
  // Runs 5 times, with values of step 0 through 4.
  console.log('Walking east '+ step+' step');
}

/*
  for 문
  do...while 문
  while 문
  레이블 문
  break 문
  continue 문
  for...in 문
  for...of 문
*/
// for state: for 반복문은 어떤 특정한 조건이 거짓으로 판별될 때까지 반복
/*
  for ([초기문]; [조건문]; [증감문])
  문장
  초기화 구문인 초기문이 존재한다면 초기문이 실행됩니다. 이 표현은 보통 1이나 반복문 카운터로 초기 설정이 됩니다. 
  그러나 복잡한 구문으로 표현 될 때도 있습니다. 또한 변수로 선언 되기도 합니다.
  
  조건문은 조건을 검사합니다. 만약 조건문이 참이라면, 그 반복문은 실행됩니다. 만약 조건문이 거짓이라면, 그 for문은 종결됩니다. 
  만약 그 조건문이 생략된다면, 그 조건문은 참으로 추정됩니다.
  
  문장이 실행됩니다. 많은 문장을 실행할 경우엔, { } 를 써서 문장들을 묶어 줍니다.
 
  갱신 구문인 증감문이 존재한다면 실행되고 2번째 단계로 돌아갑니다.
*/

// do while state: do...while 문은 특정한 조건이 거짓으로 판별될 때까지 반복
/*
  do
    문장
  while (조건문);
*/
var i = 0;
do {
  i += 1;
  console.log(i);
} while (i < 5);
//  do 반복문은 최소 한번은 반복

// whiel state: while 문은 어떤 조건문이 참이기만 하면 문장을 계속해서 수행
/*
  while (조건문)
    문장
*/
n = 0;
x = 0;
while (n < 3) {
  n++;
  x += n;
}
// n = 1 => x = 1,  n = 2 => x = 1 + 2, n = 3 => x = 3 + 3 result 6; 

// 레이블 state: 레이블은 여러분이 프로그램에서 다른 곳으로 참조할 수 있도록 식별자로 문을 제공
/* 
  label :
    statement
*/
var theMark = true;
markLoop:
while (theMark == true) {
   doSomething();
}
function doSomething() {
  return theMark = false;
}

// break state: 반복문, switch문, 레이블 문과 결합한 문장을 빠져나올  때 사용
/*
  레이블 없이 break문을 쓸 때,
  레이블 문을 쓸 때, 특정 레이블 문에서 끝납니다.
  break;
  break 레이블;
*/
var i;
var a = [1,2,3,4,5,100,7];
var theValue = 100;
for (i = 0; i < a.length; i++) {
  if (a[i] == theValue) {
    a[i];
    break;
  }
}

var x = 0;
var z = 0
labelCancelLoops: while (true) {
  console.log("Outer loops::::: x: " + x);
  x += 1;
  z = 1;
  while (true) {
    console.log("Inner loops: " + z);
    z += 1;
    if (z === 10 && x === 10) {
      break labelCancelLoops;
    } else if (z === 10) {
      console.log(x, z)
      break;
    }
  }
}
// outer 0 inner 1 ~ 9, outer 1 inner 1 ~ 9 ... outer 9 inner 1 ~ 9  x = 10, z = 10, 일떄 labelCancelLoops로 이동

//continue state: while, do-while, for, 레이블 문을 다시 시작하기 위해 사용
i = 0;
n = 0;
while (i < 5) {
  i++;
  if (i == 3) {
    continue;
  }
  console.log(i, n);
  n += i;
}

var i= 0, j = 10;
checkiandj:
while (i < 4) {
  console.log("i +=::::: ", i);
  i += 1;
  checkj:
    while (j > 4) {
      console.log("j -=::::: ", j);
      j -= 1;
      if ((j % 2) == 0) {
        continue checkj;
      }
      console.log(j + " is odd.");
    }
    console.log("i = " + i);
    console.log("j = " + j);
}

// for...in: state 객체의 열거 속성을 통해 지정된 변수를 반복
/*
  for (variable in object) {
    statements
  }
*/
var car = {make:'Ford', modle:'Mustang'};
function dump_props(obj, obj_name) {
  var result = "";
  for (var i in obj) {
    result += obj_name + "." + i + " = " + obj[i] + "<br>";
  }
  result += "<hr>";
  return result;
}
dump_props(car, 'car');

// for of state: 각각의 고유한 특성의 값을 실행할 명령과 함께 사용자 지정 반복 후크를 호출하여, 
// 반복 가능한 객체(배열, Map, Set, 인수 객체 등을 포함)를 통해 반복하는 루프
/*
  for (variable of object) {
    statement
  }
*/

let arr = [3, 5, 7];
arr.foo = "hello";

for (let i in arr) {
   console.log(i); // logs "0", "1", "2", "foo"
   // console.log(arr[i]);
}

for (let item of arr) {
   console.log(item); // logs "3", "5", "7"
}