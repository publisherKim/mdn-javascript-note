/*
    수 (Numbers)
        설계 명세서에 의하면 JavaScript에서 수는 "이중정밀도 64비트 형식 IEEE 754 값"으로 정의됩니다. 
        이것은 몇가지 흥미로운 결과를 가져옵니다. 
        JavaScript에는 정수와 같은 것이 존재하지 않으므로, C 나 Java 에서 수학 계산을 한 경험이 있다면 산술할 때 약간 조심할 필요가 있습니다. 
        다음과 같은 경우를 주의해야 합니다:
*/
0.1 + 0.2   // 0.30000000000000004
/*
    실제로 정수 값은 32 비트 정수로 처리되며 일부 구현은 32 비트 정수가 아닌 숫자에 유효한 명령어를 수행 할 때까지 이러한 방식으로 저장합니다. 
    이는 비트 단위 작업에 중요 할 수 있습니다.

    덧셈, 뺄셈, 계수 (또는 나머지) 연산을 포함하는 표준 산술 연산자가 지원됩니다. 
    또한 앞에서 언급하는 것을 깜박 잊은 고급 수학 함수와 상수를 다루기 위한 수학(Math)으로 불리는 내장 객체가 있습니다:
*/
Math.sin(3.5);
var r = 1;
var circumference = 2 * Math.PI * r;
circumference   // 2 * 3.141592653589793 * 1;


// 내장 parseInt() 함수를 사용하여 문자열을 정수로 변환할 수 있습니다. 이는 다음과 같이 옵션으로 주어지는 두번째 매개변수를 밑으로 하여 수행할 수 있습니다:
parseInt('123', 10); // 123
parseInt('010', 10); // 10

/*
    구형 브라우저에서 "0"으로 시작하는 문자열은 8 진수 (기수 8)로 가정되지만, 2013 년 이후에는 그렇지 않습니다. 
    문자열 형식이 확실하지 않으면 이전 브라우저에서 놀라운 결과를 얻을 수 있습니다.
*/
parseInt('010');  //  10 현재는 십진수 크롬 체크
parseInt('0x10'); // 16
/*
    이 같은 결과는 parseInt() 함수가 0으로 시작되는 문자열을 8진수로, "0x"로 시작하는 문자열은 16진수로 취급하기 때문에 발생합니다. 
    16진수 표기법이 그대로 유지됩니다. 
    8진수는 제거되었습니다.
*/

// 만약 이진수를 정수로 변환하고 싶다면, 밑을 바꾸기만하면 됩니다:
parseInt('11', 2);  // 3
/*
    이와 비슷하게, 내장 함수 parseFloat()를 사용하여 부동 소수점 숫자를 파싱 할 수 있습니다. 
    parseInt()과 달리 parseFloat()는 항상 10진수를 사용합니다.
*/

// 단항 연산자 + 를 사용하여 값을 숫자로 변환 할 수도 있습니다:
+'42';   // 42
+'010';  // 10
+'0x10'; // 16

// 문자열이 수가 아닌 경우 NaN ("Not a Number" (수가 아님)을 줄인 약자)로 불리는 특별한 값을 돌려줍니다:
parseInt('hello', 10); // NaN
// NaN 는 독성을 가지고 있습니다: 어떤 수학 연산의 입력값으로써 주어지면 그 결과는 역시 NaN가 되기 때문입니다:
NaN + 5; // NaN

// 내장 isNaN() 함수를 사용해서 NaN 인지 여부를 검사할 수 있습니다:
isNaN(NaN); // true

// JavaScript는 또 특별한 값 Infinity와 -Infinity를 가지고 있습니다:
1 / 0; //  Infinity
-1 / 0; // -Infinity

// 내장 함수 isFinite()를 사용하여 Infinity, -Infinity 및 NaN 값을 테스트 할 수 있습니다.
isFinite(1 / 0);     // false
isFinite(-Infinity); // false
isFinite(NaN);       // false

