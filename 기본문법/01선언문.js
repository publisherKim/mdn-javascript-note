// JavaScript에서 선언은 3가지 방법이 있습니다.
var a = 1;
// 변수를 선언. 추가로 동시에 값을 초기화.
let b = 2;
// block scope local variable and value init
const c = 3;
// read only, 상수
/*
변수 선언은 아래 3가지 방법으로 가능합니다.

    1. var 키워드로. 예를 들어, var x = 42. 이 구문은 지역 및 전역 변수를 선언하는데 모두 사용될 수 있습니다.
    2. 간단하게 값을 할당합니다. 예를 들어, x = 42 로 선언하면 이 변수는 전역 변수로 지정됩니다. 이 방식은 strict mode의  JavaScript에서 경고를 발생시켜 실행이 안됩니다. 
    이 방법은 strict mode의 JavaScript에서 사용해서는 안됩니다.
    3. let 키워드로. 예를 들어, let y = 13. 이 구문은 블록 범위 지역 변수를 선언하는데 사용될 수 있습니다. 아래 변수 범위 참고하세요.
*/ 
// variable evaluation
var a;
console.log(a); // undefined
console.log(b); // Reference Error 참조 에러 정의되지 않은 변수에 접근을 시도할때 발생  

// undefined use variable exist evaluation
var input;
if (input === undefined) {
    console.log('doThis');
} else {
    console.log('doThat')
}

// undefined value is booleanType context use false
var myArray = [];
if (!myArray[0]) console.log('doThis'); // undefined 값은 조건문 평가에서 fasle 이다.

// undefined value is nubmberType context use NaN
var a;
a + 2;  // NaN

// null evaluation, numberType context use 0, booleanType context use false
var n = null;
console.log(n * 32);    // 0 * 32 => 0

// variable scope
if (true) {
    var x = 5;
}
console.log(x); // 5

if (true) {
    let y = 5;
}
console.log(y); // ReferenceError: y is not defined

// variable hoisting
console.log(x === undefined);   // logs true
var x = 3;
/*
    var x;
    console.log(x === undefined);
    x = 3;
    위 두개의 코드는 결과적으로 동치
    자바스크립트는 엔진이 해석할때 
    문장을 순차적으로 파싱하지 않고
    선언문의 경우 변수나 함수나 제일 우선석으로 var a; var funcName; 형태로 해석한다. 
    실제로 문서의 작성이 바껴서 끌어 올려짐이 존재하는진 모르겠으나 저런식의 작업을 우선 하고 문장들을 순차적으로 해석해 나간다.
    더 엔진 입장에서 보면 그냥 변수명 함수명을 값이 할당하지 않은채로 미리 메모리에 저장하고 함수를 호출하거나 변수명을 만나는 순간에 값을 할당 한다고 본다.
    이름이 똑같은 변수들을 로컬 스코프에서 구별하기 위해 값을 그때 할당해야 할 필요가 있지 않았나 싶다.
*/

var myvar = 'my value';
(function() {
    console.log(myvar); // undefined
    var myvar = "local value";
})();
/*
var myvar;
console.log('전역 호이스팅 원리: ', myvar);
myvar = 'my value';
(function() {
    var myvar;
    console.log('지역 호이스팅 원리:', myvar);
    myvar = 'local value';
})();
    위 두개의 코드는 결과적으로 동치
*/
/*
    전역 변수

    전역 변수는 사실 global 객체의 속성(property)입니다. 웹 페이지에서 global 객체는 window 이므로, 
    windows.variable 구문을 통해 전역 변수를 설정하고 접근할 수 있습니다.

    그 결과, window 혹은 frame의 이름을 지정하여 한 window 혹은 frame에서 다른 window 혹은 frame에 선언된 전역 변수에 접근할 수 있습니다. 
    예를 들어, phoneNumber 라는 변수가 문서에 선언된 경우, iframe에서 parent.phoneNumber로 이 변수를 참조할 수 있습니다.
    즉 문서의 scope가 달라도 parent를 통해서 상위문서에 접근할수 있다. 
    framework들의 props 전달 방식과 반대되는 개념으로 볼수 있다. 
    자바스크립트의 시작은 전역에서 출발.
*/

