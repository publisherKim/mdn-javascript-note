// Block State: 코드를 묶는 가장 기본적인 문법
/*
    {
        statement_1;
        statement_2;
        .
        .
        .
        statement_n;
    }
*/
var x = 1;
while (x < 10) {
    x++;
    console.log(x);
}
/* 
    {
        x++;
        console.log(x);
    }
    block문 {//이부분}
    ECMAScript 6부터 블록범위
*/
var x = 1;
{
  var x = 2;
}
console.log(x); // outputs 2

// 여러 줄의 문장을 실행하기 위해, block 문({ ... })안에 코드들을 작성 tip
if (condition) {
    statement_1_runs_if_condition_is_true;
    statement_2_runs_if_condition_is_true;
} else {
    statement_3_runs_if_condition_is_false;
    statement_4_runs_if_condition_is_false;
}

// bad 조건문 안에서 할당은 착각할수 있음
if (x = y) {
    /* statements here */
}

// 조건식에 할당을 사용해야하는 경우, 일반적인 관행은 할당 주위에 추가 괄호
if ((x = y)) {
    /* statements here */
}

// Boolean 개체의 참과 거짓 값으로 원시 boolean 값 true와 false를 혼동하지 마세요
var b = new Boolean(false);
if (b) {
    console.log('do this why?'); // this condition evaluates to true
}

function checkData(text) {
    if (text.length == 3) {
      return true;
    } else {
      alert("Enter exactly three characters. " +
      text.value + " is not valid.");
      return false;
    }
}

// Switch문은 프로그램이 표현식을 평가하고  값을 조건과 비교하고 값과 조건이 일치하면 실행
switch (expression) {
    case label_1:
        statements_1
        break;
    case label_2:
        statements_2
        break;
    default:
        statements_def
        break;
}

// throw: throw expression;
throw "Error2";   // String type
throw 42;         // Number type
throw true;       // Boolean type
throw {toString: function() { return "I'm an object!"; } };

// Create an object type UserException
function UserException (message){
    this.message=message;
    this.name="UserException";
}

// Make the exception convert to a pretty string when used as a string 
// (e.g. by the error console)
UserException.prototype.toString = function () {
    return this.name + ': "' + this.message + '"';
}

// Create an instance of the object type and throw it
throw new UserException("Value too high");

// 생성자 함수를 통한 throw instance 만들기 왜 쓰는진 모르겠다.

// try...catch: 시도할 블록을 표시하고, 예외가 발생하였을때, 하나 이상의 반응을 명시
/*
    try 블록이 성공하길 원하고, try 블록이 성공하지 않았다면, 제어를 catch 블록으로 넘기고 싶을 것입니다. 
    만약 try 블록(또는 try 블록에서 호출하는 함수) 의 문장이 예외를 발생시켰을때, 제어는 즉시 catch 블록으로 이동합니다. 
    만약 try 블록에서 예외가 발생하지 않았을 때, catch 블록을 건너뜁니다. 
    finally 블록은 try 블록과 catch 블록의 시행이 끝나고 try...catch 문법 다음의 문장이 시행 되기 전에 시행됩니다.
*/
function getMonthName (mo) {
    mo = mo-1; // Adjust month number for array index (1=Jan, 12=Dec)
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul",
                  "Aug","Sep","Oct","Nov","Dec"];
    if (months[mo] != null) {
      return months[mo];
    } else {
      throw "InvalidMonthNo"; //throw keyword is used here
    }
}

function logMyErrors (e) {
    console.log('아항 로그찍을려고::::: ', e);
}

try { // statements to try
    monthName = getMonthName(myMonth); // function could throw exception
}
catch (e) {
    monthName = "unknown";
    logMyErrors(e); // pass exception object to error handler
}

function openMyFile() {
  console.log('file 열었다.');
}
function writeMyFile(theData) {
  console.log('파일에 ' + theData + '작성한다.');
}
function closeMyFile() {
  console.log('file 닫았다.');
}
function handleError(e) {
  console.log('에러 처리를 다룬당', e);
}
openMyFile();
try {
  writeMyFile(theData); //This may throw a error no error 'theData'
} catch(e) {  
  handleError(e); // If we got a error we handle it
} finally {
  closeMyFile(); // always close the resource
}

function f() {
  try {
    console.log(0);
    throw "bogus";
  } catch(e) {
    console.log(1);
    return true; // this return statement is suspended
                 // until finally block has completed
    console.log(2); // not reachable
  } finally {
    console.log(3);
    return false; // overwrites the previous "return"
    console.log(4); // not reachable
  }
  // "return false" is executed now  
  console.log(5); // not reachable
}
f(); // alerts 0, 1, 3; returns 
// 에러없이 수행될경우 catch문을 타지만 finally문에서 false를 반환하고 함수를 종료한다.

// javascript를 동작을 잘 이해하면 매우 당연하다. 
// 안쪽부터 실행할거고 catch문에서 throw e를 만나고 일시 정지했다가 finally false를 반환하고 종료한다.
function f() {
  try {
    throw "bogus";
  } catch(e) {
    console.log('caught inner "bogus"');
    throw e; // this throw statement is suspended until 
             // finally block has completed
  } finally {
    return false; // overwrites the previous "throw"
  }
  // "return false" is executed now
}

// 즉 여기서의 try catch문은 불필요한 문이다.
try {
  f();
} catch(e) {
  // this is never reached because the throw inside
  // the catch is overwritten
  // by the return in finally
  console.log('caught outer "bogus"');
}
// OUTPUT
// caught inner "bogus"

// true or false로 코드의 흐름을 추적할수 있다.
function ourCodeMakesAMistake() {
  return true;
}

function doSomethingToGetAJavascriptError() {
  throw new Error('똑바로 하세요')
}

function doSomethingErrorProne () {
  console.log(ourCodeMakesAMistake());
  if (ourCodeMakesAMistake()) {
    throw (new Error('The message'));
  } else {
    doSomethingToGetAJavascriptError();
  }
}

try {
  doSomethingErrorProne();
}
catch (e) {
  console.log(e.name); // logs 'Error'
  console.log(e.message); // logs 'The message' or a JavaScript error message)
}

// ES6
/*
  pending: 초기상태, fulfilled 되거나 rejected 되지 않음.
  fulfilled: 연산 수행 성공.
  rejected: 연산 수행 실패.
  settled: Promise 가 fulfilled 이거나 rejected 이지만 pending 은 아님.
*/
function imgLoad(url) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'blob';
    request.onload = function() {
      if (request.status === 200) {
        resolve(request.responseURL);
      } else {
        reject(Error('Image didn\'t load successfully; error code:' 
                     + request.statusText));
      }
    };
    request.onerror = function() {
      reject(Error('There was a network error.'));
    };
    console.log('resolveData: ', request);
    request.send();
  });
}
// 응답이 성공하면 image를 가져오고 request.send();
// 응답이 실패하면 거절하고
// 사실 잘 모르겠다 url을 센드하긴 하는데 왜쓰는지는
// http://han41858.tistory.com/11 이 블로그를 참조하자