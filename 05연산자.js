// 연산자
/*
    대입 연산자
    비교 연산자
    산술 연산자
    비트단위 연산자
    논리 연산자
    문자열 연산자
    조건 (삼항) 연산자
    콤마 연산자
    단항 연산자
    관계 연산자
*/
// 자바스크립트는 이항 연산자와 단항연산자, 조건연산자인 단 하나 존재하는 삼항 연산자를 가짐
// 피연산자1 연산자 피연산자2
3 + 4
x * y

// 단항 연산자는 연산자 뒤에든 앞에든 하나의 피연산자를 필요
// 연산자 피연산자 또는 피연사 연산자
x++
++x

// 대입연산자: 대입 연산자 는 오른쪽 피연산자의 값을 왼쪽 피연산자에 대입
/*
    이름                                  복합 대입 연산자	            뜻
    대입 연산	                                x = y	                x = y
    덧셈 대입	                                x += y	                x = x + y
    뺄셈 대입	                                x -= y	                x = x - y
    곱셈 대입	                                x *= y	                x = x * y
    나눗셈 대입	                               x /= y	               x = x / y
    나머지 연산 대입                             x %= y	              x = x % y
    왼쪽 이동 연산 대입	                         x <<= y	             x = x << y
    오른쪽 이동 연산 대입                        x >>= y	                x = x >> y
    부호 없는 오른쪽 이동 연산 대입	             x >>>= y	            x = x >>> y
    비트 단위 논리곱 연산 대입                   x &= y	              x = x & y
    비트 단위 배타적 논리합 연산 대입             x ^= y	                x = x ^ y
    비트 단위 논리합 연산 대입                   x |= y	              x = x | y
*/

// destructuring: 복잡한 대입 연산에서, 구조 해제 대입 문법은 배열의 구조나 객체를 반영하여, 배열이나 객체에서 데이터를 추출
var foo = ["one", "two", "three"];
// without destructuring
var one   = foo[0];
var two   = foo[1];
var three = foo[2];

var [a, b, c] = foo;

// comapare operator: 비교 연산자는 피연산자들을 비교하고 비교에 따라 논리 값을 반환                    
/*
    operator            description                                                                     true sample                                                                     
    ==                  피연산자들이 같으면 참을 반환합니다.                                               "3" == 3                                                      
    !=                  피연산자들이 다르면 참을 반환합니다.                                               1 != 4
    ===                 피연산자들이 같고 피연산자들의 같은 형태인 경우 참을 반환합니다.                     3 === 3   
    !==                 피연산자들이 다르거나 형태가 다른 경우 참을 반환합니다.                              "3" !== 3
    >                   좌변의 피연산자 보다 우변의 피연산자가 크면 참을 반환합니다.                         "12" > 2
    >=                  좌변의 피연산자 보다 우변의 피연산자가 크거나 같으면 참을 반환합니다.                 2 < "12"                 
    <                   좌변의 피연산자 보다 우변의 피연산자가 작으면 참을 반환합니다.                        1 < 2
    <=                  좌변의 피연산자 보다 우변의 피연산자가 작거나 같으면 참을 반환합니다.                 1 <= 2                   
*/

// 산술 operator: 산술 연산자는 숫자값(리터럴 또는 변수)을 피연산자로 갖고, 하나의 숫자 값을 반환 +, -, *, /, %, ++, --
1 / 2;
1 / 2 == 1.0 / 2.0; // true

// 비트단위 operator: 비트단위 연산자 는 피연산자를 10진수, 16진수, 8진수처럼 취급하지 않고 32비트의 집합
// 자세한 내용은 생략한다 필요시에 mdn이나 다른 사이트를 참고하자.

// 논리 연산자: 논리 연산자는 보통 부울 값과 사용됩니다; 부울 값들과 사용될때, 연산자는 부울값을 반환
// 그러나,&& 과 || 연산자는 실제로 명시된 피연자들 중 하나를  반환

// false sample
var a1 =  true && true;     // t && t returns true
var a2 =  true && false;    // t && f returns false
var a3 = false && true;     // f && t returns false
var a4 = false && (3 == 4); // f && f returns false
var a5 = "Cat" && "Dog";    // t && t returns Dog
var a6 = false && "Cat";    // f && t returns false
var a7 = "Cat" && false;    // t && f returns false

// true sample
var o1 =  true || true;     // t || t returns true
var o2 = false || true;     // f || t returns true
var o3 =  true || false;    // t || f returns true
var o4 = false || (3 == 4); // f || f returns false
var o5 = "Cat" || "Dog";    // t || t returns Cat
var o6 = false || "Cat";    // f || t returns Cat
var o7 = "Cat" || false;    // t || f returns Cat

// log not operator
var n1 = !true;  // !t returns false
var n2 = !false; // !f returns true
var n3 = !"Cat"; // !t returns false

