/*
    함수는 JavaScript에서 기본적인 빌딩 블록 중의 하나입니다. 
    함수는 작업을 수행하거나 값을 계산하는 문장 집합 같은 자바스크립트 절차입니다. 
    함수를 사용하려면 함수를 호출하고자 하는 범위 내에서 함수를 정의해야만 합니다.
*/

// 함수정의 또는 함수 선언
/*
    함수의 이름
    괄호 안에서 콤마로 분리된 함수의 인수 목록 
    중괄호 { } 안에서 함수를 정의하는 자바스크립트 표현
*/
function square(number) {
    return number * number;
}
square(1);
// (number): paramater, return number * number: return 문은 함수에 의해 반환된 값, square(1): 함수 호출과 argument

function myFunc(theObject) {
    console.log('할당전: ', theObject.make);    // Honda
    theObject.make = "Toyota";
    console.log('할당후: ', theObject.make); // Toyota
}

var mycar = {make: "Honda", model: "Accord", year: 1998};
var x,y;
x = mycar.make; // Honda
myFunc(mycar)
y = mycar.make  // Toyota
// 주의: 이방식은 객체의 원본을 보존하지 못한다. mycar의 최종 결과물: {make: "Toyota", model: "Accord", year: 1998}

function myFunc(theObject) {
    theObject = {make: "Ford", model: "Focus", year: 2006};
    console.log('함수에서 재할당시 참조: ',theObject);
}
var mycar = {make: "Honda", model: "Accord", year: 1998};
var x,y;
x = mycar.make; // Honda
myFunc(mycar);
y = mycar.make; // Honda
// 함수 배부에서 객체를 할당하는것은 매개변수의 값이 변하기때문에 함수 외부에 영향을 미치지 않음, 원시값과 참조의 차이

// 함수표현

// 함수 표현식 이면서 익명함수
var square = function(number) {
    return number * number;
}
var x = square(4);  // 16

// 함수 표현식이면서 기명함수
var factorial = function fac(n) {
    console.log('n의 변환에 주목하자: ', n);
    return n < 2 ? 1 : n * fac(n-1);
}
factorial(3);   
// 3 * 2 * 1 => 6, 더 자세히 표현하면 2 이상에서는 우항 n* (fac(n-1)) 2보다 작을때는 1, 
// 즉 3 * fac(3-1) => 3 * 2 * fac(2-1) => 3 * 2 * 1 
// 함수 표현식에 이름을 부쳐서 재귀함수 형태로 사용할수 있다.
// 자신을 참조하는 함수 내에서나 스택 트레이스에서 함수를 식별하는 디버거에서 사용

// map 함수가 정의되는 것과 첫 번째 매개변수로 익명의 함수를 호출하는 것을 보여줍니다.
function map (f, a) {
    var result = [],
        i;
    for (var i = 0; i != a.length; i++) {
        console.log('i: ', i, 'a[i]: ', a[i], 'result', f(a[i]));
        result[i] = f(a[i]);    // i = 0 => multiply(1), ... i = 4 => multiply(4);
    }
    return result;
}

var multiply = function(x) {
    return x * x * x;
}
map (multiply, [1,2,3,4,5]);
// [1, 8, 27, 64, 125]


// 특정 조건에서 정의 되어지는 함수를 만들고 싶을때
var theObject = {};
var num = 0;
var myFunc;
if(num == 0) {
    myFunc = function(theObject) {
        theObject.make = "Toyota";
    }
}
// num 이 0일때만 함수가 정의 된다.
// 함수를 정의하는 것 이외에도 여러분은 eval()과 비슷하게 런타임에 문자열로부터 함수를 생성하는 함수 생성자를 사용 가능

// 함수 호출: name(), name(value) name(argument)

// 함수 호이스팅에 의해서 가능하나 좋은 문장 작성은 아니다.
console.log(square(5));
/* ... */
function square(n) { return n*n }

// 함수 표현식의 경우네는 애로룰 뱉는다. ncaught ReferenceError: square is not defined
console.log(square);
square = function (n) {
  return n * n;
}

var square;
console.log(square(5));
square = function (n) {
    return n * n;
}
// 동치는 아니지만 이문장과 비슷하다.

