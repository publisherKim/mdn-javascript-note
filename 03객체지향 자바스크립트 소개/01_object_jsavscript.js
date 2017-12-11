/*
    비록 다른 객체지향적인 언어들과의 차이점에 대한 논쟁들이 있긴 하지만, JavaScript는 강력한 객체지향 프로그래밍 능력들을 지니고 있다.

    이 글에서는 객체지향 프로그래밍에 대해 소개하는 것으로 시작해서 자바스크립트의 객체 모델, 
    그리고 자바스크립트에서의 객체지향 프로그래밍 개념에 대해 간단한 예제로 살펴볼 것이다.

    자바스크립트 리뷰(JavaScript review)

    만약 변수, 형, 함수, 스코프 등 자바스크립트의 개념에 대해 명확히 이해하고 있지 못하다면, A re-introduction to JavaScript를 참고해 보자. 
    Core JavaScript 1.5 Guide라는 글도 도움이 될 것이다.
*/

/*
    객체지향 프로그래밍(Object-oriented programming)
        객체지향 프로그래밍은 실제 세계에 기반한 모델을 만들기 위해 추상화를 사용하는 프로그래밍 패러다임이다. 
        객체지향 프로그래밍은 modularity, polymorphism, encapsulation을 포함하여 이전에 정립된 패러다임들부터 여러가지 테크닉들을 사용한다. 
        오늘날 많은 유명한 프로그래밍 언어(자바, 자바스크립트, C#, C++, 파이썬, PHP, 루비, 오브젝트C)는 객체지향 프로그래밍을 지원한다.

        객체지향 프로그래밍은 함수들의 집합 혹은 단순한 컴퓨터의 명령어들의 목록 이라는 기존의 프로그래밍에 대한 전통적인 관점에 반하여, 
        관계성있는 객체들의 집합이라는 관점으로 접근하는 소프트웨어 디자인으로 볼 수 있다. 
        객체지향 프로그래밍에서, 각 객체는 메시지를 받을 수도 있고, 데이터를 처리할 수도 있으며, 또다른 객체에게 메시지를 전달할 수도 있다. 
        각 객체는 별도의 역할이나 책임을 갖는 작은 독립적인 기계로 볼 수 있는 것이다.

        객체지향 프로그래밍은 보다 유연하고 유지보수성이 높은 프로그래밍을 하도록 의도되었고, 대규모 소프트웨어 공학에서 널리 알려져 있다. 
        객체지향 프로그래밍이 갖는 modularity에 기반한 강력한 힘에 의해, 
        객체지향적인 코드는 개발을 보다 단순하게 했고, 시간이 흐른 뒤에도 보다 쉽게 이해할 수 있도록 했으며, 
        복잡한 상황이나 절차들을 덜 모듈화된 프로그래밍 방법들보다 더 직접적으로 분석하고, 코딩하고, 이해할 수 있도록 만들었다.
*/

/*
    용어(Terminology)

        Class
            객체의 특성을 정의
        Object
            Class의 인스턴스
        Property
            객체의 특성(예: 색깔)
        Method
            객체의 능력(예: 걷기)
        Constructor
            인스턴스화 되는 시점에서 호출되는 메서드
        Inheritance
            클래스는 다른 클래스로부터 특성들을 상속받을 수 있다.
        Encapsulation
            클래스는 해당 객체의 특성들만을 정의할 수 있고, 메서드는 그 메서드가 어떻게 실행되는지만 정의할 수 있다. (외부 접근 불가)
        Abstraction
            복잡한 상속, 메서드, 객체의 속성의 결합은 반드시 현실 세계를 시뮬레이션할 수 있어야 한다.
        Polymorphism
            다른 클래스들이 같은 메서드나 속성으로 정의될 수 있다.
            객체지향 프로그래밍에 대한 보다 확장된 설명은 Object-oriented programming를 참고하면 된다.
*/

/*
    프로토타입기반 프로그래밍(Prototype-based programming)
        프로토타입 기반 프로그래밍은 클래스가 존재하지 않는 객체지향 프로그래밍의 한가지 스타일로, 
        동작 재사용(behavior reuse, 클래스기반 언어에서는 상속이라고함)은 프로토타입으로서 존재하는 객체를 데코레이팅하는 과정을 통해 수행된다.

        프로토타입 기반 언어의 원형적인 예는 David Ungar과 Randall Smith가 개발한 'Self'라는 프로그래밍 언어이다. 
        그러나 클래스가 없는 프로그래밍 스타일이 최근 인기를 얻으며 성장하였고, 
        자바스크립트, Cecil, NewtonScript, Io, MOO, REBOL, Kevo, Squeak 등의 언어에서 채택되어 왔다
*/

/*
    자바스크립트 객체지향 프로그래밍(JavaScript Object Oriented Programming)
        Core Objects
            자바스크립트는 코어(core)에 몇 개의 객체를 갖고 있다. 
            예를들면, Math, Object, Array, String과 같은 객체가 있다. 
            아래의 예제는 Math 객체를 사용해서 무작위 숫자를 만들어내는 것을 보여준다.
*/
Math.random();
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects  core object들의 리스트
// 자바스크립트의 모든 객체는 Object 객체의 인스턴스이므로 Object의 모든 속성과 메서드를 상속받는다.

