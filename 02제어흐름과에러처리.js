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