// 재귀함수
function factorial(n){
    if ((n == 0) || (n == 1))
      return 1;
    else
      return (n * factorial(n - 1));
}
var a, b, c, d, e;
a = factorial(1); // a gets the value 1
b = factorial(2); // b gets the value 2
c = factorial(3); // c gets the value 6
d = factorial(4); // d gets the value 24
e = factorial(5); // e gets the value 120
/*
    함수를 호출하는 다른 방법들이 있습니다. 
    함수는 동적 호출되어야 하거나, 함수의 인수의 수가 다양해야 하거나, 
    함수 호출의 맥락이 런타임에서 결정된 특정한 객체로 설정될 필요가 있는 경우가 자주 있습니다. 
    함수 자체를 나타내고 차례로 이러한 객체 방법(함수 객체를 참조)이 있습니다. 
    이들 중 하나인 apply() 메서드는 이러한 목표를 달성하기 위해 사용될 수 있습니다.
*/

//함수의 scope 
/*
    변수가 함수의 범위에서만 정의되어 있기 때문에, 함수 내에서 정의된 변수는 함수 외부에서는 어디서든 액세스할 수 없습니다. 
    그러나 함수는 함수가 정의된 범위 내에서 정의된 모든 변수 및 함수들을 액세스할 수 있습니다. 
    즉, 전역함수는 모든 전역 변수를 액세스할 수 있습니다. 
    다른 함수 내에서 정의 된 함수는 부모 함수와 부모 함수가 액세스 할 수 있는 다른 변수에 정의된 모든 변수를 액세스할 수 있습니다.
*/
// The following variables are defined in the global scope
var num1 = 20,
    num2 = 3,
    name = "Chamahk";

// This function is defined in the global scope
function multiply() {
    return num1 * num2;
}
multiply(); // Returns 60

// A nested function example
function getScore () {
    var num1 = 2,
        num2 = 3;

    function add() {
        return name + " scored " + (num1 + num2);
    }

    return add();
}
  
getScore(); // Returns "Chamahk scored 5"

// scope and function stack 
/* 
    재귀 : 함수는 자신을 참조하고 호출할 수 있습니다. 함수가 자신을 참조하는 방법은 세 가지가 있습니다.
        1. 함수의 이름
        2. arguments.callee
        3. 함수를 참조하는 범위 내 변수
*/
var foo = function bar() {
    // statements go here
};
function bar() {
    var x = 0;
    while (x < 10) {
       x++;
    }
    return x;
}
/*
    함수 본문 내에서 다음은 모두 동일합니다.
        1. bar()
        2. arguments.callee()
        3. foo()
*/
var foo = function bar() {
    bar();
};
var foo = function bar() {
    arguments.callee()
};
var foo = function bar() {
    foo();
};
foo()   // Maximum call stack size exceeded

function loop(x) {
    if (x >= 10) // "x >= 10" is the exit condition (equivalent to "!(x < 10)")
        return console.log(x);
    // do stuff
    loop(x + 1); // the recursive call
}
loop(0);

//트리 구조(가령, DOM)의 모든 노드를 얻는 것은 재귀를 사용하여 보다 쉽게 할 수 있습니다:
function walkTree(node) {
    var result = '';
    if (node == null) // 
        return;
    // do something with node
    for (var i = 0; i < node.childNodes.length; i++) {
        console.log(node.childNodes[i]);
        result += walkTree(node.childNodes[i]);
    }
    return result;
}
walkTree(document.querySelector('div.center'));
// 함수 루프보다, 각 재귀 호출 자체는 여기에 많은 재귀 호출을 합니다.
// 반복은 잘 사용하면 득이지만 확실히 종료 조건등을 파악하지 못하면 제대로 사용하기 어렵지 않을까 쉽다.

// 재귀를 제거한 사용법
function walkTree(node) {
    var result = '';
    if (node == null) // 
        return;
    // do something with node
    for (var i = 0; i < node.childNodes.length; i++) {
        console.log(node.childNodes[i]);
        result += node.childNodes[i];
    }
    return result;
}
walkTree(document.querySelector('div.center'));

/*
    재귀적 알고리즘은 비 재귀적인 알고리즘으로 변환 할 수 있습니다. 
    그러나 변환된 알고리즘이 훨씬 더 복잡하며 그렇게 함으로써 스택의 사용을 요구합니다. 
    사실, 재귀 자체가 함수 스택을 사용 합니다.
*/

function foo(i) {
    if (i < 0)
        return;
    console.log('begin:' + i);
    foo(i - 1);
    console.log('end:' + i);
}
foo(3);
// Output:

// begin:3
// begin:2
// begin:1
// begin:0
// end:0
// end:1
// end:2
// end:3
// 개인적인 생각은 둘다 복잡하다. 반복을 처리한다는건