/*
Custom Objects
    The Class
        class문을 흔하게 볼 수 있는 C++이나 자바와는 달리 자바스크립트는 class문이 포함되지 않은 프로토타입 기반 언어이다. 
        이로인해 때때로 class 기반 언어에 익숙한 프로그래머들은 혼란을 일으킨다. 
        자바스크립트에서는 function을 class로서 사용한다. 
        클래스를 정의하는 것은 function을 정의하는 것만큼 쉽다. 
        아래 예제에서는 Person이라는 이름의 클래스를 새로 정의하고 있다.
*/
function Person() {}

/*
    The Object (Class Instance)
        obj라는 이름의 객체의 새로운 인스턴스를 만들 때에는 new obj라는 statement를 사용하고, 차후에 접근할 수 있도록 변수에 결과를 받는다.

        아래의 예제에서 Person이라는 이름의 클래스를 정의한 후에, 두 개의 인스턴스를 생성하고 있다.
*/
function Person() {}
var person1 = new Person();
var person2 = new Person();
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create object.create 방법 참고

/*
    The Constructor
        생성자는 인스턴스화되는 순간(객체 인스턴스가 생성되는 순간) 호출된다. 
        생성자는 해당 클래스의 메서드이다. 
        자바스크립트에서는 함수 자체가 그 객체의 생성자 역할을 하기 때문에 특별히 생성자 메서드를 정의할 필요가 없다. 
        클래스 안에 선언된 모든 내역은 인스턴스화되는 그 시간에 실행된다. 
        생성자는 주로 객체의 속성을 설정하거나 사용하기 위해 객체를 준비시키는 메서드를 호출할 때 주로 사용된다. 
        클래스 메서드를 추가하고 정의하는 것은 나중에 설명한다.
        
        아래의 예제에서, Person 클래스의 생성자는 Person 이 인스턴스화되었을 때 alert 을 보여주게 된다.
*/
function Person() {
    alert('Person instantiated');
}
  
var person1 = new Person();
var person2 = new Person();

/*
    The Property (object attribute)
        속성은 클래스 안에 있는 변수들을 말한다. 
        객체의 모든 인스턴스는 그 인스턴스의 속성을 갖는다. 
        속성들의 상속이 바르게 이루어지려면 해당 클래스(function)의 프로토타입에 선언되어 있어야 한다.

        클래스 내에서 속성 작업은 현재 객체를 가리키는 this 키워드에 의해 이루어진다. 
        클래스의 외부에서 속성에 접근(읽기 혹은 쓰기)하는 것은 "인스턴스명.속성명" 의 형식으로 이루어진다. 
        이러한 문법은 C++, 자바나 다른 수많은 언어에서와 동일한 방식이다. 
        (클래스 내부에서 "this.속성명" 은 해당 속성의 값을 읽거나 쓸 때 주로 사용된다)

        아래의 예제에서 Person 클래스에 gender라는 속성을 정의하고 인스턴스화할 때 그 값을 설정한다.
*/
function Person(gender) {
    this.gender = gender;
    console.log('Person instantiated');
}
  
var person1 = new Person('Male');
var person2 = new Person('Female');
person1.gender; // Male

/*
    메서드(The methods)
        메서드는 앞서 살펴본 속성과 같은 방식을 따른다. 
        차이점이 있다면 메서드는 function이기 때문에 function 형태로 정의된다는 것입니다. 
        메서드를 호출하는 것은 속성에 접근하는 것과 매우 유사한데 단지 끝에 ()를 추가하면 된다. 
        argument가 있다면 괄호 안에 입력해준다. 
        메서드를 정의하기 위해서는 클래스의 prototype에 명명된 속성에 함수를 할당하면 된다. 
        이때 할당된 이름은 해당 객체의 메서드를 호출할 때 사용되는 이름이다.

        아래의 예에서는 Person 클래스에 sayHello()라는 메서드를 정의하고 사용하고 있다.
*/
function Person(gender) {
    this.gender = gender;
    console.log('Person instantiated');
}

Person.prototype.sayHello = function () {
    console.log('hello');
}
var person1 = new Person('Male');
var person2 = new Person('Female');
person1.sayHello(); // hello

// 자바스크립트에서 메서드는 "컨텍스트에 관계 없이" 호출될 수 있는 속성으로서 클래스/객체에 연결되어 있다. 다음 예제의 코드를 살펴보자.
function Person(gender) {
    this.gender = gender;
}

Person.prototype.sayGender = function() {
    return this.gender;
}
var person1 = new Person('Male');
var genderTeller = person1.sayGender;
  
