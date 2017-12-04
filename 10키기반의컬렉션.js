// Map과 Set은 입력된 순서대로 반복적으로 접근 가능한 요소들을 포함

// Maps
/*
    Map 객체:
        ECMAScript 6에서 값들을 매핑하기 위한 새로운 데이터 구조를 소개 하고 있다.  
        그중 하나인 Map객체는 간단한 키와 값을 서로 연결(매핑)시켜 저장하며 저정된 순서대로 각 요소들을 반복적으로 접근할 수 있도록 한다.

        다음 코드는 Map이 제공하는 기본적인 기능들을 보여 주고 있다. 
        더 많은 예제와 모든 기능에 대한 API를 볼려면 Map 페이지를 참고하면 된다. 
        Map객체에 저장되어 있는 각 요소들을 [키, 값] 형태의 배열로 반복적으로 반환해주는 for...of 를 사용할 수 있다.     
*/
var sayings = new Map();
sayings.set("dog", "woof");
sayings.set("cat", "meow");
sayings.set("elephant", "toot");

sayings.size; // 3
sayings.get("fox"); // undefined
sayings.has("bird"); // false
sayings.delete("dog");  // true

for (var [key, value] of sayings) {
    console.log(key + " goes " + value);
}
// cat goes meow
// elephant goes toot

/*
    object와 Map 비교:
        전통적으로 objects 는 문자열을 값에 매핑하는 데 사용되었다. 
        Object는 키를 값으로 설정하고, 값을 검색하고, 키를 삭제하고, 키에 저장된 내용을 검색 할 수 있게 만들어준다. 
        그러나 Map 객체는 더 나은 맵이 되도록 하는 몇 가지 장점을 가지고 있다.

            1. Object의 키는 Strings이며, Map의 모든 값을 가질 수 있다.
            2. Object는 크기를 수동으로 추적해야하지만, Map은 크기를 쉽게 얻을 수 있다.
            3. Map은 삽입된 순서대로 반복된다.
            4. 객체(Object)에는 prototype이 있어 Map에 기본 키들이 있다. (이것은 map = Object.create(null) 를 사용하여 우회할 수 있다. )

        Object 혹은 Map중에 어느 것을 사용할지를 결정하는데 도움을 줄 두가지 팁
            1. 실행 시까지 키를 알수 없고, 모든 키가 동일한 type이며 모든 값들이 동일한 type일 경우에는 objects를  대신해서 map을 사용해라. 
            2. 각 개별 요소에 대해 적용해야 하는 로직이 있을 경우에는 objects를 사용해라.         
*/

/*
    WeakMap object:
        WeakMap객체는  object만을 키로 허용하고 값은 임의의 값을 허용하는  키/값 형태의 요소의 집합이다. 
        키가 가지고 있는 객체에 대한 참조는 객체에 대한 참조가 더이상 존재하지 않을 경우 garbage collection(GC)의 수거 대상이 되는 약한 참조를 의미한다. 
        WeakMap API는 Map API와 동일하다. 

        단 한가지  Map객체와 다른 점은 WeakMap의 키들은 열거형이 아니라는 점이다. (즉, 키 목록을 제공해 주는 메서드가 없다는 것이다.) 
        만약에 키 목록을 제공한다면 garbage collection의 상태, 결과에 따라 키 목록이 변하게 될 것이다. 이는 비 결정성을 야기한다.
        
        WeakMap에 대한 더 많은 정보와 예제 코드 그리고 "왜 WeakMap을 사용하지?"를 보고 싶다면 WeakMap 페이지를 참고하면 된다. 

        WeakMap를 사용하는 한가지 경우는 객체의 사적인 정보를 저장하기 위해서 이거나 상세 구현 내용을 숨기기 위한 것
        객체가 가지고 있는 그렇지만 외부에 공개되지 않는(private) 데이터와 메서드들은 WeakMap객체인 privates에 저장
        인스턴스를 통해 접근 가능한 모든 것들과 prototype은 public이고 다른 것들은 외부에서는 접근이 불가
        그 이유는 privates는 모듈로부터 내보내기(export)가 되지 않기 때문
*/
const privates = new WeakMap();

function Public() {
    const me = {
        a: 1,
        b: 2,
        c: 3
    };
    privates.set(this, me);
}

Public.prototype.method = function () {
    const me = privates.get(this);
    // Do stuff with private data in `me`...
    return me;
};

module.exports = Public;




var weekMapTest = (function(){
    const privates = new WeakMap();

    function Public() {
        const me = {
            a: 1,
            b: 2,
            c: 3
        };
        privates.set(this, me);
    }
    
    Public.prototype.method = function () {
        const me = privates.get(this);
        // Do stuff with private data in `me`...
        return me;
    };

    return new Public();
})();
weekMapTest.method();   // 값의 확인만 가능 privates 값을 설정할순 없당.
