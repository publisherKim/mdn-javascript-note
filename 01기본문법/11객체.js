/*
    자바스크립트는 간단한 객체기반 패러다임 상에서 만들어졌다. 
    객체는 프로퍼티의 모음이며, 프로퍼티는 "이름"(name 또는 key)과 "값"(value)의 연결로 이루어진다 . 
    프로퍼티의 값으로 함수가 될 수 있는데, 이런 프로퍼티는 메소드라고 불린다. 
    브라우저 안에 미리 정의 된 객체뿐 아니라 사용자들이 직접 자신만의 객체를 정의할 수도 있다.
*/

/*
    개요
        자바스크립트에서의 객체는 다른 프로그래밍 언어에서와 비슷하게 현실 세계에서의 사물(objects)과 비교해 볼 수 있다. 
        자바스크립트에서의 객체의 개념은 실세계상에서의 인식 가능한 사물로 이해할 수 있다.   

        객체는 단독으로 존재 가능한 개체(entity)이며, 프로퍼티(property)과 타입(type)을 가진다. 
        예를 들어 컵과 비교를 해 본다면 컵은 사물 객체인데 색깔, 모양, 무게, 재료 등의 속성(프로퍼티)을 가지고 있다. 
        비슷하게 자바스크립트의 객체는 그 특징을 결정짓는 여러 프로퍼티를 가진다.
*/

/*
    객체와 프로퍼티
        자바스크립트의 객체에는 그와 연관된 프로퍼티가 있다. 
        프로퍼티는 객체에 붙은 변수(variable)라고 설명할 수 있겠다. 
        객체의 프로퍼티는 일반 자바스크립의 변수와 기본적으로 똑같은데, 다만 객체에 속해있다는 차이만 있을 뿐이다. 
        객체의 프로퍼티들이 객체의 특징을 규정한다. 
        프로퍼티에 접근할 때는 도트(점) 표기법을 사용한다.        
*/
objectName.propertyName
var myCar = new Object();
myCar.make = "Ford";
myCar.model = "Mustang";
myCar.year = 1969;
myCar   // {make: "Ford", model: "Mustang", year: 1969}

myCar["make2"] = "Ford2";
myCar["model2"] = "Mustang2";
myCar["year2"] = 1970;
myCar   // {make: "Ford", model: "Mustang", year: 1969, make2: "Ford2", model2: "Mustang2", …}

/*
    객체의 프로퍼티 이름은 유효한 자바스크립트 문자열이거나 문자열로 변환이 가능한 것이면 어떤 것이든 가능하며, 심지어 빈 문자열도 된다. 
    하지만 자바스크립트 식별자(identifier)로 적합하지 않으면 (예 : 하이픈, 빈칸을 포함하거나 숫자로 시작하는 이름), 대괄호를 이용한 표기법으로만 접근이 가능하다. 
    이 표기법은 프로퍼티 이름이 사전에 미리 결정되지 않고 런타임 시점에 결정되는 경우에 특히 유용하다. 
    아래의 예를 보자.
*/
var myObj = new Object(),
    str = "myString",
    rand = Math.random(),
    obj = new Object(); // 변수 4개를 콤마를 사용하여 한번에 생성하고 할당.
    
myObj.type              = "Dot syntax";
myObj["date created"]   = "String with space";
myObj[str]              = "String value";
myObj[rand]             = "Random Number";
myObj[obj]              = "Object";
myObj[""]               = "Even an empty string";
myObj   // type: "Dot syntax", date created: "String with space", myString: "String value", 0.21835678083759635: "Random Number", [object Object]: "Object", …}

var myCar = new Object();
var propertyName = "make";
myCar[propertyName] = "Ford";
propertyName = "model";
myCar[propertyName] = "Mustang";
myCar   // {make: "Ford", model: "Mustang"}

// 대괄호 표기법을 for...in 과 함께 사용하면 객체의 열거가능한 프로퍼티를 나열가능
var myCar = new Object();
var propertyName = "make";
myCar[propertyName] = "Ford";
propertyName = "model";
myCar[propertyName] = "Mustang";
function showProps(obj, objName) {
    var result = "";
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
          result += objName + "." + i + " = " + obj[i] + "\n";
      }
    }
    return result;
}

showProps(myCar, 'myCar');  // "myCar.make = Ford \n myCar.model = Mustang"