// 상수
const prefix = '212';
prefix = 111;   //  Assignment to constant variable.

// 상수는 같은 범위에 있는 함수나 변수와 동일한 이름으로 선언할 수 없습니다.
function f() {};
const f = 5;    // Identifier 'f' has already been declared

function f() {
    const g = 5;
    var g;  
}
f();    // Identifier 'g' has already been declared

// data structure and type
/*
    data type
    data type is 7
    Boolean. true or false
    null.
    udefined.
    Number.
    String
    Symbol. (ECMAScript 6에 도입) 인스턴스가 고유하고 불변인 데이터 형.
    Object
    객체는 값을 위한 컨테이너, 함수는 어플리케션이 수행할 수 있는 절차(procedure)
    
    procedure?
    
    프로그래밍에서, 프로시저는 루틴이나, 서브루틴 및 함수와 같은 뜻입니다.
    즉 하나의 독립 수행 매체를 이야기 하는 것입니다.

    특정 function으로 이해해도 되는데, 독립된 루틴이라고 생각하시는 것이 가장 좋습니다.
    프로시저 콜이란 말을 많이 쓰는데, 특정 작업을 위해서 호출하는 경우에 그런 말을 씁니다. 
    
    DB의 경우에는 store procedure 를 관계형 데이터베이스 범위 내에서
    컴파일 및 실행된 명령어 세트라고 칭하기도 합니다.
    결국 특정 모듈이라는 것과 비슷한 말입니다.
*/
// data type conversion
/*
    JavaScript는 동적 형지정(정형) 언어입니다. 이는 변수를 선언할 때 데이터 형을 지정할 필요가 없음을 의미합니다. 
    또한 데이터 형이 스크립트 실행 도중 필요에 의해 자동으로 변환됨을 뜻합니다.
*/
var answer = 42;
answer = "string";
// 서로다른 타입을 할당해도 무방하다.

x = "The answer is " + 42 // "The answer is 42"
y = 42 + " is the answer" // "42 is the answer"

// note: 문자열 + 숫자의 경우 숫자를 문자열로 변환한다.
// 문자열 -, *, %의 경우 숫자 값을 문자열로 변환하지 않는다.
"37" - 7 // 30
"37" + 7 // 377
typeof ("37" - 7);  // number
typeof ("37" + 7);  // string

// string convert to number
// parseInt(), parseFloat() 등이 있으나 정수 또는 진법을 표기하거나 작성이 길므로*1등을 사용하는것이 좋다.
"1.1" + "1.1"   // "1.11.1"
(+"1.1") + (+"1.1") // 2.2

// literal
// JavaScript에서 값을 나타내기 위해 리터럴을 사용합니다. 이는 말 그대로 스크립트에 부여한 고정값으로, 변수가 아닙니다.
/*
    array literal
    boolean literal
    floating point literal
    int literal
    object literal
    regExp literal
    string literal
*/
// array literal: 0개 이상의 식(expression) 목록입니다.
var coffees = ["French Roast", "Colombian", "Kona"];

// boolean literal: Boolean 객체는 원시 불린 데이터 형을 감싸는 래퍼(wrapper)
Boolean(target); // result
// true false 원시값과는 다름

// int lireral: 정수는 10진, 16진, 8진 및 2진수로 표현
/*
    10진 정수 리터럴은 선행 0(zero)이 아닌 숫자열로 이루어집니다.
    정수 리터럴에서 선행 0(zero)이나 선행 0o(혹은 0O)은 8진수임을 나타냅니다. 8진 정수는 오직 숫자 0-7만 포함할 수 있습니다.
    선행 0x(나 0X)는 16진수임을 나타냅니다. 16진 정수는 숫자 0-9 및 문자 a-f, A-F를 포함할 수 있습니다.
    선행 0b(나 0B)는 2진수임을 나타냅니다. 2진 정수는 오직 숫자 0과 1만 포함할 수 있습니다.
*/
0, 117  // 10진수
015, 0001, -0o77    // 8진수 0+value, 0o+value 
0x1123, 0x00111, -0xF1A7    // 16진수 0x+value, 0~9 alphabet F까지 표현가능 총 16개 
0b11, 0b0011, -0b11 // 2진수 0b+value