// 중첩된 함수와 클로저
/*
    중첩 함수는 클로저이므로, 중첩된 함수는 그것을 포함하는 함수의 인수와 변수를 “상속”할 수 있는 것을 의미합니다. 
    즉, 내부 함수는 외부 함수의 범위를 포함합니다.
        1. 내부 함수는 외부 함수의 명령문에서만 액세스할 수 있습니다.
        2. 내부 함수는 클로저를 형성합니다: 외부 함수는 내부 함수의 인수와 변수를 사용할 수 없는 반면에, 
           내부 함수는 외부 함수의 인수와 변수를 사용할 수 있습니다.
*/
function addSquares(a,b) {
    function square(x) {
        return x * x;
    }
    return square(a) + square(b);
}
a = addSquares(2,3); // returns 13 => 2 * 2 + 3 * 3
b = addSquares(3,4); // returns 25
c = addSquares(4,5); // returns 41

// 내부 함수는 클로저를 형성하기 때문에, 여러분은 외부 함수를 호출하고, 외부 및 내부 함수 모두에 인수를 지정
function outside(x) {
    function inside(y) {
        return x + y;
    }
    return inside;
}

fn_inside = outside(3); // Think of it like: give me a function that adds 3 to whatever you give it
result = fn_inside(5); // returns 8

result1 = outside(3)(5); // returns 8
// result === result1 

/*
    변수의 보존
        중첩된 내부 함수가 반환될 때 외부 함수의 인수 x가 보존된다는 점을 알 수 있습니다. 
        클로저는 그것을 참조하는 모든 범위에서 인수와 변수를 보존해두어야 합니다. 
        매번 호출될 때마다 잠재적으로 다른 인수를 제공할 수 있기 때문에, 클로저는 외부 함수에 대하여 매번 새로 생성됩니다. 
        메모리는 그 무엇도 내부 함수에 접근하지 않을 때만 해제됩니다.    
    
    주의 : 변수의 보존은 일반 객체에서 참조를 저장해두는 것과 다르지 않지만, 
    사용자가 직접 참조를 설정하는 것이 아니고 자세히 들여다볼 수 없어서 종종 명확하지 않습니다.
*/

/*
    다중 중첩 함수
        함수는 다중 중첩될 수 있습니다. 
        즉, 함수 (C)를 포함하는 함수 (B)를 포함하는 함수 (A). 
        여기에서 두 함수 B와 C는 모두 클로저를 형성합니다. 
        그래서 B는 A를 엑세스할 수 있고, C는 B를 액세스 할 수 있습니다. 
        이와 같이, 클로저는 다중 범위를 포함 할 수 있습니다. 
        그들은 재귀적으로 그것을 포함하는 함수의 범위를 포함합니다. 
        이것을 범위 체이닝이라 합니다.(그것을 “체이닝”이라 하는 이유는 추후에 설명할 것입니다.)
        scope channing
*/
function A(x) {
    function B(y) {
        function C(z) {
            console.log(x + y + z);
        }
        C(3);
    }
    B(2);
}
A(1);   // 6  => 1 + 2 + 3
/*
    C는 B의 y와 A의 x를 엑세스
        1. B는 A를 포함하는 클로저를 형성합니다. 즉, B는 A의 인수와 변수를 엑세스할 수 있습니다.
        2. C는 B를 포함하는 클로저를 형성합니다.
        3. B의 클로저는 A를 포함하고, C의 클로저는 A를 포함하기 때문에, C는 B와 A의 인수와 변수를 엑세스할 수 있습니다. 
           즉, 순서대로 C는 A와 B의 범위를 체이닝합니다.
        
        그러나 역은 참이 아니다. 
        A는 C에 접근 X, A 는 B 에 접근 O
        B의 인수인 X와 B의 변수인 C에는 접근 X 그리고
        C에도도 C의 인수인 y에 접근 X
        고로 C는 B의 private 변수가 된다.
        
        클로저는
        아래에서 위로는 접근이 가능하나 
        위에서 아래로는 인수에 접근이 불가능하고
        한단계 아래인 변수엔 접근이 가능하다.
*/

/*
    이름 충돌
    클로저의 범위에서 두 개의 인수 또는 변수의 이름이 같은 경우, 이름 충돌
    가까울수록 우선순위가 높다.
    scope chain
*/
var x = 0;
function outside() {
    var x = 10;
    function inside(x) {
        return x;
    }
    return inside;
}
result = outside()(20); // 20
// 안쪽에 인수 20을 전달했으므로 당연히 가까운쪽이 할당된다.