/*
    모든 것이 객체
        자바스크립트 세상에서는 거의 모든 것들이 객체이다. 
        null 과 undefined 를 제외한 모든 원시 타입도 객체로 취급된다. 
        이러한 원시 타입들에도 프로퍼티가 추가될 수 있고 (설명 필요: assigned properties of some types are not persistent), 모두 객체로서의 특징을 갖는다.    
*/

/*
    프로퍼티 나열하기
        ECMAScript 5 를 기준으로 객체의 프로퍼티를 나열/순회하는 방법이 세 가지 있다.
            1. for...in 루프: 이 방법은 객체와 객체의 프로토타입 체인 상의 열거 가능한 모든 프로퍼티를 순회한다.
            2. Object.keys(o): 이 메소드는 객체 o  자체에 속한(즉 프로토타입 체인 상에 있는 것은 제외)  열거 가능한 프로퍼티 이름들("keys")의 배열을 반환
            3. Object.getOwnPropertyNames(o): 이 메소드는 객체 o 자체의 모든  프로퍼티(열거 가능 여부에 무관) 이름들의  배열을 반환

        note: ECMAScript 5 이전 버전에서는 객체의 모든 프로퍼티를 나열하는 자체적인 방법이 제공되지 않았다. 하지만 아래 함수를 이용하면 가능
*/
var myCar = {a:1, b:2, c:3};
function listAllProperties(o){     
	var objectToInspect;     
	var result = [];
	
	for(objectToInspect = o; objectToInspect !== null; objectToInspect = Object.getPrototypeOf(objectToInspect)){  
		result = result.concat(Object.getOwnPropertyNames(objectToInspect));  
	}
	
	return result; 
}
listAllProperties(myCar);   // ["a", "b", "c", "constructor", "__defineGetter__", "__defineSetter__", "hasOwnProperty", "__lookupGetter__", "__lookupSetter__", "isPrototypeOf", "propertyIsEnumerable", "toString", "valueOf", "__proto__", "toLocaleString"]
/*
    객체의 "숨겨진" 프로퍼티를 알아내는 데 유용, 
    숨겨진 프로퍼티란 프로토타입 체인 상의 프로퍼티 중 객체를 통해 접근이 불가능한 것들을 말하는데 동일 이름의 다른 프로퍼티가 프로퍼티 체인 상에서 먼저 존재하는 경우에 발생
    만약 접근 가능한 프로퍼티만 나열하고 싶다면 배열에서 중복되는 프로퍼티들을 제거하면 된다.
*/

var myCar = {a:1, b:2, c:3};
function listAllProperties(o){     
	var result = [];
	// 초기값, 조건식, 
	for(var o = o; o !== null; o = Object.getPrototypeOf(o)){
        console.log('protype chaing으로 뽑고: ', Object.getPrototypeOf(o));  
        console.log('객체의 속성이름 뽑기: ', Object.getOwnPropertyNames(o));
		result = result.concat(Object.getOwnPropertyNames(o));  
	}
	
	return result; 
}
listAllProperties(myCar);
// 두개의 구조체라는걸 알수 있다.
/*
    객체 생성하기
        자바스크립트에는 미리 정의된 객체가 몇 개 존재한다. 
        사용자는 여기에 추가적으로 자신의 객체를 생성할 수 있다. 
        자바스크립트 1.2 부터는 객체 이니셜라이저(initializer) 를 이용하여 객체를 생성할 수 있다. 
        또 다른 방법으로는 먼저 생성자 함수를 정의한 후 이 함수와 new 연산자를 이용하여 인스턴스를 만들수 있다.    
*/

/*
    객체 이니셜라이저
        생성자 함수를 사용하는 방법 대신, 객체 이니셜라이저를 사용하여 객체를 생성할 수 있다. 
        이 방식은 때때로 "리터럴 표기에 의한 객체 생성"(creating objects with literal notation) 이라고도 불린다. 
        객체 이니셜라이저라는 단어는 C++ 에서도 비슷한 의미로 사용된다.
*/
var obj = { property_1:   value_1,   // property_# may be an identifier...
            2:            value_2,   // or a number...
            // ...,
            "property n": value_n }; // or a string 