/*
    JavaScript에서 문자열은 문자 하나하나가 연결되어 만들어진 것입니다. 
    좀 더 정확히 말하자면, 각각이 16비트로 표현된 유니코드 문자들이 길게 이어져있는 것입니다. 
    이는 국제화(i18n, internationalization) 하려하는 누구에게라도 환영받을만한 소식입니다.

    한 개의 문자를 나타내려면 길이가 1인 문자열을 사용하면 됩니다.

    문자열의 길이를 알고싶다면, 해당 문자열의 length 속성(해당 객체가 소유하고 있는 성질을 나타내는 값)에 접근하면 됩니다:
*/
'hello'.length; // 5

// 우리의 첫 JavaScript 객체입니다! 문자열도 역시 객체로 취급된다고 언급했던적이 있죠? 다음과 같이 메소드까지 있는 확실한 녀석입니다:
'hello'.charAt(0); // "h"
'hello, world'.replace('hello', 'goodbye'); // "goodbye, world"
'hello'.toUpperCase(); // "HELLO"

/*
    etc types
        JavaScript는 의도적으로 값이 없음을 가리키는 '객체' 타입의 객체인 null과 초기화되지 않은 값 
        — 아직 어떤 값도 주어지않은(할당되지않은) 변수임을 가리키는 '정의되지 않음' 타입의 객체인 undefined로 구분됩니다. 
        값에 대해서 나중에 언급할 것이지만 JavaScript에서 변수에 값을 주지않고 선언하는 것이 가능합니다. 
        이럴 경우, 변수의 타입은 undefined이 되는 것입니다.

        JavaScript는 true 와 false 값 (둘은 모두 키워드로 예약되어있는 값)을 가질 수 있는 부울 타입을 가지고 있습니다. 
        다음과 같은 규칙에 따라 어떤 임의의 값을 부울값으로 변환할 수 있습니다:
            1. false, 0, 빈 문자열 (""), 수가 아님을 뜻하는 NaN, null, 와 undefined은 모두 false가 됩니다.
            2. 다른 모든 값은 true가 됩니다.
        
        이 변환은 Boolean() 함수를 써서 명시적으로 이 작업을 수행하실 수 있습니다:
*/
Boolean('');  // false
Boolean(234); // true
/*
    하지만 반드시 이렇게 할 필요는 거의 없습니다. 
    JavaScript는 이러한 변환 작업을 if 문 (아래를 보세요)과 같이 부울값이 필요한 경우를 만나게되면 자동으로 사용자가 모르는 사이에 처리해버리기 때문입니다. 
    이러한 이유로 인해 우리는 가끔 부울 타입으로 변환되었을 때, true와 false이 됨을 의미하는 값들을 각각 "참 값"과 "거짓 값"으로 부를 것입니다. 
    또는 각각 "참으로 취급되다"와 "거짓으로 취급되다"라는 식으로 불릴 수도 있습니다.

    부울 연산자는 && (논리적와, 그리고 ), || (논리적또는 ), 그리고 ! (논리적부정 )이 지원됩니다. 아래에서 다시 언급하겠습니다.
*/

/*
    변수 (Variables)
        JavaScript에서 새로운 변수는 let, const, var 키워드로 선언됩니다.

        let을 사용하면 블록 유효 범위 변수를 선언 할 수 있습니다. 선언 된 변수는 변수가 포함 된 함수 블록에서 사용할 수 있습니다.
*/
let a;
let name = 'Simon';

// 아래는 let으로 선언한 변수가 가지는 유효 범위의 예제입니다. 
// myLetVariable는 여기에서 보이지 *않습니다*
for (let myLetVariable = 0; myLetVariable < 5; myLetVariable++) {
    // myLetVariable는 여기에서 유효합니다
}
// myLetVariable는 여기에서 보이지 *않습니다*

// const는 값이 변경되지 않는 변수를 선언 할 수 있게 합니다. 변수는 변수가 선언 된 함수 블록에서 사용할 수 있습니다.
const Pi = 3.14; // 변수 Pi 설정 
Pi = 1; // 상수로 설정된 변수는 변경 할 수 없기 때문에 애러 발생.