/*
    closure
        클로저는 자바스크립트의 강력한 기능
        함수의 내포화(함수 안에 함수를 정의하는것)
        외부 함수 안에서 정의된 모든 변수와 함수들을 내부 함수가 완전하게 접근 할 수 있도록 승인
        외부 함수는 내부 함수 안에서 정의된 변수와 함수들에 접근 불가
        내부 함수의 변수를 보호
        클로저는 내부 함수가 어떻든 외부 함수 범위 밖의 어떤 범위에서든 사용 가능해지면 생성
*/
var pet = function(name) {   // 외부 함수는 'name'이라 불리는 변수를 저장
    var getName = function() {
        return name;             // 내부 함수는 외장 함수의 'name' 변수에 접근
    }
    return getName;            // 내부 함수를 리턴함으로써, 외부 함수로 노출
},
myPet = pet("Vivie");
 
myPet();                     // "Vivie"로 리턴

//  외부 함수의 내부 변수를 다루는 메서드를 포함한 객체도 반환 가능
var createPet = function(name) {
    var sex;
    return {
        setName: function(newName) {
            name = newname;
        },
        getName: function() {
            return name;
        },
        getSex: function() {
            return sex;
        },
        setSex: function(newSex) {
            if( typeof newSex == "string" && (newSex.toLowerCase() == "male" || newSex.toLowerCase() == "female") ) {
                sex = newSex;
            }
        }
    }
};

var pet = createPet("Vivie");
pet.getName();

pet.SetName("Oliver");
pet.setSex("male");
pet.getSex();
pet.getName();
/*
    외부 함수의 'name' 이란 변수는 내부 함수에서 접근이 가능
    내장 함수를 통하는 방법 말고는 내부 변수로 접근 불가
    내부 함수의 내부 변수는 외부 인수와 변수를 안전하게 저장
    내부 변수는 내부 함수가 작동하기 위한 데이터를 영구적이지만 안전하게 보존  
*/

var secureCodeModule = (function(){
    var secureCode = "0]Eal(eh&2";  // default

    function set(secureCodeWrite) {
        secureCode = secureCodeWrite;
        return '덮어쓰기 성공';
    }
    function get() {
        return secureCode;
    }

    return {
        secureCodeOverWrite: set,
        secureCodeRead: get
    }
})();

// 클로저를 썼을때 주의: 내부 함수가 외부 함수의 범위에 있는 이름과 같은 변수를 정의 하였을 경우, 외부 함수 범위의 변수를 참조(접근)할 방법 X
var createPet = function(name) {  // 외부 함수가 "name" 이라는 변수를 정의하였다
    return {
        setName: function(name) {    // 내부 함수 또한 "name" 이라는 변수를 정의하였다
            var name = name;               // ??? 어떻게 우리는 외부 함수에 정의된 "name"에 접근할까???
        },
        getName : function() {
            return name;    // 접근 불가
        }
    }
};

var k = createPet();
k.setName(111);
k.getName();    // undefined; 

// 인수(arguments) 객체 사용
/*
    함수의 인수는 배열과 비슷한 객체로 처리
    arguments[i]
    i 는 0 으로 시작하는 순서 번호입니다. 
    따라서 함수에 전달된 첫 번째 인수는 arguments[0] 입니다. 
    총 인수의 개수는 arguments.length 에서 얻을 수 있습니다.

    인수(arguments) 객체를 이용하면, 보통 함수에 정의된 개수보다 많은 인수를 넘겨주면서 함수를 호출할 수 있습니다. 
    이것은 얼마나 많은 인수가 함수로 넘겨질지 모르는 상황에서 유용합니다. 
    arguments.length를 함수에 실제로 넘겨받은 인수의 수를 알아낼 때 사용할 수 있고 , 
    각각의 인수에 인수(arguments) 객체를  이용하여 접근 할 수 있습니다.

    예를 들어, 몇 개의 문자열을 연결하는 함수를 생각해 봅시다. 
    이 함수의 유일한 형식 인수는 각 문자열을 구분해주는 문자를 나타내는 문자열입니다 . 
    이 함수는 다음과 같이 정의됩니다.
*/
function myConcat(separator) {
    var result = ""; // 리스트를 초기화한다
    var i;
    // arguments를 이용하여 반복한다
    for (i = 1; i < arguments.length; i++) {
        console.log(separator)
        result += arguments[i] + separator;
    }
    return result;
}

myConcat(", ", "red", "orange", "blue");    // "red, orange, blue, "
myConcat("; ", "elephant", "giraffe", "lion", "cheetah");   // "elephant; giraffe; lion; cheetah; 
myConcat(". ", "sage", "basil", "oregano", "pepper", "parsley");    // "sage. basil. oregano. pepper. parsley. "
// 주의: 인수(arguments) 객체는 배열과 닮은 것이지 배열이 아님
// 인수(arguments) 객체는 배열을 다루는 모든 메서드를 가지고 있지 않습니다.

