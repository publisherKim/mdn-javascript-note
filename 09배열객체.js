//배열 객체: 배열은 이름과 인덱스로 참조되는 정렬된 값들의 집합

// 배열 생성
/*
    var arr = new Array(element0, element1, ..., elementN);
    var arr = Array(element0, element1, ..., elementN);
    var arr = [element0, element1, ..., elementN];
*/

// 길이가 0인 배열을 생성하는 방법
var arr1 = new Array();
var arr2 = Array();

// This has exactly the same effect
var arr3 = [];
arr3.length = 100;  // (100) [empty × 100]

/*
    새로이 정의된 혹은 이미 존재하는 객체 변수의 속성으로 배열을 할당 가능
        var obj = {};
        // ...
        obj.prop = [element0, element1, ..., elementN];

        // OR
        var obj = {prop: [element0, element1, ...., elementN]}
*/

var arr = [42];
var arr = Array(42); // Creates an array with no element, 
                     // but with arr.length set to 42

// The above code is equivalent to
var arr = [];
arr.length = 42;

var arr = Array(9.3);  // RangeError: Invalid array length

// 배열에 값 저장: 배열의 요소에 값을 할당하여 배열에 값을 저장
var emp = [];
emp[0] = "Casey Jones";
emp[1] = "Phil Lesh";
emp[2] = "August West";

//  배열 연산자에 양의 정수가 아닌 값을 줄 경우, 배열의 요소가 대신 배열로 대변되는 객체의 속성이 생성
var arr = [];
arr[3.4] = "Oranges";
console.log(arr.length);                // 0
console.log(arr.hasOwnProperty(3.4));   // true

// 배열을 생성함과 동시에 배열에 값을 저장가능
var myArray = new Array("Hello", myVar, 3.14159);
var myArray = ["Mango", "Apple", "Orange"];

// 배열 요소의 참조: 배열의 요소를 참조하기 위해서 해당 요소의 인덱스(요소의 순서를 나타내는 )를 사용
var myArray = ["Wind", "Rain", "Fire"];
myArray[0]; // Wind
myArray[1]; // Rain

// 배열 연산자(대괄호)는 배열의 속성에 접근하기 위해서도 사용
var arr = ["one", "two", "three"];
arr[2];  // three
arr["length"];  // 3

/*
    배열 길이에 대한 이해: 자바스트립트의 배열은 배열에 포함된 요소들을 배열의 인덱스 값을 속성 이름으로 사용하여 표준 객체의 속성처럼 저장을 합니다. 
    길이 속성은 좀 특별합니다. 배열의 길이는 항상 마지막 요소의 인덱스에 1을 더한 값을 반환
 */
var cats = [];
cats[30] = ['Dusty'];       // chrome 62 표기상의 약간의 버그가 존재한다. 0: "Dusty" 그러나 cats[0] = 0 의 코드를 추가하면  0: 0, 30: ["Dusty"] 로 올바르게 표현한다.
console.log(cats.length); // 31

// 배열의 길이 속성을 지정하는 것 또한 가능, 배열에 저장되어 있는 요소의 갯수보다 작은 값을 배열 길이로 지정하게 되면, 지정된 배열 길이보다 큰 인덱스 값을 가지는 요소는 배열에서 삭제
var cats = ['Dusty', 'Misty', 'Twiggy'];
console.log(cats.length); // 3

cats.length = 2;
console.log(cats); // logs "Dusty,Misty" - Twiggy has been removed

cats.length = 0;
console.log(cats); // logs nothing; the cats array is empty

cats.length = 3;
console.log(cats); // [undefined, undefined, undefined]

// 배열의 요소를 반복처리하기: 배열을 가지고 처리하는 주된 작업은 배열의 요소를 반복적으로 접근해서 읽어오는 작업
var colors = ['red', 'green', 'blue'];
for (var i = 0; i < colors.length; i++) {
    console.log(colors[i]);
}

var divs = document.getElementsByTagName('div');
for (var i = 0, div; div = divs[i]; i++) {
    /* Process div in some way */
    console.log(div);
}

// forEach() 메서드는 배열의 요소를 반복처리할 수 있는 또 다른 방법
var colors = ['red', 'green', 'blue'];
colors.forEach(function(color) {
    console.log(color);
});

// forEach반복문으로 배열의 요소를 반복처리할때, 배열을 정의할 때 생략된 요소는 처리대상이 되지 않는 것에 유의, 하지만 undefined을 생략된 요소에 할당하게 되면 undefined으로 처리.
var array = ['first', 'second', , 'fourth'];