/*
    var은 가장 일반적인 변수 선언 키워드입니다. 
    let, const 키워드가 가지는 제한을 var은 갖지 않습니다. 
    이는 자바스크립트에서 변수를 선언하는 전통적인 유일한 방법이었기 때문입니다. 
    var 키워드로 선언 된 변수는 변수가 선언 된 함수 블록에서 사용 할 수 있습니다.
*/
var a; 
var name = 'Simon';

// var로 선언한 변수의 유효 범위 예제입니다.
// myVarVariable는 여기에서 사용 할 수 *있습니다* 
for (var myVarVariable = 0; myVarVariable < 5; myVarVariable++) { 
    // myVarVariable는 함수 전체에서 사용 할 수 있습니다. 
} 
// myVarVariable는 여기에서 사용 할 수 *있습니다*
/*
    변수에 값을 지정하지 않고 변수를 선언하면, 타입은 undefined로 지정 됩니다.

    자바스크립트와 자바 같은 다른 언어 사이의 중요한 차이점은 자바스크립트는 블록에 범위가 없다는 것입니다. 
    함수에만 범위가 있습니다. 
    변수가 복합 문에서 (예를 들어 if 제어 구조 내에서) var를 사용하여 정의 된 경우 전체 함수에서 볼 수 있습니다. 
    그러나 ECMAScript 2015부터 let 및 const 선언을 사용하면 블록 범위 변수를 만들 수 있습니다.
*/

/*
    연산자 (Operators)
        JavaScript의 산술 연산자로는 +, -, *, /, %(나머지 연산자)가 있습니다. 
        값은 = 연산자로 할당할 수 있고, += 와 -=처럼 다른 연산자를 같이사용해서 할당할 수 있습니다. 
        이렇게 쓰인 연산자는 x = x연산자 y와 같은 결과를 나타냅니다.
*/
var x = 0;
x += 5;     // 5
x = x + 5;  // 10
// ++ 와 -- 를 각각 점진적인 증가와 감소에 사용할 수 있습니다. 이들은 또한 전처리 또는 후처리 연산자로 사용될 수 있습니다.

// + 연산자는 문자열 이어붙이기도 합니다:
'hello' + ' world'; // "hello world"

// 문자열에 어떤 수 (또는 다른 값)를 더하면 일단 모두 문자열로 바뀌게 됩니다. 다음 예를 보시면 무슨 말씀인지 아실 수 있을겁니다:
'3' + 4 + 5;  // "345"
3 + 4 + '5'; // "75"
// 빈 문자열에 어떤 값을 더하는 것은 해당 값을 문자열로 바꾸는 요령입니다.

/*
    JavaScript에서 비교는 <, >, <= 와 >= 를 통해 가능합니다. 
    이 연산자들은 문자열과 수 양쪽 모두에서 동작합니다. 
    상동은 약간 직관성이 떨어지는데 
    이중 등호 (==) 연산자는 서로 다른 타입을 줄 경우 타입 강제 변환을 수행하기 때문에 다음과 같이 때때로 기대하지 않은 결과를 내보내기 때문입니다:
*/
123 == '123'; // true
1 == true;    // true

// 타입 강제 변환을 하지 않게 하려면, 삼중 등호 연산자 (===)를 사용해야합니다:
123 === '123'; // false
1 === true;    // false
// 이와 비슷하게 != 와 !== 연산자가 있습니다.

// 비트 연산자도 있는데 추후 공부하자. https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators

/*
    제어 구조
        JavaScript는 C 계열의 다른 언어들과 비슷한 제어 구조를 가지고 있습니다. 
        조건문은 if 와 else를 지원하는데, 원하시는대로 얼마든지 중첩 시켜서 사용할 수 있습니다:
*/
var name = 'kittens';
if (name == 'puppies') {
  name += ' woof';
} else {
    if (name == 'kittens') {
        name += ' meow';
    }else {
        name += '!';
    }
} 
name == 'kittens meow'; // true

/*
    JavaScript는 while 반복문과 do-while 반복문도 사용할 수 있습니다. 
    첫번째 것은 단순 반복에 유용하게 사용할 수 있고, 
    두번째 것은 반복문이 반드시 적어도 한번이상 실행 되도록 하고 싶을 때 사용할 수 있습니다:
*/
while (true) {
    // an infinite loop!
}
var input;
do {
    input = get_input();
} while (inputIsNotValid(input));