/*
    tip
        false && anything 는  false로 단축 계산됩니다.
        true || anything 는 true로 단축 계산       
*/

// string operator: 문자열 값으로 사용될 수 있는 비교 연산자에 덧붙여서, 연결 연산자 (+)는 두 문자열 값을 연결하고,두 문자열이 합쳐진 새로운 문자열을 반환
"my " + "string"

// 조건 연산자: 조건 연산자 는 자바스크립트에서 3개의 항을 사용하는 유일한 연산자
// condition ? value1: value2
var age = 1
var status = (age >= 18) ? "adult" : "minor";

// comma operator: 콤마 연산자 (,)는 두 피연산자를 비교하고, 마지막 피연산자의 값을 반환
// 주로 for 반복문 안에서 각각의 시간에 복수의 변수들을 갱신하기 위하여 사용
a = [
        [
            0,1,2,3,4,5,6,7,8,9,
        ],
        [
            0,1,2,3,4,5,6,7,8,9, 
        ],
        [
            0,1,2,3,4,5,6,7,8,9, 
        ],
        [
            0,1,2,3,4,5,6,7,8,9, 
        ],
        [
            0,1,2,3,4,5,6,7,8,9, 
        ],
        [
            0,1,2,3,4,5,6,7,8,9, 
        ],
        [
            0,1,2,3,4,5,6,7,8,9, 
        ]
    ];
for (var i = 0, j = 9; i <= j; i++, j--){
    console.log("a[" + i + "][" + j + "]= " + a[i][j]);
}
/*
    0,1,2,3,4,5,6,7,8,9
    0,1,2,3,4,5,6,7,8,9
    0,1,2,3,4,5,6,7,8,9
    0,1,2,3,4,5,6,7,8,9
    0,1,2,3,4,5,6,7,8,9
    0,1,2,3,4,5,6,7,8,9
    0,1,2,3,4,5,6,7,8,9
    0,1,2,3,4,5,6,7,8,9
    0,1,2,3,4,5,6,7,8,9

    우측 상단부터 9부터 대각선하단으로  9, 8, 7, 6, 5 
*/

// 단항 연산자: 단항 연산자는 오직 하나의 피연산자를 가지고 연산

// delete: delete연산자는 객체, 객체의 속성 또는 배열의 특정한 위치에 있는 객체를 삭제
delete objectName;
delete objectName.property;
delete objectName[index];
delete property; // legal only within a with statement

x = 42;
var y = 43;
myobj = new Number();
myobj.h = 4;    // create property h
delete x;       // returns true (can delete if declared implicitly)
delete y;       // returns false (cannot delete if declared with var)
delete Math.PI; // returns false (cannot delete predefined properties)
delete myobj.h; // returns true (can delete user-defined properties)
delete myobj;   // returns true (can delete if declared implicitly)

// 배열의 원소 삭제하기
var trees = ["redwood", "bay", "cedar", "oak", "maple"];
delete trees[3];
if (3 in trees) {
  // this does not get executed
}
console.log(trees);

var trees = ["redwood", "bay", "cedar", "oak", "maple"];
trees[3] = undefined;
if (3 in trees) {
    // this gets executed
    console.log(trees);
}

// typeof:  연산자 피연산자의 타입을 나타내는 문자열을 반환
typeof operand
typeof (operand)

var myFun = new Function("5 + 2");
var shape = "round";
var size = 1;
var today = new Date();

typeof myFun;     // returns "function"
typeof shape;     // returns "string"
typeof size;      // returns "number"
typeof today;     // returns "object"
typeof dontExist; // returns "undefined"

typeof true; // returns "boolean"
typeof null; // returns "object

typeof 62;            // returns "number"
typeof 'Hello world'; // returns "string"

typeof document.lastModified; // returns "string"
typeof window.length;         // returns "number"
typeof Math.LN2;              // returns "number"

typeof blur;        // returns "function"
typeof eval;        // returns "function"
typeof parseInt;    // returns "function"
typeof shape.split; // returns "function"

typeof Date;     // returns "function"
typeof Function; // returns "function"
typeof Math;     // returns "object"
typeof Option;   // returns "function"
typeof String;   // returns "function"

// void: 연산자는 값을 반환하지 않고 평가되도록 명시
void (expression)
void expression

// 관계 연산자: 관계 연산자는 피연산자들을 비교하고 ,비교의 참 여부에 기반하여 부울 값을 반환
propNameOrNumber in objectName
// 객체 안에 속성명이 있느냐 ?
// Arrays
var trees = ["redwood", "bay", "cedar", "oak", "maple"];
0 in trees;        // returns true
3 in trees;        // returns true
6 in trees;        // returns false
"bay" in trees;    // returns false (you must specify the index number,
                   // not the value at that index)
"length" in trees; // returns true (length is an Array property)