/*
    obj는 새로 만들어질 객체 이름이고, property_i는 식별자 (이름, 숫자, 또는 스트링 리터럴), value_i 는 수식인데 이 값이 property_i 에 할당 된다. 
    obj 변수에 할당 (assignment =) 하는 것은 선택 사항이다; 
    이 생성된 객체를 다른 곳에서 참조할 필요가 없다면 변수에 할당하지 않아도 된다. 
    (만약 이 생성된 객체를 변수를 사용하지 않고 구문 안에서 바로 사용하려면 블럭 구문과 혼돈되지 않도록 리터널을 괄호로 감싸줄 필요가 있다.)

    객체 이니셜라이저는 수식이고, 각각의 이니셜라이저가 포함된 구문이 실행될 때 마다 이니셜라이저 수식에 의해 새로운 객체가 하나씩 생성이 된다. 
    똑같은 이니셜라이저에 의해 생성된 객체라도 서로 별개이며 비교 결과는 동일하지 않음 (not equal) 이 된다. 
    객체는 마치 new Object() 호출이 실행된 것 처럼 생성이 된다; 즉, 객체 이니셜라이저 수식에 의해 만들어진 객체들은 Object의 인스턴스들이 된다.
*/
var obj = {1: 'identifier', 2: 2, 3: 3*1};

var cond = false;
if(cond) var x = {hi: "there"};

var myHonda = {
    color: "red", 
    wheels: 4, 
    engine: {
        cylinders: 4, size: 2.2
    }
};

/*
    생성자 함수 사용하기
        1. 생성자 함수를 작성하여 객체 타입을 정의한다. 
           객체 타입 이름의 첫 글자는 반드시 대문자를 사용하는 좋은 관례가 있으므로 따르기를 권장한다.
        2. new를 이용하여 객체의 인스턴스를 생성한다.

        객체의 타입을 정의하려면 타입의 이름, 속성(프로퍼티), 메소드 등을 기술하는 함수를 하나 만들어야 한다. 
        예를 들면, 여러분이 자동차를 위한 객체 타입을 만들기 원한다면, 이 객체의 타입의 이름은 car이고, 이 타입은 제조사, 모델, 생산연도를 위한 속성을 포함하길 원할 것이다. 
        아마도 다음과 같은 함수를 작성하게 될 것이다:
*/
function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}
// 함수 인자로 전달 받은 값을 객체의 속성에 할당하기 위해서 this를 사용 한 것에 주목하기 바란다.

var mycar = new Car("Eagle", "Talon TSi", 1993);

// new를 이용하면 어떤 갯수의 car 객체도 만들 수 있다.
var kenscar = new Car("Nissan", "300ZX", 1992);
var vpgscar = new Car("Mazda", "Miata", 1990);

// 객체는 또 다른 객체를 속성으로 가질 수 있다
function Person(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
}
var rand = new Person("Rand McKinnon", 33, "M");
var ken = new Person("Ken Jones", 39, "M");

function Car(make, model, year, owner) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.owner = owner;
}

var car1 = new Car("Eagle", "Talon TSi", 1993, rand);
var car2 = new Car("Nissan", "300ZX", 1992, ken);
car1;
car2;

car2.owner.name;

car1.color;
car1.color = "black";
car1.color;