person1.sayGender();    // Male
genderTeller();         // undefined
genderTeller === person1.sayGender;             // true
genderTeller === Person.prototype.sayGender     // true
/*
    위의 예제는 많은 개념들을 한꺼번에 보여주고 있다. 

    먼저 이 예제는 자바스크립트에 "per-object methods" 가 존재하지 않는다는 것을 보여준다. 
    JavaScript는 메서드에 대한 레퍼런스가 모두 똑같은 (프로토타입에 처음 정의한) 함수를 참조하고 있기 때문이다.

    참고로, genderTeller() 만 호출했을 때 undefined 가 나타난 것은 해당 메서드가 호출될 때 컨텍스트가 window 로 잡혔기 때문에 
    window.gender 는 존재하지 않으므로 undefined 가 나타난 것이다.

    자바스크립트는 어떤 객체의 메서드로서 함수가 호출될 때 현재 "객체의 컨텍스트"를 특별한 "this" 변수에 "연결한다". 
    이는 아래와 같이 function 객체의 call 메서드를 호출하는 것과 동일하다.
*/
genderTeller.call(person1); // Male

/*
    상속(Inheritance)
        상속은 하나 이상의 클래스를 특별한 버전의 클래스로 생성하는 하나의 방법이다. 
        (다만 자바스크립트는 오직 하나의 클래스를 상속받는 것만 지원한다.) 
        이 특별한 클래스는 흔히 자식 클래스(child)라고 불리우고 원본 클래스는 흔히 부모 클래스(parent)라고 불리운다. 
        자바스크립트에서는 부모 클래스의 인스턴스를 자식 클래스에 할당함으로써 상속이 이루어진다. 
        최신 브라우저에서는 Object.create 메서드를 사용해서 상속을 수행할 수도 있다.

        아래의 예제에서는, Student라는 클래스를 Person 클래스의 자식 클래스로 정의한다.
         그 후에 우리는 sayHello() 메서드를 재정의하고 sayGoodBye() 메서드를 추가한다.
*/
// define the Person Class
function Person() {}

Person.prototype.walk = function() {
    return 'I am walking';
};
Person.prototype.sayHello = function() {
    return 'hello';
};

// define the Student class
function Student() {
    Person.call(this);
}

// inherit Person
Student.prototype = new Person();

// correct the constructor pointer because it points to Person
Student.prototype.constructor = Student;

// replace the sayHello method
Student.prototype.sayHello = function() {
    return 'hi, I am a student';
}

// add sayGoodBye method
Student.prototype.sayGoodBye = function(){
    return 'goodBye';
}

var student1 = new Student();
student1.sayHello();    // "hi, I am a student"
student1.walk();        // "I am walking"
student1.sayGoodBye();  // "goodBye"

student1 instanceof Person      // true
student1 instanceof Student     // true

// Object.create 를 사용하면 상속을 아래와 같이 수행할 수 있다.
Student.prototype = Object.create(Person.prototype);

/*
    캡슐화(Encapsulation)
        이전의 예제에서, Student 클래스는 Person 클래스의 walk() 메서드가 어떻게 실행되는지에 대해 알 필요가 없고, 
        walk() 메서드를 사용하는데에도 전혀 문제가 없다. 
        또 Student 클래스에서는 walk() 메서드의 내용을 바꾸려는게 아니라면 walk() 메서드를 특별히 정의할 필요도 없다. 
        자식 클래스는 부모 클래스의 모든 메서드를 상속받고, 
        상속받은 메서드중 일부를 수정하고 싶은 경우에만 해당 메서드를 정의하는 것을 우리는 캡슐화(encapsulation)이라고 부른다.
*/

/*
    추상화(Abstraction)
       추상화는 작업 문제의 현재 부분을 모델링할 수 있도록 하는 매커니즘이다. 
       추상화는 상속(specialization, 추상의 수준을 낮추는 것)과 합성으로 구현할 수 있다. 
       자바스크립트는 상속에 의해 특별화(specialization)를, 클래스들의 인스턴스를 다른 객체의 속성값이 되게 함으로써 합성을 구현한다. 

       자바스크립트 Function 클래스는 Object 클래스를 상속받고(이는 모델의 특별화를 보여준다), 
       Function.prototype 속성은 Object의 인스턴스이다(이는 합성을 보여준다).
*/
var foo = function(){};
console.log( 'foo is a Function: ' + (foo instanceof Function) );   // foo is a Function: true
console.log( 'foo.prototype is an Object: ' + (foo.prototype instanceof Object) );  // foo.prototype is an Object: true

/*
    다형성(Polymorphism)
        모든 메서드와 속성들은 prototype 속성에 선언되어 있고, 클래스가 다르다면 같은 이름의 메서드도 선언할 수 있다. 
        메서드들은 메서드가 선언된 클래스로 그 실행 영역이 한정된다. 
        물론 이건 두 개의 클래스들이 서로 부모-자식 관계가 아닐때에만 성립한다. 
        즉 다시 말해 부모-자식 관계의 상속 관계로 하나가 다른 하나에게서 상속받지 않았을 때에만 성립한다.
    
    Notes
        객체지향 프로그래밍을 구현하는데 있어서 자바스크립트는 매우 유연하기 때문에, 이 글에서 선
        보인 테크닉들은 자바스크립트에서 객체지향을 구현하는 유일한 방법들 중 일부일 뿐이다.
        
        또, 여기에서 선보인 테크닉들은 어떤 hack도 사용하지 않았고 또한 다른 언어의 객체 이론 구현물들을 모방하지도 않았다.
*/