// built-in objects
"PI" in Math;          // returns true
var myString = new String("coral");
"length" in myString;  // returns true

// Custom objects
var mycar = { make: "Honda", model: "Accord", year: 1998 };
"make" in mycar;  // returns true
"model" in mycar; // returns true

// instanceof: instanceof 연산자는 명시된 객체가 명시된 객체형인 경우 true를 반환
objectName instanceof objectType

// theDay 객체가  Date 형의 객체인지  알아내는 코드
var theDay = new Date(1995, 12, 17);
if (theDay instanceof Date) {
    console.log('Date형으로부터 파생되었음을 알수 있다.');
    // statements to execute
}

// 연산자 우선순위표는 mdn을 참조하자 
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/%EC%97%B0%EC%82%B0%EC%9E%90_%EC%9A%B0%EC%84%A0%EC%88%9C%EC%9C%84#Table

// express
/*
코드 값으로 확인된 표현은 그 어떤 타당한 단위입니다. 
개념적으로, 2가지의 유형이 있습니다. 첫번째는, 변수에 값을 할당시키는 것, 두번째는 단순히 값을 갖는것이 있습니다.
x = 7이란 표현은 첫번째 유형입니다.  이 표현은 x에다가 7을 할당시키기위해 =연산자를 사용합니다. 그  표현자체 7로 계산됩니다.
3 + 4란 코드는 두번째 표현방식의 예입니다. 이 표현은 7이라는 결과로 할당하는것없이 3과 4를 더하기위해 +연산자를 사용합니다.

    1. 산수 : 예를 들어 3.14159를 숫자로 평가합니다. (일반적으로 산술 연산자를 사용합니다.)
    2. 문자열 : 예를 들어 "Fred"나 "234"를 문자열로 평가합니다. (일반적으로 문자열 연산자를 사용합니다.)
    3. 논리 : 참이나 거짓으로 평가합니다. (종종 논리 연산자를 수반합니다.)
    4. 일차식 : 자바스크립트안에서 기본핵심어와 일반적인 표현입니다.
    5. 좌변식 : 좌변값들이 배치의 목적입니다.
*/

// 1차식: 자바스크립트안에서 기본핵심어와 일반적표현
// this: 현재 객체를 참조하는 데 this 키워드를 사용
this["propertyName"]
this.propertyName

function validate(obj, lowval, hival){
    if ((obj < lowval) || (obj > hival))
        console.log("Invalid Value!");
}
validate(1, 18, 99);

// 그룹연산자: 그룹연산자 ()는 표현식 평가의 우선순위를 조절
var a = 1;
var b = 2;
var c = 3;

// default precedence
a + b * c     // 7
// evaluated by default like this
a + (b * c)   // 7

// now overriding precedence 
// addition before multiplication   
(a + b) * c   // 9

// which is equivalent to
a * c + b * c // 9

// Comprehensions: Comprehensions은 실험적인 자바스크립트 기능이며, 미래 ECMA스크립트 버전에 포함이 될 것
/*
    [for (x of y) x]
    배열 comprehensions.

    (for (x of y) y)
    생성기(Generator) comprehensions.
*/

// Comprehensions는 많은 프로그래밍 언어에서 존재하고 기존의 배열을 바탕으로하여 빨리 모을 수 있게 한다.
for (i of [ 1, 2, 3 ]) {
    console.log('process: ', i, '*', i, '=', i * i );
    i * i;
} 

var abc = [ "A", "B", "C" ];
for (letters of abc) {
    console.log(letters);
    letters.toLowerCase();
}

// 좌변식: 좌측값들이 좌변식의 목적
// new: 사용자 정의 객체 형식 또는 한 내장된 객체 형식의 인스턴스를 만드는 데는 new 연산자를 사용
var objectName = new objectType([param1, param2, ..., paramN]);

// super: Super 키워드는개체의 부모에 함수를 호출하는 데 사용
super([arguments]); // calls the parent constructor.
super.functionOnParent([arguments]);
// super 개념은 좀더 공부가 필요.

// 확장 연산자: 확산연산자는 다중인수(함수호출)또는 다중요소(문자배열)들이 예상되는 곳에서 확장
/*
    기존의 것과 함께 새로운 배열을 만들고싶다면, 배열 문자열 구문은 더이상 충분하지않고 다시 명령 코드로 되돌아가야합니다. 
    푸시, 스플라이스, concat 등의 확산 구문을 결합하는 것은 더욱 간결
    확산연산자는 함수 호출과 사용가능
*/
var parts = ['shoulder', 'knees'];
var lyrics = ['head', ...parts, 'and', 'toes'];

function f(x, y, z) {
    console.log(x, y, z);
    return x + y + z;
}
function test(x, y, z) {
    return x * y * z;
}
var args = [0, 1, 2];
f(...args);
test(...args);