/*
    Object.create 메서드 사용
    객체는 Object.create 메서드를 이용해서 생성될 수 있다. 
    이 메서드는 사용할 프로토타입 객체를 사용자가 직접 선택할 수 있기 때문에 상당히 유용하다. 
    (객체 생성시 생성자 함수가 없어도 가능하다). 
    이 메서드에 대한 더 자세한 정보는 Object.create method 를 참고하도록 하자.
*/
// Animal properties and method encapsulation
var Animal = {
    type: "Invertebrates", // Default value of properties
    displayType : function(){  // Method which will display type of Animal
      console.log(this.type);
    }
  }
  
  // Create new animal type called animal1 
  var animal1 = Object.create(Animal);
  animal1.displayType(); // Output:Invertebrates
  
  // Create new animal type called Fishes
  var fish = Object.create(Animal);
  fish.type = "Fishes";
  fish.displayType(); // Output:Fishes

  // 

  /*
    상속: 
        JavaScript 에서의 모든 객체들은 최소한 하나의 다른 객체로부터 상속을 받는다. 
        상속을 제공하는 객체를 프로토타입이라고 부르며, 상속되는 속성들은 prototype 이라는 생성자 객체에서 찾을 수 있다.
    
        객체 프로퍼티의 인덱싱:
            JavaScript 1.0에서는 객체의 속성을 참조할 때 속성 이름을 이용하거나 또는 숫자 인덱스를 이용할 수 있었다. 
            하지만 JavaScript 1.1과 그 이후 부터는 처음에 프로퍼티를 이름으로 정의하면 항상 이름으로만 참조를 할 수 있고, 
            처음에 인덱스를 이용하여 정의하면 인덱스를 이용해서만 참조할 수 있다.

            이 제약 사항은 생성자 함수를 이용하여 객체와 프로퍼티를 생성할 때 (앞에서 Car 객체 타입의 예)에도 동일하게 적용되고, 
            개개의 속성을 명시적으로 지정할 때 (예: myCar.color = "red")에도 마찬가지이다. 
            만약 처음에 객체 속성을 정의할 때 myCar[5] = "25 mpg" 처럼 인덱스 방식을 사용하면, 그 이후에도 계속 myCar[5] 방식으로만 참조할 수 있다.

            forms 배열과 같이 HTML 로부터 얻어지는 객체들에는 이 규칙이 적용되지 않는다. 
            숫자를 이용하거나 (이 객체가 문서 상에 존재하는 순서에 따라) 또는 태그의 attribute 이름으로 참조가 가능하다. 
            예를 들면 HTML 문서에서 두 번째 <FORM> 태그가 "myForm" 이라는 값의 NAME attribute 를 가지고 있다면, 
            이 form을 document.forms[1] 또는 document.forms["myForm"] 또는 document.myForm 와 같이 접근할 수 있다.
  */

  /*
    객체 타입의 프로퍼티 정의:
        prototype 프로퍼티를 사용하여 미리 정의된 객체 타입에 속성을 추가할 수 있다. 
        이렇게 정의된 속성은 해당 객체 타입의 한 인스턴스에만 적용되는 것이 아니라 해당 객체 타입의 모든 인스턴스가 갖게 된다. 
        다음 코드에서는 car 타입의 객체 전체에 color 프로퍼티를 추가한 후, car1 인스턴스의 color 프로퍼티에 값을 할당하는 것을 보여준다.
  */
function Car(make, model, year, owner) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.owner = owner;
}

var car1 = new Car("Eagle", "Talon TSi", 1993, '1234');

Car.prototype.color = null;
car1.color = "black";
car1;

/*
    메소드 정의:
        메소드는 한 객체와 연관된(associated) 함수이며, 간단하게 말해 객체의 프로퍼티 중에서 함수인 것을 메소드라고 한다. 
        메소드를 정의하는 방식은 일반 함수를 정의하는 것과 동일하고, 다만 어떤 객체의 프로퍼티로 할당되어야 한다는 점이 차이가 난다. 
        자세한 것은 method definitions를 참조하자. 
        다음은 메소드 정의의 한 예이다.
*/
objectName.methodname = function_name;

var myObj = {
    myMethod: function(params) {
      // ...do something
      console.log('test');
    }
};
myObj.myMethod();

// 객체 생성자 함수에 메소드 정의를 포함시킴으로써 해당 객체 타입의 메소드를 정의할 수 있다. 
function Car(make, model, year, owner) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.owner = owner;
    this.displayCar = displayCar;
}

var car1 = new Car("Eagle", "Talon TSi", 1993, '1234');

function displayCar() {
    var result = "A Beautiful " + this.year + " " + this.make
      + " " + this.model;
    return result;
}

car1.displayCar();  // "A Beautiful 1993 Eagle Talon TSi"

/*
    객체 참조를 위해 this 를 사용하기
        자바스크립트는 특별한 키워드를 가지고 잇습니다. 바로 this라는 키워드 입니다. 
        메서드 내부에서 this 키워드를 사용하게 되면 해당 메서드를 포함한 객체를 가르키게 됩니다. 
        예를 들어 특정 객체의 속성값의 상한과 하한 값의 범위에 있는지를 확인하는 validate라는 함수를 아래와 같이 작성한다고 했을 때,
*/
var test = {
    value: 10
}

function validate(obj, lowval, hival) {
    if ((obj.value < lowval) || (obj.value > hival)) return "Invalid Value!";
    return 'valid Value';
}
validate(test, 1, 11);  // "Invalid Value!"
validate(test, 10, 11); // 'valid Value'