// returns ['first', 'second', 'fourth'];
array.forEach(function(element) {
  console.log(element);
})

if(array[2] === undefined) { console.log('array[2] is undefined'); } // true

var array = ['first', 'second', undefined, 'fourth'];
var results = ''
// returns ['first', 'second', undefined, 'fourth'];
array.forEach(function(element) {
  console.log(element);
  return results += element + ', '
});

// 자바스크립트의 요소들은 표준 객체의 속성으로 저장이 되기 때문에 for...in반복문을 사용해서 자바스크립트 배열을 반복처리하는 것은 비권장
var array = ['first', 'second', , 'fourth'];
// returns ['first', 'second', 'fourth'];
array.forEach(function(element) {
  console.log(element);
})

array['test'] = "test";
// returns ['first', 'second', 'fourth', 'test'];
for(var index in array){
  console.log(array[index]);
}
// 배열 객체의 메서드: Array 객체는 다음과 같은 메서드들을 가지

// concat() 메서드는 두개의 배열을 합쳐 새로운 배열을 반환
var myArray = new Array("1", "2", "3");
myArray = myArray.concat("a", "b", "c"); 
// myArray is now ["1", "2", "3", "a", "b", "c"]

// join(deliminator = ',') 메서드는 배열의 모든 요소를 주어진 구분자로 연결된 하나의 문자열을 반환
var myArray = new Array("Wind", "Rain", "Fire");
var list = myArray.join(" - "); // list is "Wind - Rain - Fire"

// push()메서드는 하나 혹은 그 이상의 요소를 배열의 마지막에 추가하고 추가된 요소를 포함한 길이를 반환
var myArray = new Array("1", "2");
myArray.push("3"); // myArray is now ["1", "2", "3"]

// pop() 메서드는 배열의 마지막 요소를 제거 하고 그 제거된 요소를 반환
var myArray = new Array("1", "2", "3");
var last = myArray.pop(); 
// myArray is now ["1", "2"], last = "3"

// shift()메서드는 배열의 첫번째 요소를 제거하고 그 제거된 요소를 반환
var myArray = new Array ("1", "2", "3");
var first = myArray.shift(); 
// myArray is now ["2", "3"], first is "1"

// unshift()메서드는 하나 혹은 그 이상의 요소를 배열의 앞쪽에 추가하고 추가한 요소를 포함한 길이를 반환
var myArray = new Array ("1", "2", "3");
myArray.unshift("4", "5"); 
// myArray becomes ["4", "5", "1", "2", "3"]

// slice(start_index, upto_index)메서드는 배열의 특정 부분을 추출하여 그 추출된 부분을 포함하는 새로운 배열을 반환
var myArray = new Array ("a", "b", "c", "d", "e");
myArray = myArray.slice(1, 4);  // ["b", "c", "d"]

// splice(index, count_to_remove, addElement1, addElement2, ...) 메세드는 주어진 인덱스 요소를 포함하여 count_to_remove 갯수만큼 삭제 하고 주어진 요소로 바꿔 줌
var myArray = new Array ("1", "2", "3", "4", "5");
myArray.splice(1, 3, "a", "b", "c", "d");   // ["2", "3", "4"]
myArray // ["1", "a", "b", "c", "d", "5"]

// reverse()메서드는 배열의 첫번째 요소와 마지막 요소를 바꿈
var myArray = new Array ("1", "2", "3");
myArray.reverse();  // ["3", "2", "1"]

// sort()메서드는 주어진 배열을 정렬하는 메서드
var myArray = new Array("Wind", "Rain", "Fire");
myArray.sort(); // [ "Fire", "Rain", "Wind" ]
/*
    sort() 메서드에 어떻게 해당 배열의 요소를 정렬할 지 결정하는 콜백 함수를 인자로 줄 수 있습니다.
    콜백 함수는 두 요소를 비교하여 같으면 0, 첫번째 요소가 두번째 요소보다 앞선 정렬 순서를 가지면 1(혹은 양수), 그렇지 않으면 -1(혹은 음수) 을 반환하면 됩니다.
*/
var array = [1,-1,9,10,23,-23,999,-403,187,1000];
var sortFn = function(a, b){
    if (a[a.length - 1] < b[b.length - 1]) return -1;
    if (a[a.length - 1] > b[b.length - 1]) return 1;
    if (a[a.length - 1] == b[b.length - 1]) return 0;
}
array.sort(sortFn);    // [-1, -23, -403, 1, 10, 1000, 187, 23, 9, 999]