// JavaScript의 for 반복문은 C 와 Java의 반복문과 같습니다. 말하자면, 반복문에 필요한 제어 정보를 한 줄에 표현할 수 있다는 이야기지요.
for (var i = 0; i < 5; i++) {
    // Will execute 5 times
}

/*
    && 와 || 연산자는 첫번째 식을 평가한 결과에 따라서 두번째 식을 평가를 실행하는 단축평가(short-circuit) 논리를 사용합니다. 
    이는 다음과 같이 객체에 접근하기 전에 null 객체인지, 아닌지를 검사하는데 유용하게 사용될 수 있습니다:
*/
var name = o && o.getName();

// 또는 기본 값 설정을 위해서 다음과 같이 이 성질을 사용할 수 있습니다:
var name = otherName || "default";

// JavaScript는 한줄로 조건문을 쓸 수 있게 해주는 삼중 연산자도 가지고 있습니다:
var allowed = (age > 18) ? "yes" : "no";

// 스위치 문은 숫자나 문자열을 기반으로 다중 분기되는 문장을 작성하는데 사용될 수 있습니다:
switch(action) {
    case 'draw':
        drawit();
        break;
    case 'eat':
        eatit();
        break;
    default:
        donothing();
}

/*
    break 문장을 추가하지 않았다면, 다음 단계로 "넘어가서" 실행합니다. 
    이렇게 되는 것을 기대하는 것은 매우 드문경우 입니다. 
    실은 디버깅하는데 용이하도록 하기위해 주석으로서 일부러 붙여놓은 넘어가기 이름표 입니다:
*/
switch(a) {
    case 1: // fallthrough
    case 2:
        eatit();
        break;
    default:
        donothing();
}

/*
    default 구문은 선택적으로 적용할 수 있습니다. 스위치와 케이스 부분에서 원할경우 둘다 식을 사용할 수 있습니다. 
    === 연산자를 사용해서 두 문장을 비교해보시기 바랍니다.
*/
switch(1 + 3){
    case 2 + 2:
        yay();
        break;
    default:
        neverhappens();
}

/*
    객체 (Objects)
        JavaScript 객체는 간단히 이름-값 쌍(name-value pairs)의 모임입니다. 그렇기 때문에, JavaScript의 객체의 모임은 다음과 비슷하다고 할 수 있습니다:
            Python의 Dictionaries
            Perl 과 Ruby의 Hashes
            C 와 C++ 의 Hash tables
            Java 의 HashMaps
            PHP의 Associative arrays
        
       이 데이터 구조가 매우 광범위하게 사용된다는 사실은 활용 방도가 다양함을 입증합니다.'
       JavaScript내 모든 것 (코어 타입들은 제외)은 객체로 취급되기 때문에 어떤 JavaScript 프로그램도 기본적으로 해쉬 테이블을 검색하는데 필요한 출중한 성능을 가지고 있습니다. 
       매우 빠르기 때문에 장점이 됩니다! 

       값은 객체를 포함하여 아무 JavaScript 값이 될 수 있는 반면, "이름" 부분은 JavaScript 문자열 입니다. 
       이는 무작위적인 복잡성을 가지는 데이터 구조를 만들 수 있도록 해줍니다.

       빈 객체를 생성하는데 두가지 방법이 있습니다:
*/
var obj = new Object();
var obj = {};
/*
   이들은 의미적으로 동치입니다. 두번째 방법은 객체 리터럴 구문이라고 부르며 더 편리합니다. 
   객체 리터럴 구문은 JSON 구문의 핵심이며 이 방법을 사용한 코드를 많이 볼 수 있습니다.
*/

// 일단 생성되면, 객체의 속성에 다음의 두가지 방법들 중 한가지로 접근할 수 있습니다:
obj.name = "Simon"
var name = obj.name;

