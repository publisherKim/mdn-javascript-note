/*
    컬렉션 내 각 항목 처리는 매우 흔한 연산입니다. 
    JavaScript는 간단한 for 루프에서 map() 및 filter()에 이르기까지, 컬렉션을 반복하는 많은 방법을 제공합니다. 
    반복기(iterator) 및 생성기(generator)는 반복 개념을 핵심 언어 내로 바로 가져와 for...of 루프의 동작(behavior)을 사용자 정의하는 메커니즘을 제공합니다.
*/

/* 
    반복기
        객체는 한 번에 하나씩 컬렉션 항목을 액세스하는 법을 아는 경우 반복기(iterator)입니다, 
        그 열(sequence) 내부 현재 위치를 기억하면서. JavaScript에서 반복기는 열 내 다음 항목을 반환하는 next() 메서드를 제공하는 객체입니다. 
        이 메서드는 다음 두 속성이 있는 객체를 반환합니다: done 및 value.

        단 생성되면, 반복기 객체는 명시해서 next()를 반복 호출하여 사용될 수 있습니다.
*/
function makeIterator(array){
    var nextIndex = 0;

    return {
        next: () => {
            return nextIndex < array.length ? {value: array[nextIndex++], done: false} : {done: true};
        }
    }
}

var test = makeIterator([1,2]);
test.next().value;  // 1
test.next().value;  // 2
test.next().done;

/*
    iterable
        객체는 값이 for..of 구조 내에서 반복되는 것 같은 그 반복 동작을 정의하는 경우 반복가능(iterable)입니다. 
        Array 또는 Map과 같은 일부 내장 형은 기본 반복 동작이 있지만 다른 형(가령 Object)은 없습니다.

        반복가능하기 위해서, 객체는 @@iterator 메서드를 구현해야 합니다, 
        객체(나 그 프로토타입 체인에 등장하는 객체 중 하나)가 Symbol.iterator 키를 갖는 속성이 있어야 함을 뜻하는:
    
    사용자 정의 iterable
        이와 같이 자신의 반복가능 객체를 만들 수 있습니다:
*/
var myIterable = {};
myIterable[Symbol.iterator] = function *(){
    yield 1;
    yield 2;
    yield 3;
};
[...myIterable];    // [1,2,3]

/*
    내장 iterable
        String, Array, TypedArray, Map 및 Set은 모두 내장 반복가능 객체입니다, 
        그들의 프로토타입 객체가 모두 Symbol.iterator 메서드가 있기에.
    
    iterable을 기대하는 구문
        일부 문(statement) 및 식(expression)은 iterable을 기대합니다, 가령 for-of 루프, 전개 연산자, yield* 및 해체 할당.
*/
for(let value of ["a", "b", "c"]) {
    console.log(value);
}

[..."abc"]  // (3) ["a", "b", "c"]

function* gen(){
    yield* ["a", "b", "c"]
}
gen().next();   // {value: "a", done: false}

[a, b, c] = new Set(["a", "b", "c"]);   // Set(3) {"a", "b", "c"}
a;  // "a"
// new Set을 어디에 쓸지는 아지 파악이안됨.. 반복되는 배열을 중복을 걸러주고 해체 할당을 하는데 쓰이는걸로 추정됨.

/*
    생성기
       사용자 정의 반복기는 유용한 도구이지만, 반복기 생성은 명시적으로 그들의 내부 상태를 유지할 필요 때문에 주의깊은 프로그래밍이 필요합니다. 
       생성기는 강력한 대안을 제공합니다: 
       자신의 상태를 유지할 수 있는 단일 함수를 작성하여 반복 알고리즘을 정의할 수 있게 합니다.

        생성기는 반복기 팩토리로서 작동하는 특별한 유형의 함수입니다. 
        함수가 하나 이상의 yield 식을 포함하고 function* 구문을 사용하면 생성기가 됩니다. 
*/
function* idMaker(){
    var index = 0;
    while(true)
      yield index++;
}
var gen = idMaker();
gen.next().value;    // 0 
gen.next().value;    // 1
gen.next().value;    // 2
// 제어문은 사실상 쭉 진행 되어져야 하는 제어문을 컨트롤 할수 있다. 이 부분은 좀더 공부를 해야함. 흐름의 제어가 가능해짐
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/yield 참고

/*
    고급 생성기
        생성기는 요청에 따라 그 산출된(yielded, yield 식으로 산출된) 값을 계산하고, 
        계산하기 비싼(힘든) 수열 또는 위에 설명한 대로 무한 수열이라도 효율적으로 나타내게 합니다.

        next() 메서드는 또한 생성기의 내부 상태를 수정하는 데 쓰일 수 있는 값을 받습니다. 
        next()에 전달되는 값은 생성기가 중단된 마지막 yield 식의 결과로 처리됩니다.

        여기 sequence(수열)을 재시작하기 위해 next(x)를 사용하는 피보나치 생성기가 있습니다:
*/
function* fibonacci(){
    var fn1 = 0;
    var fn2 = 1;
    while (true){
      var current = fn1;
      fn1 = fn2;
      fn2 = current + fn1;
      console.log('fn1 : ', fn1, 'fn2 : ', fn2, 'current : ', current);
      var reset = yield current;
      if (reset){
          fn1 = 0;
          fn2 = 1;
          console.log('fn1: ', fn1, 'fn2: ', fn2)
      }
    }
}
var sequence = fibonacci();
sequence.next().value;  // fn1 :  1 fn2 :  1 current :  0
sequence.next().value;  // fn1 :  1 fn2 :  2 current :  1
sequence.next().value;  // fn1 :  2 fn2 :  3 current :  1
sequence.next().value;  // fn1 :  3 fn2 :  5 current :  2
sequence.next().value;  // fn1 :  5 fn2 :  8 current :  3
sequence.next().value;  // fn1 :  8 fn2 :  13 current :  5
sequence.next().value;  // fn1 :  13 fn2 :  21 current :  8
sequence.next(true).value;  // if 문을 타고 fn1:  0 fn2:  1 => while 문으로 진입 fn1 :  1 fn2 :  1 current :  0
sequence.next().value;  // fn1 :  1 fn2 :  2 current :  1
sequence.next().value;  // fn1 :  2 fn2 :  3 current :  1
sequence.next().value;  // fn1 :  3 fn2 :  5 current :  2
/*
    note: 
        next(undefined) 호출은 next() 호출과 같습니다. 
        그러나, next() 호출할 때 undefined 이외의 값으로 신생 생성기를 시작하면 TypeError 예외가 발생합니다.
    
        throw() 메서드를 호출하며 발생해야 할 예외 값을 전달하여 예외를 발생하도록 생성기를 강제할 수 있습니다. 
        이 예외는 생성기의 현재 중단된 문맥에서 발생됩니다, 마치 현재 중단된 yield가 throw value 문 대신인 것처럼.

        발생한 예외 처리 도중 yield를 만나지 않는 경우, 그
        뒤 예외는 throw() 호출을 통해 위로 전하며 next()의 후속 호출 결과 done 속성은 true가 됩니다.

        생성기는 주어진 값을 반환하고 생성기 자체를 끝내는 return(value) 메서드가 있습니다.
*/