// floating point literal
/*
    부호("+"나 "-")가 달릴 수 있는 10진 정수,
    소수점("."),
    소수(또 다른 10진수),
    지수.
*/
3.1415926
-.123456789
-3.1E+12
.1e-23

// object literal: 객체 리터럴은 중괄호({})로 묶인 0개 이상인 객체의 속성명과 관련 값 쌍 목록입니다.
var sales = "Toyota";

function carTypes(name) {
    if (name === "Honda") {
        return name;
    }
    return "Sorry, we don't sell " + name + ".";
}

var car = { myCar: "Saturn", getCar: carTypes("Honda"), special: sales};

console.log(car.myCar); // Saturn: car 객체의 속성 값 활용
console.log(car.getCar);    // Honda: carType함수의 파라미터와 car.getCar("Honda") 값을 활용 
console.log(car.special);   // Toyota: sales의 전역변수와 car.special의 값을 변수주소지를 통해서 추적

var car = {manyCars: {a: "Saab", "b": "Jeep"}, 7: "Mazda"};
console.log(car.manyCars.b); // Jeep
console.log(car[7]); // Mazda
// 객체 중첩을 통해서도 활용가능 

var unusualPropertyNames = {
    "": "An empty string",
    "!": "Bang!"
  };

  console.log(unusualPropertyNames."");   // SyntaxError: Unexpected string
  console.log(unusualPropertyNames[""]);  // An empty string
  console.log(unusualPropertyNames.!);    // SyntaxError: Unexpected token !
  console.log(unusualPropertyNames["!"]); // Bang!
  // 대괄호 문법과 .표기법의 차이  객체의 속성으로 어떤 문자열도 가능하나  유효한 식별자가 아닌 속성은 .속성은로 접근 불가.

  // ES2015 단축 표기법
  var obj = {
    // __proto__
    __proto__: theProtoObj,
    // ‘handler: handler’의 단축 표기
    handler,
    // Methods
    toString() {
     // Super calls
     return "d " + super.toString();
    },
    // Computed (dynamic) property names
    [ 'prop_' + (() => 42)() ]: 42
};

// regExp literal
var re = /ab+c/;

// string literal: 문자열 리터럴은 큰 따옴표(") 혹은 작은 따옴표(')로 묶인 0개 이상의 문자
"foo"
'bar'
"1234"
"one line \n another line"
"John's cat"

console.log("John's cat".length);   // boxing unboxing 엔진이 문자열 리터럴을 임시 문자열 객체로 변환, 메서드를 호출하고 나서 임시 문자열 객체를 폐기
var k = new String('string');
k.length;   // 문자열 객체
/*
    var k = {
        0: "s"
        1: "t"
        2: "r"
        3: "i"
        4: "n"
        5: "g"
    }
*/
// 기본적인 문자열 리터럴 생성
`In JavaScript '\n' is a line-feed.`

// 여러 줄 문자열
`In JavaScript this is
 not legal.`

// 문자열 삽입
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
// Construct an HTTP request prefix is used to interpret the replacements and construction
POST`http://foo.org/bar?a=${a}&b=${b}
    Content-Type: application/json
    X-Credentials: ${credentials}
    { "foo": ${foo},
    "bar": ${bar}}`(myOnReadyStateChangeHandler);

// string escape
var quote = "He read \"The Cremation of Sam McGee\" by R.W. Service.";
console.log(quote);
var home = "c:\\temp";
console.log(home)   // c:\temp

var str = "this string \
is broken \
across multiple\
lines."
console.log(str);   // this string is broken across multiplelines. 
var poem =
"Roses are red,\n\
Violets are blue.\n\
I'm schizophrenic,\n\
And so am I."
console.log(poem);  // 템플릿 리터럴을 쓰면 불필요하다. 자연스럽게 표현하고 싶은대로 쓰면 된다. 위 두코드의 이스케이프에 대해서 고민할 필요가 없어진다.