obj["name"] = "Simon";
var name = obj["name"];
/*
    이들은 의미적으로 역시 같습니다. 
    두번째 방법은 속성의 이름이 실행시간(run-time)에 계산될 수 있는 문자열로 주어집니다. 
    또한 예약된 단어(키워드)로 되어있는 이름으로 객체의 속성을 설정하거나 얻어낼 수 있습니다:
*/
obj.for = "Simon"; // 구문 오류, for 가 예약된 단어(키워드)이기 때문에
obj["for"] = "Simon"; // 정상 동작

// 객체 리터럴 구문으로 객체의 전체적인 구조를 초기화 할 수 있습니다:
var obj = {
    name: "Carrot",
    "for": "Max",
    details: {
        color: "orange",
        size: 12
    }
}

// 속성에 연속적으로 접근할 수 있습니다:
obj.details.color;  // orange
obj["details"]["size"]; // 12

/*
    배열 (Arrays)
        JavaScript에서 배열은 실제로는 객체의 특별한 타입입니다. 
        (숫자로 나타낸 속성은 자연스럽게 [] 구문만을 사용해서 접근하게 되므로) 일반 객체와 많이 비슷하게 동작하지만, 
        이 객체는 'length'라는 한가지 마법 속성을 가집니다. 이는 항상 배열에서 가장 큰 인덱스보다 하나 더 큰 값으로 존재합니다.

        배열을 생성하는 예전 방법은 다음과 같습니다:
*/
var a = new Array();
a[0] = "dog";
a[1] = "cat";
a[2] = "hen";
a.length;   // 3

// 한가지 더 편리한 배열 표현 방법은 배열 리터럴을 사용하는 것입니다:
var a = ["dog", "cat", "hen"];
a.length;   // 3
// 배열 리터럴 끝에 콤마(",")를 꼬리로 남겨두는 것은 브라우저마다 다르게 처리하므로 그렇게 하지는 마시기 바랍니다.

// array.length 는 배열에 들어있는 항목의 수를 반드시 반영하지는 않는다는 점을 주의하시기 바랍니다. 다음과 같은 경우를 고려해보겠습니다:
var a = ["dog", "cat", "hen"];
a[100] = "fox";
a.length;   // 101
// 기억해두세요 - 배열의 length 속성은 최대 인덱스에 하나를 더한 값일 뿐입니다.

// 존재하지 않는 배열 인덱스를 참조하려고하면 다음과 같이 undefined 을 얻게됩니다:
var a = ["dog", "cat", "hen"];
a[100] = "fox";
typeof a[90];   // undefined

// 위의 사항들을 감안하면 배열을 반복문으로 처리할 때 다음과 같은 방법으로 처리하실 수 있을 것입니다:
for (var i = 0; i < a.length; i++) {
    // a[i] 로 뭔가를 수행
}
// 이 코드는 루프를 반복할 때마다 배열의 length 속성을 찾아보게되므로 약간 비 효율적입니다. 개선책은:
for (var i = 0, len = a.length; i < len; i++) {
    // a[i] 로 뭔가를 수행
}

// 보다 더 좋은 관용적인 코드는:
for (var i = 0, item; item = a[i]; i++) {
    // item 으로 뭔가를 수행
}
/*
    여기서 우리는 두개의 변수를 설정합니다. 
    for 루프 중간 부분의 할당문은 참인지 거짓인지 테스트 하는데, 참으로 밝혀지면, 루프를 계속 돕니다. 
    i가 루프를 돌 때마다 하나씩 증가하기 때문에 배열의 항목들은 순차적으로 item 변수에 할당됩니다. 
    "거짓으로 취급되는" 항목 (undefined와 같은 항목)을 발견하면 루프는 멈춥니다.

    이 요령은 "거짓으로 취급되는" 값이 포함되지 않은, 
    예를 들어 객체의 배열이나 DOM 노드들과 같은 배열에 사용되어야만 합니다. 
    0을 포함하는 수로 표현된 데이터나 빈 문자열을 포함하는 문자열 데이터에 대하여 반복문을 적용할 경우에는 i, j를 사용하는 관용 코드를 대신 사용해야 합니다.
*/