var sortFn = function(a, b){
    console.log(a, b);
}
array.sort(sortFn);
/*
    a의 순서가 b보다 뒤에 오면 -1(혹은 음수)을 반환합니다.
    a의 순서가 b보다 앞에 오면 1(혹은 양수)을 반환합니다.
    a와 b가 같으면 0을 반환합니다.
*/
var 오름차순 = function (a, b) {
    if(a > b) return 1;    
}
array.sort(오름차순);                   // [-403, -23, -1, 1, 9, 10, 23, 187, 999, 1000]

var 내림차순 = function (a, b) {
    if(a < b) return 1;
}
array.sort(내림차순);                   // [1000, 999, 187, 23, 10, 9, 1, -1, -23, -403]

// indexOf(searchElement[, fromIndex])메서드는 배열에서 찾고자 하는 요소가 있으면 찾고자 하는 요소와 첫번째로 일치하는 요소의 인덱스값을 반환, fromIndex값을 주게 되면 해당 인덱스부터 요소를 찾음
var a = ['a', 'b', 'a', 'b', 'a'];
console.log(a.indexOf('b')); // logs 1
// Now try again, starting from after the last match
console.log(a.indexOf('b', 2)); // logs 3
console.log(a.indexOf('z')); // logs -1, because 'z' was not found

// lastIndexOf(searchElement[, fromIndex])메서드는 indexOf메서드와 유사하게 작동하지만 배열의 뒤쪽에서부터 요소를 찾음
var a = ['a', 'b', 'c', 'd', 'a', 'b'];
console.log(a.lastIndexOf('b')); // logs 5
// Now try again, starting from before the last match
console.log(a.lastIndexOf('b', 4)); // logs 1
console.log(a.lastIndexOf('z')); // logs -1

// forEach(callback[, thisObject])메서드는 배열의 모든 요소에 대해 반복적으로 주어진 콜백 함수를 실행
var a = ['a', 'b', 'c'];
a.forEach(function(element) { 
    console.log(element); 
});

// map(callback[, thisObject])메서드는 배열의 모든 요소에 대해 콜백함수를 실행하고 콜백함수의 실행결과를 새로운 배열에 담아 반환
var a1 = ['a', 'b', 'c'];
var a2 = a1.map(function(item) {
    return item.toUpperCase();
});
console.log(a2); // logs A,B,C

// filter(callback[, thisObject])메서드는 배열의 모든 요소에 대해 콜백 함수가 true를 반환하는 요소를 새로운 배열에 담아 반환
var a1 = ['a', 10, 'b', 20, 'c', 30];
var a2 = a1.filter(function(item) {
    console.log(typeof item);
    return typeof item == 'number'; 
});
console.log(a2);

// every(callback[, thisObject])메서드는 배열의 모든 요소에 대해 콜백함수가 true를 반환하면 true를 반환
function isNumber(value){
    return typeof value == 'number';
}
var a1 = [1, 2, 3];
a1.every(isNumber);     // true

var a2 = [1, '2', 3];
a2.every(isNumber);     // false 

// some(callback[, thisObject])메서드는 배열의 모든 요소에 대해 콜백 함수를 실행하고 하나의 요소라도 콜백 함수의 결과가 true이면 some()메서드의 결과는 true
function isNumber(value){
    return typeof value == 'number';
}
var a1 = [1, 2, 3];
a1.some(isNumber); // logs true

var a2 = [1, '2', 3];
a2.some(isNumber); // logs true

var a3 = ['1', '2', '3'];
a3.some(isNumber); // logs false

/*
    위의 메서드들 중 콜백함수를 인자로 받는 함수들은 일명 반복적인 메서드(iterative methods)
    왜냐하면 그 함수들은 특정한 방식으로 배열의 전체 요소에 대해 하나씩 반복
    각각의 함수들은 thisObject로 불리는 선택적인(반드시 인자로 주지 않아도 되는) 두번째 인자를 받음
    해당 인자를 줄 경우, thisObject는 콜백 함수내에서 this 키워드가 참조하는 객체의 값
    반면 해당 인자를 주지 않을 경우 명시적으로 객체의 외부에서 함수를 호출하는 경우처럼 this는 전역 객체(window)를 참조

    콜백 함수는 실제로는 세개의 인자로 호출
    첫번째 인자는 현재의 요소,
    두번째 인자는 해당 요소의 배열 인덱스 값
    세번째 인자는 배열 자체에 대한 참조
*/