// default paramiter
/*
    함수의 매개변수는 undefined 가 기본
    어떤 상황에서는 다른 값을 기본값으로 가진 것이 유용
    기본값을 설정하는 보편적인 전략은 함수의 본문에서 매개변수 값을 테스트하여 그 값이 undefined 인 경우에 값을 할당
    ES6 에서는 디폴트 매개변수가 가능
*/
// 기존방식
function multiply(a, b) {
    b = typeof b === 'undefined' ?  1 : b;
    return a * b;
}
  
multiply(5);

function multiply(a, b = 1) {
    return a * b;
}
  
multiply(5);

// rest paramiter
function multiply(multiplier, ...theArgs) {
    theArgs.map( function(index) {
        console.log('processindex'+index+': ',  multiplier, ' * ', index, ' = ', multiplier * index);
    })
    return theArgs.map(x => multiplier * x);
}
  
var arr = multiply(3, 1, 2, 3);
// 나머지 매개변수를 2번째 인수부터 마지막 인수까지 얻기 위하여 사용

// arrow function: 함수 표현과 비교하였을때 짧은 문법을 가지고 있고 사전적으로 this 값을 묶음
var a = [
    "Hydrogen",
    "Helium",
    "Lithium",
    "Beryl­lium"
];
var a2 = a.map(function(s){
    console.log(s.length); 
    return s.length;
});
var a3 = a.map( s => s.length );

// 사전적 this
/*
    화살표 함수에서, 모든 new함수들은  그들의  this 값을 정의
    생성자로서의 새로운 객체, 정의되지 않은 strict mode의 함수 호출,   함수가 "object method"로 호출했을때의 context object ,등등.
    this가 무엇을 가르치는지 우리는 종종 인지하가 어렵다.
*/
function Person() {
    // The Person() constructor defines `this` as itself.
    this.age = 0;
  
    setTimeout(function growUp() {
      // In nonstrict mode, the growUp() function defines `this` 
      // as the global object, which is different from the `this`
      // defined by the Person() constructor.
      this.age++;
    }, 1000);
}
  
var p = new Person();   // age = 0;

// 기존의 해결책
function Person() {
    var that = this;    // 어휘적으로 해결해야함 this의 scope
    that.age = 0;
  
    setTimeout(function growUp() {
        console.log(that);
        that.age++;
    }, 1000);
}
  
var p = new Person();

// ES6 solution
function Person() {
    this.age = 0;
  
    setTimeout(() => {
        this.age++; // |this| properly refers to the person object this가 콜백함수의 경우에도 명시적으로 Person 함수를 지칭함
    }, 1000);
}
  
var p = new Person();

// javascript 내장 함수
/*
    eval() 메소드는 문자열로 표현된 자바스크립트 코드를 수행합니다.
    uneval() 메소드는  Object의 소스코드를 표현하는 문자열을 만듭니다.
    isFinite() 함수는 전달받은 값이 유한한지 결정합니다. 만약 필요하다면, 매개변수는 첫번째로 숫자로 변환됩니다.
    isNaN() 함수는 NaN인지 아닌지 결정
    parseFloat() 함수는  문자열 인수 값을 해석하여 부동소숫점 수를 반환
    parseInt() 함수는 문자열 인수 값을 해석하여 특정한 진법의 정수를 반환
    decodeURI() 함수는  사전에 encodeURI을 통해 만들어지거나 비슷한 과정을 통해 만들어진 URI(Uniform Resource Identifier)를 해독
    decodeURIComponent() 메소드는 사전에encodeURIComponent를 통하여 만들어 지거나 또는 
                         비슷한 과정을 통해 만들어진 URI (Uniform Resource Identifier) 컴포넌트를 해독
    encodeURI() 메소드는 URI(Uniform Resource Identifier)를  각 인스턴스의 특정한 문자를 한개, 두개,세개, 또는 네개의 
                UTF-8인코딩으로 나타내어지는 연속된 확장문자들과 바꾸는 방법으로 부호화
    encodeURIComponent() 메소드는  URI(Uniform Resource Identifier) 컴포넌트를  각 인스턴스의 특정한 문자를 한개, 두개,세개, 또는 네개의 
                         UTF-8인코딩으로 나타내어지는 연속된 확장문자들과 바꾸는 방법으로 부호화
                         
    escape() 메소드는 한 문자열에서 특정 문자들이 16진 확장 비트열로 바뀌어진 문자열로 계산 deprecated predict
    unescape() 메소드는 문자열에서 확장 비트열이 확장 비트열이 나타내는 문자로 바뀌어진 문자열로 계산 : deprecated perdict

*/