// 반복문을 사용하는 또다른 방법은 for...in 루프를 사용하는 것입니다. 누군가가 Array.prototype에 새로운 속성을 추가한 경우, 이 루프에 의해 그 속성도 반복된다는 점을 주의하시기 바랍니다:
for (var i in a) {
    // a[i] 으로 뭔가를 수행
}

// 배열에 어떤 항목을 덧붙이길 원하면 다음과 같이 안전한 방법으로 수행할 수 있는 방법이 있습니다:
a[a.length] = item;                 // a.push(item); 와 같음
// a.length는 가장 큰 인덱스의 하나 더 큰 값이기 때문에 배열 끝의 빈 공간에 할당한다는 점을 확신할 수 있습니다.

/* 
    배열 객체는 다음과 같이 많은 메소드를 사용할 수 있습니다:
        a.toString(), a.toLocaleString(), a.concat(item, ..), a.join(sep),
        a.pop(), a.push(item, ..), a.reverse(), a.shift(), a.slice(start, end),
        a.sort(cmpfn), a.splice(start, delcount, [item]..), a.unshift([item]..)

        concat 해당 배열에 지정한 항목들을 추가한 새로운 배열을 돌려줍니다
        pop 마지막 항목을 제거한 다음 돌려둡니다
        push 마지막에 하나 이상의 항목을 추가합니다 (ar[ar.length]와 같이)
        slice 배열의 일부분을 돌려줍니다
        sort 비교에 사용할 함수를 따로 지정할 수 있습니다
        splice 구역을 삭제하거나 항목을 추가해서 배열을 수정할 수 있게합니다
        unshift 배열의 시작부분에 항목을 붙일 수 있습니다        
*/

/*
    함수 (Functions)
        객체와 마찬가지로, 함수는 JavaScript를 이해하는데 핵심이 되는 컴포넌트입니다. 가장 기본적인 함수의 예는 다음과 같습니다:
*/
function add(x, y) {
    var total = x + y;
    return total;
}
/*
    이 예는 기본 함수에 대해 알아야 할 모든 것을 보여주고 있습니다. 
    JavaScript 함수는 0개 이상의 이름이 있는 매개변수를 가질 수 있습니다. 
    함수의 본체는 원하는 만큼의 문장을 포함할 수 있고 해당 함수에 지역적으로 변수를 보유하도록 선언할 수 있습니다. 
    return 문은 언제나 값을 돌려주고 함수의 실행을 끝내는데 사용될 수 있습니다. 
    리턴 문이 없으면 (혹은 값이 없는 리턴이) 사용되면, JavaScript는 undefined을 돌려줍니다.   

    이름 붙여진 매개변수들은 다른 어떤 것보다도 해당 함수가 어떤 함수인지 설명해주는 좋은 역할을 할 수 있습니다. 
    해당 함수가 원하는 매개변수를 주지않고 함수를 호출할 수 있지만 그럴 경우 해당 변수들은 undefined로 설정됩니다.
*/
add();  // NaN reason: undefined + undefined => NaN

// 함수가 기대하는 원래의 매개변수보다 많은 매개변수를 넘겨줄 수도 있습니다:
add(2, 3, 4);   // 5 reason: 처음의 두 수가 더해집니다. 4는 무시됨

/*
    이 예는 조금 바보같아보이지만, 
    함수는 추가적으로 주어진 변수는 해당 함수 내에서 매개변수로 넘겨진 모든 값을 가지고 있는 배열과 비슷한 객체인 arguments로 접근할 수 있습니다. 
    우리가 원하는만큼 값을 취하는 add 함수를 다시 써보겠습니다:
*/
function add() {
    var sum = 0;
    for (var i = 0, j = arguments.length; i < j; i++) {
        sum += arguments[i];
    }
    return sum;
}
add(2, 3, 4, 5);    // 14