// reduce(callback[, initialValue])메서드는 배열내의 요소를 하나의 요소로 줄이기 위해 firstValue, secondValue를 인자로 받는 콜백 함수를 실행
var a = [10, 20, 30];
var total = a.reduce(function(first, second) {
    console.log(first, second);
    return first + second;
}, 0);
total;  // 60

var total = a.reduce(function(first, second) {
    console.log(first, second);
    return first + second;
});

// reduceRight(callback[, initalvalue])메서드는 reduce()와 유사하게 작동하지만 배열의 마지막 요소부터 시작
var a = [1, 2, 3];
var total = a.reduceRight(function(first, second) {
    console.log(first, second);
    return first * second;
}, 1);

/*
    reduce와 reduceRight 메서드는 반복적인 배열 메서드 중 가장 명백
    두 메서드는 재귀적으로 하나의 시퀀스를 하나의 값으로 줄이기 위해 두개의 값을 합치는 알고리즘을 위해 사용
*/

// 다차원 배열: 배열은 중첩가능, 하나의 배열은 또 다른 배열을 요소로 포함가능, 다차원 배열을 생성가능
var a = new Array(4);
for (i = 0; i < 4; i++) {
  a[i] = new Array(4);
  for (j = 0; j < 4; j++) {
    a[i][j] = "[" + i + "," + j + "]";
  }
}
a   // [Array(4), Array(4), Array(4), Array(4)]
/*
    Row 0: [0,0] [0,1] [0,2] [0,3]
    Row 1: [1,0] [1,1] [1,2] [1,3]
    Row 2: [2,0] [2,1] [2,2] [2,3]
    Row 3: [3,0] [3,1] [3,2] [3,3]
*/

// 배열과 정규표현식: 문자열내에 정규 표현식에 일치하는 결과가 배열일 경우, 해당 배열은 정규 표현식에 일치하는 문자열들의 정보를 제공해 주는 속성들과 요소들을 반환
// String.match(), 와 String.split()메서드는 결과를 배열로 반환합니다. 정규식과 함께 배열을 어떻게 사용하는지에 대한 정보는 정규표현식을 참조

// 배열과 유사한 객체 사용
/*
    document.getElementsByTagName() 메서드에 의해 반환되는 NodeList 혹은 함수내부에서 사용가능한 인자들같이 일부 자바스크립트 객체들은 표면적으로 보기에 형태와 행동이 배열과 유사
    배열의 모든 메서드를 사용할 수 는 없음,
    예를 들어 인자 객체는 길이(length ) 속성을 제공하지만 forEach()메서드를 사용할 수 없음

    일반적인 배열은 배열과 유사한 객체와는 달리 배열을 다루는데 필요한 방법을 제공
    아래의 예제 처럼 각각의 표준 배열 메서드는 배열 객체 자체를 다루는 방법을 가짐
*/
var obj = { name: 'jaehee', length : 1, 0: 0, 1: 1 };

function printArguments() {
    Array.forEach(arguments, function(item) {
      console.log(item);
    });
}
printArguments();       // Array.forEach is not a function

function printArguments() {
    [...arguments].forEach(function(a, b) {
        console.log(a);
        console.log(b);
    });
 }
 printArguments({ name: 'jaehee', length : 1, 0: 0, 1: 1 });

// 이런 일반적인 메서드들은 자바스크립트 함수 객체에서 제공하는 call메서드를 사용하는 이전 버전의 자바스크립트에서 좀 더 장황하게 표현
var arguments = { name: 'jaehee', length : 1, 0: 0, 1: 1 };
Array.prototype.forEach.apply(arguments, function(item) {
    console.log(item);
});


// 배열에서 각 요소에 접근하는 방법처럼 문자열 객체는 문자열 내의 개별 문자에 대해 순차적인 접근을 제공하기 때문에 배열의 일반적인 메서드들은 문자열에도 사용이 가능
Array.forEach("a string", function(chr) {
    console.log(chr);
}); // Array.forEach is not a function

// arguments 따로 공부하자 ... 유사배열...

// 배열 함축 표현: 자바스크립트 1.7에서 소개되고 ECMAScript 7에 표준으로 제안된 배열 함축 표현들은 다른 배열의 내용을 가지고 새로운 배열을 생성하기 위한 유용하고 간결한 표현 방식을 제공

// 다음의 함축 표현은 숫자를 요소로 가지는 배열을 가지고 각 요소의 숫자값에 두배 증가된 값을 가지는 새로운 배열을 생성하는 방법을 보여줌
var numbers = [1, 2, 3, 4];
var doubled = [i * 2 for (i of numbers)];
console.log(doubled); // logs 2,4,6,8
// es7 에서는 저런 표현이 가능함듯 배열을 순회하고 식을 쓸수 있음. chrome62 현재는 SyntaxError: Unexpected token for