/*
      <input type="text" name="age" size="3" onChange="validate(this, 18, 99)">
      validate메서드를 개별 form요소의 onchange에 대한 이벤트 처리객체에서 호출할 수 있습니다. 
      그때 다음의 예제 처럼, this 키워드를 사용하여 해당 form요소를 인자로 넘길 수 있습니다
*/

// 일반적으로 this는 메서드를 호출하는 객체를 지칭. 

/*
    getters and setters definition
        getter 메서드는 특정 속성의 값을 받아 오기 위한 메서드 입니다. 
        setter메서드는 특정 속성의 값을 설정하기 위한 메서드 입니다. 
        새로운 속성을 추가 하기 위해 getter와 setter 메서드들을 미리 정의된 객체 혹은 사용자 정의 객체에 정의 하 수 있습니다.  
        getter와 setter메서드들을 정의 하기 위한 문법은 객체 구문 문법을 사용합니다.
*/
var o = {
    a: 7, 
    get b() {return this.a + 1;}, 
    set c(x) {this.a = x / 2}
};
o.a;
o.b;
o.c = 50;
o.a;
/*
    o.a — 숫자
    o.b — o.a에 1을 더한 값을 반환하는 getter 메서드
    o.c — o.a에 주어진 인자 값의 반에 해당 하는 값을 설정하는 setter 메서드
*/

var d = Date.prototype;
Object.defineProperty(d, "year", {
    get: function() {return this.getFullYear() },
    set: function(y) { this.setFullYear(y) }    
});

var now = new Date;
now.getFullYear();   // 2017
now;    // Fri Dec 08 2017 10:40:01 GMT+0900 (대한민국 표준시)

/* 
    정리: 원칙적으로 getter와 setter메서드들은 아래의 둘중 하나의 방법으로 선언
        1. object initializers를 사용하여 정의
        2. getter와 setter메서드 추가 방법을 사용하여 언제든지 특정 객체에 나중에 추가하는 방법

    object initializers 방법을 사용하여 getter와 setter메서드들을 정의할 경우, getter메서드는 get, setter메서드는 set이라는 접두사만 추가하면 됩니다. 
    물론 getter메서드는 인자를 받지 않는 반면, setter 메서드는 정확히 하나의 인자(설정할 새로운 값)만을 받습니다. 
*/
var o = {
    a: 7,
    get b() {return this.a + 1},
    set c(x) {return this.a = x/2;}
};
o.a;    // 7
o.b;    // 8
o.c = 6;
o.b;    // 3

/*
    Object.defineProperties 메서드를 사용하면 객체 생성이후라도 언제든지 getter and setter메서드들을 객체에 추가할 수 있습니다. 
    Object.defineProperties 메서드의 첫번째 인자는 getter and setter메서드들을 추가할 객체이고, 
    두번째 인자는 getter and setter메서드들의 이름과 getter and setter메서드들의 정의를 가지고 있는 객체가 되어야 합니다. 
    이전 예제와 동일하게 사용된 getter and setter메서드들을 정의하고 있는 예제는 아래와 같습니다:
*/
var o = { a:0 };
Object.defineProperties(o, {
    "b": { get: function () { return this.a + 1; } },
    "c": { set: function (x) { this.a = x / 2; } }
});
o.a;    // 0
o.c = 10
o.a;    // 5    =>  a= 10/2
o.b         // 6;   =>  a = 5 + 1

// 프로퍼티의 삭제: 상속 받지 않은 속성은 delete 연산자를 이용하여 제거 할 수 있다.
var myobj = new Object;
myobj.a = 5;
myobj.b = 12;
delete myobj.a;
"a" in myobj;   // false

// var 키워드로 선언하지 않은 전역 변수도 delete를 이용하여 삭제를 할 수 있다
g = 17;
delete g;

// 객체 간의 비교: JavaScript 에서는 객체들은 레퍼런스 타입이다. 
var fruit = {name: "apple"};
var fruitbear = {name: "apple"};
fruit == fruitbear  // false
fruit === fruitbear  // false
// but
fruit.name == fruitbear.name    // true
fruit.name === fruitbear.name    // true
// 값은 참조가 아니다.

// 두 개의 변수이지만 하나의 객체
var fruit = {name: "apple"};
var fruitbear = fruit;  // fruit 객체 레퍼런스를 fruitbear 에 할당

// here fruit and fruitbear are pointing to same object
fruit == fruitbear // true 리턴
fruit === fruitbear // true 리턴
// 동일한 주소지를 바라보면 참조가 아니다.