// 하지만 2 + 3 + 4 + 5을 직접쓰는 것보다 더 좋지는 않으니, 평균내는 함수를 만들어 보겠습니다:
function avg() {
    var sum = 0;
    for (var i = 0, j = arguments.length; i < j; i++) {
        sum += arguments[i];
    }
    return sum / arguments.length;
}
avg(2, 3, 4, 5); // 3.5
/*
    이건 매우 유용합니다만 새로운 문제점도 함께 따라왔습니다. 
    avg() 함수는 콤마로 구분된 매개변수 목록을 취하지만, 
    배열의 평균을 내고 싶은 경우라면요? 
    함수를 다음과 같이 다시 쓰기만 하면 됩니다:
*/
function avgArray(arr) {
    var sum = 0;
    for (var i = 0, j = arr.length; i < j; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}
avgArray([2, 3, 4, 5]); // 3.5
/*
    하지만 우리가 이미 만든 함수를 다시 사용할 수 있다면 좋을 것입니다. 
    운이 좋게도 JavaScript는 함수 객체라면 모두 가지게 되는 apply() 메소드를 사용해서 임의의 매개변수 배열을 함수에 넘겨줄 수 있습니다.
*/
avg.apply(null, [2, 3, 4, 5]);  // 3.5
/*
    apply()의 두번째 매개변수는 '매개변수들'로 사용하고자 하는 배열입니다. 
    첫번째 매개변수는 나중에 설명하도록 하겠습니다. 
    이는 함수가 역시 객체임을 명확히 해주는 사실입니다.
*/

// JavaScript는 익명의 함수를 만들 수 있도록 허용하고 있습니다.
var avg = function() {
    var sum = 0;
    for (var i = 0, j = arguments.length; i < j; i++) {
        sum += arguments[i];
    }
    return sum / arguments.length;
}
/*
    이것은 의미적으로 function avg() 형식과 같습니다. 
    문장의 어느 곳에나 일반적인 방식으로 완전한 함수 정의를 넣을 수 있도록 허용하는 것이기 때문에 매우 강력합니다. 
    이는 다양한 요령을 부릴 수 있게합니다. 
    다음 예는 C 의 블록 유효 범위를 적용 시킨 것 처럼 지역 변수를 "숨기는" 요령을 보여줍니다:
*/
var a = 1;
var b = 2;
(function() {
    var b = 3;
    a += b;
})();
a;  // 4
b; // 2

// JavaScript는 재귀적으로 함수를 부를 수 있습니다. 이는 브라우저 DOM 등에서 얻을 수 있는 트리 구조를 다루는데 유용합니다.
function countChars(elm) {
    if (elm.nodeType == 3) { // TEXT_NODE
        return elm.nodeValue.length;
    }
    var count = 0;
    for (var i = 0, child; child = elm.childNodes[i]; i++) {
        console.log(child);
        count += countChars(child);
    }
    return count;
}
countChars(document);   // 45600 <-- 결과는 돔 문서에 따라 달라짐.

/*
    다음의 예는 익명 함수를 사용함에 있어 잠재적인 문제점을 보여줍니다: 
    이름이 없으면 어떻게 재귀적으로 부를 수 있을까요? 
    답은 매개변수의 목록으로서의 역할을 수행함과 동시에 arguments.callee로 불리는 속성을 제공하는 arguments 객체에 나와있습니다. 
    이는 현재의 함수를 반영하기 때문에 익명 함수도 재귀적으로 부를 수 있게 해줍니다:
*/
var charsInBody = (function(elm) {
    if (elm.nodeType == 3) { // TEXT_NODE
        return elm.nodeValue.length;
    }
    var count = 0;
    for (var i = 0, child; child = elm.childNodes[i]; i++) {
        count += arguments.callee(child);
    }
    return count;
})(document.body);  // 43862 <--- 한단계만 내려가도 1138개기 줄어든게 확인됨
/*
    arguments.callee는 현재 함수이고 모든 함수는 객체이므로, 
    같은 함수를 여러번 부르는 동안의 정보를 저장하는데 arguments.callee를 사용할 수 있습니다. 
    다음의 예는 함수 자체가 몇 번 불렸는지 기억하는 함수 입니다:
*/
function counter() {
    if (!arguments.callee.count) {
        arguments.callee.count = 0;
    }
    return arguments.callee.count++;
}
counter();  // 0
counter();  // 1
counter();  // 2