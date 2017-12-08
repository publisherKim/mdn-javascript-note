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