// 아래의 예제는 위의 예제와 동일한 결과를 보여주는 예제
var doubled = numbers.map(function(i){
    return i * 2;
});

// 함축 표현은 특정 표현식에 일치하는 요소들을 선택하기 위해서도 사용
var numbers = [1, 2, 3, 21, 22, 30];
var evens = [i for (i of numbers) if (i % 2 === 0)];    
console.log(evens); // logs 2,22,30 chrome62 현재는 SyntaxError: Unexpected token for

// filter() can be used for the same purpose: filter() 메서드를 사용하여 동일한 결과를 도출
var evens = numbers.filter(function(i){
    return i % 2 === 0;
});
evens;  //  [2, 22, 30]

// map()과 filter()메서드 같은 유형의 작업은 하나의 배열 함축 표현식으로 나타낼 수 있습니다. 여기 짝수만을 골라낸 다음 각 짝수의 두배의 값을 가지는 배열을 반환하도록 하는 예제
var numbers = [1, 2, 3, 21, 22, 30];
var doubledEvens = [i * 2 for (i of numbers) if (i % 2 === 0)];
console.log(doubledEvens); // logs 4,44,60

var doubledEvens = numbers.filter(function(i){
    return i % 2 === 0;
}).map(function(i){
    return i * 2;
});
doubledEvens // [4, 44, 60]


// 문자열또한 입력으로 사용이 될 수 있으며, filter와 map 메서드(유사배열 객체하에서) 사용 결과를 도출
var str = 'abcdef';
var consonantsOnlyStr = [c for (c of str) if (!(/[aeiouAEIOU]/).test(c))  ].join(''); // 'bcdf'
var interpolatedZeros = [c+'0' for (c of str) ].join(''); // 'a0b0c0d0e0f0'
// es7을 쓴다면 단축 표현된 표현으로 자료 구조에대한 더 강력한 표현들이 가능하다.

/*
    타입 배열: 자바스크립트 타입 배열은 배열과 유사한 객체이며 원시 이진 데이터 접근에 대한 메카니즘을 제공
    Array객체는 동적으로 크기가 커지고 작아 질 수 있으며 어떤 자바스크립트 값이라도 가질 수 있음
    자바스크립트 엔진은 그런 배열을 빠르게 만들기 위해 최적화를 수행
    웹 어플케이션이 보다 강력해지고, 음성, 영상 조작, 웹소켓을 사용하여 원시 데이터에 접근하는 등의 기능들이 추가 되면서 자바스크립트 코드가 타입배열을 가지고 
    빠르고 쉽게 원시 이진 데이터를 조작할 수 있는 것이 가능한 시점이 되었다
*/

// 버퍼와 뷰: 타입 배열 구조
/*
    유연성과 효율성을 극대화 하기 위해, 자바스크립트 타입 배열을 버퍼와 뷰라는 구조로 구현되어 있습니다. 
    하나의 버퍼(ArrayBuffer객체로 구현되어 있습니다.)는 하나의 데이터 덩어리를 의미하는 객체입니다. 
    버퍼는 구체적으로 언급할 형식이 없고, 버퍼가 담고 있는 내용에 접근할 메카니즘을 제공하지 않습니다. 
    버퍼에 담겨져 있는 메모리에 접근하기 위해선, 뷰를 사용해야 합니다. 
    하나의 뷰는 컨덱스트를 제공하는데, 컨텍스트는 데이터 형, 시작 오프셋 그리고 실제 타입배열로 변경되는 요소의 갯수를 제공합니다. 
*/
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Indexed_collections#배열_객체 참고

// 배열버퍼: ArrayBuffer는 일반적이고, 고정길이의 이진 데이터 버퍼를 표현하기 위해 사용되는 데이터 타입
// ArrayBuffer의 내용을 직접 수정할 수는 없는 대신 타입 배열 뷰 혹은 특정 형식 그리고 해당 버퍼의 내용을 읽고 쓸수 있게 해주는 DataView를 생성 가능

// 타입 배열 뷰: 타입 배열 뷰들은 스스로를 나타낼 수 있는 이름과 Int8, Uint32, Float64등의 일반적인 숫자 형들을 위한 뷰를 제공
// Uint8ClampedArray라는 특별한 타입 배열 뷰가 존재, 0부터 255까지의 값을 가짐, 예를 들며, Uint8ClampedArray는 Canvas data processing에 유용
