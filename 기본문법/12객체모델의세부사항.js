/*
    자바스크립트는 클래스 기반이 아닌 prototype에 기초한 객체 기반 언어 입니다. 
    이런 차이점으로 인해, 객체들의 계층 구조의 생성과 속성 및 속성 값의 상속을 어떻게 구현해야 하는지에 대한 부분이 덜 분명할 수 있습니다. 
    이번 장에서는 이런 상황을 명확하게 하고자 합니다. 
*/

/*
    클래스 기반 언어 대 프로토타입 기반 언어
        Java와 C++같은 클래스 기반의 언어들은 두개의 구별되는 개념에 기반을 두고 있습니다: 그건 바로 클래스와 인스턴스입니다.
                1. 클래스는 특정 객체군을 특징 짓는 모든 속성들(Java에서는 메서드들과 필드들을 , C++에서는  멤버들을 속성으로 간주합니다. )을 정의합니다.
                   클래스는 해당 객체군을 표현할 수 있는 특정 멤버를 지칭하는 것이 아닌 그보다 더 추상적인 것입니다. 예를 들어, 직원클래스는 직원들을 대표할 수 있습니다.
                2. 반면 인스턴스는 클래스를 기반으로 실체화된 것입니다. 
                   예를 들어, 빅토리아는 특정 직원 개인을 나타내는 직원 클래스의 인스턴스가 될 수 있습니다. 
                   인스턴스는 부모 클래스의 속성과 동일한 속성들을 가집니다.

    자바스크립트같은 프로토타입기반의 언어들은 위와 같은 클래스와 인스턴스의 차이를 두지 않습니다. 
    간단하게 객체들을 가질 뿐입니다. 
    prototype기반의 언어는 원형(프로토타입)의 객체 개념을 가지고 있습니다. 
    하나의 객체는 새로운 객체를 생성했을 때 초기 속성을 가질 수 있도록 하는 형판(template)으로 사용됩니다. 
    객체는 생성될 때 혹은 실행 시에 자기 자신의 속성을 명시할 수 있습니다. 
    추가적으로, 객체들은 또 다른 객체를 생성하기 위한 프로토타입으로 연관지어 질 수 있으며 
    프로토타입으로부터 생성된 두번째 객체가 프로토타입인 첫번째 객체의 속성을 공유(혹은 접근)하는 것을 허용합니다. 
*/

/*
    클래스 정의
        클래스 기반의 언어들에서, 별도의 클래스를 생성하고 그 안에서 해당 클래스를 정의 할 수 있습니다. 
        해당 정의에서 클래스의 인스턴스를 생성할 수 있는 생성자라고하는 특별한 메서드를 명시할 수 있습니다. 
        생성자는 해당 인스턴스의 초기 속성 값을 지정할 수 있고, 생성 시점에, 다른 적절한 처리를 수행 할 수 있습니다. 
        클래스의 인스턴스를 생성하기 위해서 new 연산자와 함께 생성자를 호출해야 합니다.

        자바스크립는 위와 비슷한 방법을 취합니다. 
        하지만 생성자이외에 따로 클래스 정의를 가지고 있지는 않습니다. 
        대신, 특정 속성및 속성값들을 가지고 객체를 생성하는 생성자 함수를 정의할 수 있습니다. 
        특정 자바스크립트 함수는 생성자로 사용 될 수 있습니다. 
        새로운 객체를 생성할려면 new연산자와 함께 생성자 함수를 사용해야 합니다. 
*/

/*
    하위 클래스와 상속
        클래스 기반의 언어에서는 클래스 정의를 통해 클래스들의 계층 구조를 생성할 수 있습니다. 
        클래스 정의에서, 이미 존재하는 클래스의 자식 클래스로 새로운 클래스를 생성할 수 있습니다. 
        자식 클래스는 부모 클래스의 모든 속성을 상속 받습니다. 
        예를 들면, 직원(Employee)클래스가 단지 이름과 부서라는 속성만을 가지고 
        관리자(Manager)클래스는 직원 클래스의 하위 클래스가되어 추가적으로 보고서(reports)라는 속성을 가진다고 가정했을 때, 
        이 경우, 관리자 클래스의 인스턴스는 이름, 부서 그리고 보고서라는 속성 모두를 가지게 됩니다.
        
        NOTE: 
            클래스 기반언어에서 상위 클래스와 하위 클래스간 상속을 구현할 경우 상위 클래스에서 private 접근 제한자로 정의된 속성은 하위 클래스로 상속되지 않습니다.
       
            자바스크립트는 프로토타입 객체와 생성자 함수를 결합하도록 허용함으로써 상속을 구현합니다. 
            그래서 정확히 직원-관리자의 예제를 만들 수 있습니다. 
            다만 약간 다른 용어를 사용하게 됩니다. 
            먼저 직원 이름과 부서 속성을 지정하는 생성자 함수를 정의를 해야합니다. 
            다음으로 직원 생성자를 호출하고 보고서 속성을 지정하는 관리자 생성자 함수를 정의를 합니다. 
            마지막으로 Employee.prototype로부터 유래된 새로운 객체를 관리자 생성자 함수에 대한 속성으로 할당합니다. 
            그런 후 관리자를 생성할 때, 생성한 관리자 객체는 직원 객체로부터 이름과 부서 속성들을 상속받게 됩니다. 
*/

/*
    속성의 추가 삭제
        클래스 기반의 언어들에서는, 일반적으로 컴파일 시점에 클래스를 생성한 후에 컴파일 시점 혹은 실행 시에 해당 클래스의 인스턴스를 생성합니다. 
        클래스가 한번 정의된 후에 클래스를 다시 컴파일 하지 않는다면, 속성의 갯수나 형식을 변경할 수 없습니다. 
        하지만 자바스크립트에서느 실행 시에 객체의 속성을 추가 혹은 삭제 할 수 있습니다.  
        만약 객체군의 프로토타입으로 사용되는 객체에 속성을 추가하면, 프로토타입이 되는 객체들에도 새로운 속성이 추가가 됩니다.
*/

/*
    차이점들에 대한 정리

        클래스 기반(자바)
            1. 클래스와 인스턴스는 별개
            2. 클래스 정의를 가지고 클래스를 생성하고 생성자 메서드로 인스턴스를 생성합니다.
            3. new 연산자로 하나의 객체(인스턴스)를 생성합니다.
            4. 이미 존재하는 클래스에 대한 하위 클래스를 정의함으로써 객체의 계층구조를 생성합니다.
            5. 클래스의 상속 구조에 따라 속성을 상속 받습니다.
            6. 클래스 정의는 모든 인스턴스의 모든 속성을 명시합니다. 실행시에 동적으로 속성을 추가할 수 없습니다.

        원형 기반(자바스크립트)
            1. 모든 객체는 다른 객체로부터 상속을 받습니다.
            2. 생성자 함수를 가지고 객체군을 정의 및 생성합니다.
            3. 동일합니다.
            4. 하나의 객체를 생성자 함수와 결합된 프로토타입에 할당함으로써 객체의 계층구조를 생성 합니다.
            5. 프로토타입 체인에 따라  속성을 상속 받습니다.
            6. 생성자 함수 혹은 프로토타입은 초기 속성들을 명시합니다. 개별 객체 혹은 전체 객체군에 동적으로 속성을 추가 삭제할 수 있습니다.
*/

/*
    직원예제: 설계도

                직원

        매니저         근로자
                
                판매자         엔지니어

        1. 직원(Employee) 객체는 빈 문자열을 기본값으로 가지는 이름 그리고 "일반(general)"을 기본 값으로 가지는 부서(dept)를 속성으로 가집니다.
        2. 관리자(Manager)객체는 직원 객체를 근간으로 하며, 직원 객체들을 포함하기 위한 빈 배열을 기본 값으로 하는 보고(reports)속성을 가지고 있습니다.
        3. 근로자(WorkerBee)객체 또한 직원 객체를 근간으로 하며, 문자열들을 포함하기 위한 빈 배열을 기본 값으로 하는 프로젝트(projects)속성을 가집니다.
        4. 영업사원(SalesPerson)객체 또한 직원 객체를 근간으로 하며, 100을 기본값으로 하는 할당량(quota)를 속성으로 가집니다. 
           또한 같은 부서내의 모든 영업사원을 지칭하기 위한 부서 속성을 "판매부서"로 재정의 합니다. 
        5. 엔지니어(Engineer)객체도 직원 객체를 근간으로 하며, 빈 문자열을 기본값으로 가지는 장비(machine) 속성을 가집니다.
           그리고 엔지니어링(engineering)이라는 값으로 부서 속성을 재정의 합니다.
*/

/*
    계층 구조 생성
        직원 계층 구조를 구현하기 위한 적절한 생성자 함수를 정의하는 방법에는 여러가지가 있습니다. 
        개발하려고 하는 어플리케이션에 따라 생성자 함수를 정의 하는 방법은 달라질 수 있습니다. 

        이번 절에서는 상속을 구현하기 위한 간단한 (비교적 유연하지는 않은) 정의 방법을 보여 줄 것입니다. 
        이런 정의 방법을 사용하게되면, 객체를 생성할 때 어떤 속성 값도 지정을 할 수 없습니다. 
        새로이 생성된 객체들은 기본값들을 가지고 있으며, 나중에 해당 속성 값들을 변경할 수 있습니다.

        실제 어플리케이션에서는, 객체를 생성할때, 해당 객체가 가져야할 속성을 인자로 받는 생성자를 정의 할수 있습니다.(보다 자세한 사항은 다음을 참조하세요. More flexible constructors). 
        지금 당장은, 상속이 어떻게 작동하는지를 보여주기 위한 간단한 예제를 사용합니다. 

        다음의 자바와 자바스크립트로 작성된 직원 정의는 비슷합니다. 
        차이점은 자바언어에서는 개별 속성에 대한 타입(type)을 일일이 지정을 해야 하지만
        자바스크립트에서는 일일이 개별 속성에 대한 타입(type)을 지정할 필요가 없다는 것입니다.
        (이런 이유로 자바스크립트가 약하게 형식화된 언어로 불리는 반면 자바는 강력하게 형식화된 언어로 불립니다.)
*/
/*
    java
    public class Employee {
        public String name = "";
        public String dept = "general";
    }
*/
function Employee() {
    this.name = "";
    this.dept = "general";
}
/*
    관리자와 근로자 정의는 계층 구조상에서 상위에 위치하는 객체를 어떻게 표시하는지에 대한 차이점을 보여 줍니다. 
    자바스크립트에서는 생성자 함수 정의 이후에 언제든 생성자 함수의 프로토타입(prototype) 속성의 값으로 프로토타입 인스턴스를 추가할 수 있습니다.  
    자바에서는 클래스 정의에 상위 클래스를 명시해야 합니다. 클래스 정의 이후에는 상위 클래스를 변경할 수 없습니다.
*/

/*
    java
    public class Manager extends Employee {
        public Employee[] reports = new Employee[0];
    }

    public class WorkerBee extends Employee {
        public String[] projects = new String[0];
    }
    상속 받았음을 명시적으로 표현해주고 new로 생성 해야함 
*/

function Manager() {
    Employee.call(this);
    this.reports = [];
}

Manager.prototype = Object.create(Employee.prototype);
  
function WorkerBee() {
    Employee.call(this);
    this.projects = [];
}

WorkerBee.prototype = Object.create(Employee.prototype);
/*
    엔지니어와 영업사원 정의들은 객체들을 생성합니다. 
    생성된 객체는 근로자 객체의 하위 객체이고 따라서 직원 객체의 하위 객체가 됩니다. 
    상속 관계에 따라 엔지니어와 영업사원 객체들은 근로자와 직원객체의 속성을 가지게 됩니다. 
    게다가, 상속받은 부서 속성은 엔지니어와 영업사원에서 재정되어 새로운 값을 가지게 됩니다. 
*/

/*
    Java
    public class SalesPerson extends WorkerBee {
        public double quota;
        public dept = "sales";
        public quota = 100.0;
    }


    public class Engineer extends WorkerBee {
        public String machine;
        public dept = "engineering";
        public machine = "";
    }
*/
function SalesPerson() {
   WorkerBee.call(this);
   this.dept = "sales";
   this.quota = 100;
}
SalesPerson.prototype = Object.create(WorkerBee.prototype);

function Engineer() {
   WorkerBee.call(this);
   this.dept = "engineering";
   this.machine = "";
}
Engineer.prototype = Object.create(WorkerBee.prototype);

/*
    이런 정의 방법을 통해, 기본값을 가지는 각각의 속성을 포함하는 객체의 인스턴스를 생성할 수 있습니다. 
    다음 그림은 새로운 객체를 생성하고 새로운 객체에 대한 속성값들을 보여 표시하기 위한 자바스크립트의 정의들을 보여 줍니다.

    note: 
        클래스 기반 언어들에서 인스턴스라는 용어는 특정한 기술적 의미를 가지고 있습니다. 
        이러한 언어들에서, 하나의 인스턴스란 하나의 클래스의 개별적인 실체이며 클래스와는 근본적으로 다릅니다. 
        자바스크립트에서는 클래스와 인스턴스 간의 차이가 없기 때문에, "인스턴스"가 이런 기술적 의미를 갖지 않습니다. 
        하지만, 자바스크립트에 대해서 얘기하자면, 비공식적으로 "인스턴스"는 특정한 생성자 함수를 이용하여 생성된 오브젝트를 의미합니다. 
        그래서 이번 예제에서는 jane이  Engineer 의 인스턴스라고 할 수 있습니다. 
        이와 유사하게, 부모, 자식, 상위, 하위의 용어들은 자바스크립트에서 공식적인 의미를 갖지 않습니다; 
        다만 프로토타입 체인 상의 상위 또는 하위 객체를 지칭하기 위해서 비공식적으로 사용할 수 있습니다.
*/
var jim = new Employee; // Employee {name: "", dept: "general"}
var sally = new Manager;    // Manager {name: "", dept: "general", reports: Array(0)}
var mark = new WorkerBee;   // WorkerBee {name: "", dept: "general", projects: Array(0)}
var fred = new SalesPerson; // SalesPerson {name: "", dept: "sales", projects: Array(0), quota: 100}
var jane = new Engineer;    // Engineer {name: "", dept: "engineering", projects: Array(0), machine: ""}
// 위의 도면과 같이 설계된 계층 구조를 확인 할수 있다.

// 중간 코드 합산 - 내가 이해한 방식
function Employee(name) {
    this.name = name;
    this.dept = "general";
}

function Manager() {
    Employee.call(this);
    this.reports = [];
  }
  Manager.prototype = Object.create(Employee.prototype);
  
  function WorkerBee() {
    Employee.call(this);
    this.projects = [];
  }
  WorkerBee.prototype = Object.create(Employee.prototype);

  function SalesPerson() {
    WorkerBee.call(this);
    this.dept = "sales";
    this.quota = 100;
 }
 SalesPerson.prototype = Object.create(WorkerBee.prototype);
 
 function Engineer() {
    WorkerBee.call(this);
    this.dept = "engineering";
    this.machine = "";
 }
 Engineer.prototype = Object.create(WorkerBee.prototype);

 var jim = new Employee;
 var sally = new Manager;
 var mark = new WorkerBee;
 var fred = new SalesPerson;
 var jane = new Engineer;

 /*
    객체 속성들 : 이번 장에서는 객체가 프로토타입체인 상의 다른 객체로부터 특성을 상속받는 방법과 런타임 상에서 프로퍼티를 추가하면 무슨 일이 일어나는 지 살펴봅니다.
 */

 // 속성상속
 var mark = new WorkerBee;
 /*
    new 연산자를 만나면, 자바스크립트는 새로운 일반 객체를 생성하고 암묵적으로 내부의 [[Prototype]](__proto__) 속성의 값을 WorkerBee.prototype 의 값으로 할당하며, 
    해당 객체를 this 키워드의 값으로써 생성자 함수 WorkerBee에 전달합니다. 
    내부의 [[Prototype]] 속성은 속성값을 반환하기 위해 사용할 프로토타입 체인을 결정합니다. 
    이런 속성들이 할당되면, 자바스크립트는 새 객체를 반환하고, 할당 구문에 의해 변수 mark를 객체에 할당합니다.

    이러한 절차는 mark가 프로토타입 체인으로부터 상속받는 속성의 값을 mark 객체 내부에(local values) 명시적으로 부여하진 않습니다. 
    당신이 속성의 값을 요청하면, 자바스크립트는 먼저 해당 객체에 값이 존재하는지 확인합니다. 존재한다면, 해당 값이 반환됩니다. 
    만약 해당 객체에 값이 없다면, 프로토타입 체인을 (내장 [[Prototype]] 속성;__proto__을 이용하여)확인합니다. 
    체인 상의 어떤 객체가 해당 속성의 값을 가지고 있다면 그 값이 반환됩니다. 
    그런 속성이 발견되지 않는다면, 자바스크립트는 객체가 속성을 가지고있지 않다고 할 것입니다. 
    이런 식으로, mark 객체는 다음의 속성과 값을 가집니다.
 */
mark.name = "";
mark.dept = "general";
mark.projects = [];
/*
    mark 객체는 mark.__proto__로 연결되어 있는 원형의 객체로부터 이름(name)과 부서(dept)에 대한 값을 상속 받습니다. 
    근로자(WorkerBee) 생성자로부터 projects속성에 대한 값을 할당을 받습니다.
    이것들이 자바스크립트내에서 속성과 속성 값의 상속입니다. 
    이런 과정의 몇몇 세부 사항들은 Property inheritance revisited에서 다룹니다. 

    이런 생성자들은 당신이 직접 인스턴스에만 해당 하는 값을 설정하도록 하지 않기때문에, 객체에 대한 이런 정보들은 일반적으로 적용됩니다. 
    근로자(WorkerBee)로부터 생성된 모든 새로운 객체들은 기본값이 적용된 속성 값들을 가지게 됩니다. 
    물론, 속성 값들을 변경할 수 있습니다. 
    아래처럼 특정 인스턴스에만 해당하는 값을 설정할 수 있습니다. 
*/
mark.name = "Doe, Mark";
mark.dept = "admin";
mark.projects = ["navigator"];
// 최종적으로 나온 인스턴스에서만 값이 설정되게 함 유효!!!

/*
    자바스크립트에선, 실행 시점에 특정 객체에 속성들을 추가 할 수 있습니다.
    생성자 함수가 제공하는 속성외에 다른 속성을 추가할 수 있습니다. 
    특정 단일 객체에 속성을 추가하기 위해선, 다음과 같이 해당 객체에 값을 할당 하면 됩니다:
*/
mark.bonus = 3000;
/*
    mark 객체에만 보너스 속성이 추가 된다.
    
    만약 생성자 함수의 원형으로 사용되는 객체에 새로운 속성을 추가한다면,
    해당 프로토타입 객체(prototype)의 속성을 상속받는 모든 객체에 해당 속성이 추가됩니다. 
    예를 들면, 전문분야(specialty)속성을 모든 직원 객체에 다음과 같은 구문으로 추가할 수 있습니다:
*/
Employee.prototype.specialty = "none";
/*
    위의 구문을 실행한 직후, mark객체는 "none"이라는 값을 가지는 전문분야(specialty)속성을 가지게 됩니다.
    아래의 그림들은 해당 속성을 추가한 후 엔지니어(Engineer) 프로토타입에 대해 해당 속성을 재정의 했을 경우 각 객체에 미치는 영향을 보여줍니다.
    
    prototype을 이용해서 공통의 관계를 구성할수 있다. 
*/
// 중간 코드 합산
function Employee(name) {
    this.name = name;
    this.dept = "general";
}
Employee.prototype.specialty = "none";

function Manager() {
    Employee.call(this);
    this.reports = [];
}
Manager.prototype = Object.create(Employee.prototype);
  
function WorkerBee() {
    Employee.call(this);
    this.projects = [];
}
WorkerBee.prototype = Object.create(Employee.prototype);

function SalesPerson() {
    WorkerBee.call(this);
    this.dept = "sales";
    this.quota = 100;
}
SalesPerson.prototype = Object.create(WorkerBee.prototype);
 
function Engineer() {
    WorkerBee.call(this);
    this.dept = "engineering";
    this.machine = "";
}
Engineer.prototype = Object.create(WorkerBee.prototype);

var mark = new WorkerBee;
mark;    // WorkerBee {name: undefined, dept: "general", projects: Array(0)}
mark.name = "Mark"
mark;   // WorkerBee {name: "Mark", dept: "general", projects: Array(0)}
mark.projects = ["마크의 프로젝트는 뭘까?"];
mark; // WorkerBee {name: "Mark", dept: "general", projects: Array(1)}
mark.specialty = "전문분야는 있을까?";
mark;   // WorkerBee {name: "Mark", dept: "general", projects: Array(1), specialty: "전문분야는 있을까?"}

/*
    좀 더 유연한 생성자들

        지금까지 살펴 본 생성자 함수들은 인스턴스를 생성하면서 동시에 속성값을 지정할 수 없었습니다. 
        자바의 경우, 인스턴스를 생성 시 생성자에 인자들을 넘겨주어 인스턴스의 속성들을 초기화 할 수 있습니다. 
        다음의 표는 자바와 자바스크립트 각각의 생성자와 객체에 대한 정의를 보여 줍니다. 
*/
/*
    Java
    public class Employee {
        public String name;
        public String dept;
        public Employee () {
            this("", "general");
        }
        public Employee (String name) {
            this(name, "general");
        }
        public Employee (String name, String dept) {
            this.name = name;
            this.dept = dept;
        }
    }
*/
function Employee (name, dept) {
    this.name = name || "";
    this.dept = dept || "general";
}

/*
    public class WorkerBee extends Employee {
        public String[] projects;
        public WorkerBee () {
            this(new String[0]);
        }
        public WorkerBee (String[] projs) {
            projects = projs;
        }
    }    
*/
function WorkerBee (projs) {
    this.projects = projs || [];
}
WorkerBee.prototype = new Employee;

/*
    Java
    public class Engineer extends WorkerBee {
        public String machine;
        public Engineer () {
            dept = "engineering";
            machine = "";
        }
        public Engineer (String mach) {
            dept = "engineering";
            machine = mach;
        }
    }
*/
function Engineer (mach) {
    this.dept = "engineering";
    this.machine = mach || "";
 }
 Engineer.prototype = new WorkerBee;

 // 자바스크립트의 속성값을 설정하는 방법은 기본값을 설정하기 위한 관용구를 사용합니다.
 this.name = name || "";
 /*
    자바스크립트의 OR 논리 연산자(||) 첫번째 인자를 평가합니다. 
    첫번째 인자가 참이면 첫번째 인자를 반환하고 그렇지 않은 경우는 두번째 인자를 반환합니다. 
    그러므로, 위의 코드는 name인자가 name 속성에 사용 가능한 값을 가지고 있는지 확인합니다. 
    확인 결과 name속성에 사용가능한 값을 가지고 있을 경우, 해당 값을 this.name에 설정하게 됩니다. 
    반대로 그렇지 않은 경우는 빈 문자열을 this.name에 설정합니다.얼핏 보면 헛갈리지만 보다 짧은 관용구를 사용하였습니다.
 */

 // 중간 코드 합산
 function Employee (name, dept) {
    this.name = name || "";
    this.dept = dept || "general";
}

function WorkerBee (projs) {
    this.projects = projs || [];
}
WorkerBee.prototype = new Employee;

function Engineer (mach) {
    this.dept = "engineering";
    this.machine = mach || "";
 }
 Engineer.prototype = new WorkerBee;

 var jane = new Engineer("belau");
 jane;  // Engineer {dept: "engineering", machine: "belau"}
 /*
    위와 같은 코드 구문으로는 name과 같이 상속받은 속성에 대한 초기값을 지정할 수 없습니다.
    만약 상속 받은 속성의 초기값을 설정하고자 한다면, 생성자 함수의 코드를 변경해야 합니다.
    
    지금까지, 원형 객체를 생성한 후, 그 새로운 객체 자신의 속성과 속성 값을 지정하는 것을 살펴 보았습니다. 
    프로토타입 체인상에서 해당 생성자가 상위 객체에 대한 생성자를 직접 호출 함으로써 더 많은 속성을 추가하도록 할 수 있습니다.
 */

 // 상세하게 생성자 내에서 속성들을 정의하는 것
 function Employee (name, dept) {
    this.name = name || "";
    this.dept = dept || "general";
}

function WorkerBee (name, dept, projs) {
    this.base = Employee;
    this.base(name, dept);
    this.projects = projs || [];
}
WorkerBee.prototype = new Employee;

function Engineer (name, projs, mach) {
    this.base = WorkerBee;
    this.base(name, "engineering", projs);
    this.machine = mach || "";
}
Engineer.prototype = new WorkerBee;

var jane = new Engineer("Doe, Jane", ["navigator", "javascript"], "belau");
jane; // Engineer {projects: "Doe, Jane", machine: "belau", base: ƒ}

/*
    다음과 같은 순서에 따라 객체를 생성하고 속성을 정의
        1. new 연산자는 프로토타입 객체를 생성하고 생성된 객체의 __proto__속성을 Engineer.prototype으로 설정합니다.

        2. new 연산자는 새로이 생성된 객체를 엔지니어(Engineer)생성자에 this 키워드의 값으로 전달합니다.
        
        3. 생성자는 생성한 객체에 대한 base라는 새로운 속성을 생성하고 근로자(WorkerBee) 생성자의 값을 base 속성에 할당합니다. 
           이런 과정은 근로자(WorkerBee) 생성자를 엔지니어(Engineer)객체의 메서드로 만듭니다. 
           base 속성의 이름은 그리 특별하지 않습니다. 
           다른 어떤 속성명을 사용해도 무방합니다.
           base 속성명은 단지 해당 속성의 목적을 환기시키기 위한 것입니다.
        
        4. 생성자는 base 메서드에 필요한 인자들 ("Doe, Jane" and ["navigator", "javascript"])을 주어 호출합니다.
           명시적으로 생성자에서 사용한 "engineering"은 모든 엔지니어(Engineer)객체들이 상속받은 부서 속성에 대한 동일한 값을 가지며, 
           직원(Employee)으로부터 상속받은 값을 재정의 하는 것을 나타냅니다.
        
        5. base가 엔지니어(Engineer)의 메서드이기때문에 base메서드 내에서 this키워드를 스텝1에서 생성한 객체를 지칭하도록 해줍니다. 
           따라서, 근로자(WorkerBee) 함수는 차례대로 "Doe, Jane"과 "engineering" 인자를 직원(Employee)생성자에 전달합니다. 
           직원(Employee)생성자로부터 반환 시, 근로자(WorkerBee)함수는 남은 인자들을 프로젝트(projects)속성을 설정하기 위해 사용합니다. 

        6. base메서드로부터 반환 시, 엔지니어(Engineer) 생성자는 해당 객체의 장비(machine)속성을 "belau"로 초기화 합니다.

        7. 생성자로부터 반환 시, 새롭게 생성된 객체를 jane변수에 할당 합니다.
    
    엔지니어(Engineer) 생성자내에서 근로자()WorkerBee생성자를 호출하면, 엔지니어(Engineer)에 대한 상송을 적절하게 설정할 수 도 있을 것이라고 생각할 수 있을 것입니다.
    하지만 그렇지 않습니다.
    근로자(WorkerBee)생성자를 호출하는 것은 엔지니어(Engineer)객체로 하여금 호출되는 모든 생성자 함수내에서 열거된 속성들을 가지고도록 보장합니다.
    그러나, 나중에 직원(Employee)혹은 근로자(WorkerBee) 원형에 속성을 추가한다면, 
    엔지니어(Engineer)객체에 의해 추가된 속성들은 상속이 되지 않습니다. 
    예를 들어, 아래와 같은 구문을 작성하였다고 가정합니다:
*/
function Employee (name, dept) {
    this.name = name || "";
    this.dept = dept || "general";
}

function WorkerBee (name, dept, projs) {
    this.base = Employee;
    this.base(name, dept);
    this.projects = projs || [];
}
WorkerBee.prototype = new Employee;

function Engineer (name, projs, mach) {
    this.base = WorkerBee;
    this.base(name, "engineering", projs);
    this.machine = mach || "";
}

var jane = new Engineer("Doe, Jane", ["navigator", "javascript"], "belau");
Employee.prototype.specialty = "none";
jane.specialty;   // undefined
// jane객체는 전문분야(specialty)속성을 상속받지 않습니다.

function Engineer (name, projs, mach) {
    this.base = WorkerBee;
    this.base(name, "engineering", projs);
    this.machine = mach || "";
}
Engineer.prototype = new WorkerBee;
var jane = new Engineer("Doe, Jane", ["navigator", "javascript"], "belau");
Employee.prototype.specialty = "none";
jane;
// jane객체의 전문분야(specialty)속성은 "none"이 되었습니다.

// call() 혹은 apply() 메서드를 사용는 것은 상속을 구현하는 또 다른 방법입니다.
function Employee (name, dept) {
    this.name = name || "";
    this.dept = dept || "general";
}

function WorkerBee (name, dept, projs) {
    this.base = Employee;
    this.base(name, dept);
    this.projects = projs || [];
}
WorkerBee.prototype = new Employee;

function Engineer (name, projs, mach) {
  WorkerBee.call(this, name, "engineering", projs);
  this.machine = mach || "";
}
var jane = new Engineer("Doe, Jane", ["navigator", "javascript"], "belau");
jane;   // Engineer {name: "Doe, Jane", dept: "engineering", projects: Array(2), machine: "belau", base: ƒ}

/*
    속성 상속의 재고
        이전 절에서 자바스크립트의 생성자와 원형(prototype)이 어떤 방식으로 상속과 객체의 계층 구조를 제공하는지를 살펴 보았습니다. 
        이번장에서는 이전 절에서 반드시 명백하게 짚고 넘어가지 않은 일부 미묘한 점들에 대해 살펴보겠습니다.
*/

/*
    객체 자신의 값과 상속받은 값
        1. 해당 속성에 대한 객체 자신의 값이 있는지 확인하고 있으면 그 값을 반환한다.
        2. 객체 자신의 값이 없으면 __proto__ 속성을 사용하여 프로토타입 체인을 확인한다.
        3. 프로토타입 체인상의 특정 객체가 해당 속성에 대한 값을 가지고 있다면 해당 객체의 값을 반환한다.
        4. 해당 속성을 가진 어떤 객체도 발견하지 못하면 해당 객체는 그 속성을 가지고 있지 않은 것으로 판단한다.
    
    이런 단계들의 결과는 생성자 및 프로토타입 체인등의 것들을 어떻게 정의 하느냐에 따라 달라집니다. 
*/
function Employee () {
    this.name = "";
    this.dept = "general";
}
  
  function WorkerBee () {
    this.projects = [];
}
WorkerBee.prototype = new Employee;
// amy라는 근로자(WorkerBee)인스턴스를 아래와 같이 생성하였다고 가정
var amy = new WorkerBee;

/*
    amy객체는 프로젝트라는 자신만의 속성을 가집니다.
    이름과 부서 속성들은 amy 자신의 속성이 아닌 amy객체의 __proto__속성을 통해 가지고 온 속성들입니다. 
    따라서 amy는 이런 속성들의 값을 가지게 됩니다.
*/
amy;    //   WorkerBee {projects: Array(0)}
amy.name == "";             // true => Employee가 가짐 __proto__
amy.dept == "general";      // true => Employee가 가짐 __proto__
amy.projects == [];         // true => WokreeBee가 가짐

// 직원(Employee)과 연관되어 있는 프로토타입내의 이름 속성의 값을 아래와 같이 변경하였다고 가정
Employee.prototype.name = "Unknown";
amy.name === "Unkown";  // false
/*
    얼핏보기에, 새로운 값이 모든 직원 인스턴스에 적용이 될것으로 예상하겠지만 그렇지 않습니다. 

    직원 객체의 인스턴스를 생성할때, 해당 인스턴스는 이름 속성에 대해 자신이 가지고 있는 값(빈 문자열)을 취하게 됩니다.
    이것이 의미하는 것은 새로운 직원 객체를 생성하여 근로자(WorkerBee)의 프로토타입에 설정을 할때, 
    WorkerBee.prototype이 이름 속성에 대한 자신만의 값을 가지고 있다는 것입니다.
    그러므로, amy객체(근로자 인스턴스)의 이름 속성에 대해 검색할때, WorkerBee.prototype내에서 이름 속성에 대한 amy 객체 자신의 값을 찾게됩니다. 
    그렇기때문에 Employee.prototype까지의 프로토타입 체인을 검색하지 않게 됩니다.
*/
/*
    실행시에 객체의 속성 값을 변경하고 새로운 값이 모든 하위 객체들에게도 적용되도록 할려면, 객체의 생성자함수에서는 속성을 정의할 수 없습니다. 
    대신에, 생성자와 연결된 프로토타입에 추가할 수 있습니다. 예를 들어, 이전의 코드를 아래와 같이 변경하였다고 가정합니다:
*/
function Employee () {
    this.dept = "general";
}
Employee.prototype.name = "";

function WorkerBee () {
    this.projects = [];
}
WorkerBee.prototype = new Employee;

var amy = new WorkerBee;

Employee.prototype.name = "Unknown";
amy.name === "Unknown";     // true;
/*
    이 경우 amy 객체의 이름 속성의 값은 "Unknown"이 됩니다.

    위의 예제에서처럼, 객체 생성 시에 객체의 속성에 대한 기본 값을 설정하고 실행 시에 해당 속성의 값을 변경하기를 원한다면, 
    해당 속성들을 생성자 함수 자체안에가 아닌 생성자의 프로토타입에 설정 하여야 합니다
*/

/*
    인스턴스 관계 결정
        자바스크립트에서의 속성 검색은 객체 자신의 속성들을 먼저 살펴보고 해당 속성명을 찾지 못할 경우, 
        객체의 특별한 속성인 __proto__내에서 찾게 됩니다. 
        이런 검색은 재귀적으로 진행되며, 이런 과정을 "프로토타입 체인에서의 검색"이라고 합니다.
    
        특별한 속성인 __proto__객체가 생성이 될때 설정이 됩니다. 
        __proto__속성은 생성자의 프로토타입 속성의 값으로 설정이 됩니다.
        따라서 new Foo() 표현식은 __proto__ == Foo.prototype인 객체를 생성합니다. 
        결과적으로 Foo.prototype의 속성들에 대한 변경은 new Foo() 표현식으로 생성한 모든 객체에 대한 속성 검색을 변경하게 됩니다.

        모든 객체는 __proto__라는 객체 속성을 가집니다.(예외: Object). 모든 함수들은 prototype이라는 객체 속성을 가집니다.
        따라서 객체들은 '프로토타입 상속'에 의해 다른 객체들과의 관계를 가지게 됩니다.
        객체의 __proto__속성과 함수의 prototype 객체를 비교하여 상속을 테스트 해볼 수 있습니다. 
        자바스크립트는 특정 객체가 함수 prototype으로부터 상속 받는 객체일 경우 참(true)를 반환하는  instanceof라는 연산자를 제공합니다. 예를 들면,
*/
function Foo(){
    this.name = "생성자 함수입니다.";
}
var f = new Foo();
var isTrue = (f instanceof Foo);

//
function Employee (name, dept) {
    this.name = name || "";
    this.dept = dept || "general";
}

function WorkerBee (name, dept, projs) {
    this.base = Employee;
    this.base(name, dept);
    this.projects = projs || [];
}
WorkerBee.prototype = new Employee;

function Engineer (name, projs, mach) {
  WorkerBee.call(this, name, "engineering", projs);
  this.machine = mach || "";
}
Engineer.prototype = new WorkerBee;
var chris = new Engineer("Pigman, Chris", ["jsd"], "fiji");

chris.__proto__ === Engineer.prototype;                                 // true
chris.__proto__.__proto__ === WorkerBee.prototype;                      // true
chris.__proto__.__proto__.__proto__ === Employee.prototype;             // true
chris.__proto__.__proto__.__proto__.__proto__ === Object.prototype;     // true
chris.__proto__.__proto__.__proto__.__proto__.__proto__ === null;       // true

// 주어진 이런 상황에서, instanceOf를 다음과 같이 직접 작성할 수 있을 것입니다:
function instanceOf(object, constructor) {
    object = object.__proto__;
    while(object !== null) {
        if(object === constructor.prototype) return true;
        if(typeof object === 'xml') return constructor.prototype === XML.prototype;
        object = object.__proto__;
    }
    return false;
}
instanceOf(chris, Engineer);
instanceOf(chris, WorkerBee);
instanceOf(chris, Employee);
instanceOf(chris, Object);
// all true;
instanceOf(chris, Math.pow());  // false
/*
    note:
    위의 구현내용은 최신 버전의 자바스크립트에서 XML객체들이 표현되는 방법의 특질을 해결하기 위해 해당 객체의 타입이 "xml"인지 확인합니다. 핵심적인 세부 사항을 확인하려면 bug 634150를 참조하세요.
*/

/*
    생성자내에서의 전역정보
        생성자를 생성할때, 생성자내에서 전역 정보를 설정할 경우, 주의를 해야 합니다. 
        예를 들어, 각각의 새로운 직원에게 자동으로 고유한 ID값을 할당하기를 원한다고 했을 때, 
        다음과 같은 직원(Employee) 정의를 사용할 수 있을 것입니다:
*/
var idCounter = 1;

function Employee (name, dept) {
   this.name = name || "";
   this.dept = dept || "general";
   this.id = idCounter++;
}
var victoria = new Employee("Pigbert, Victoria", "pubs");
var harry = new Employee("Tschopik, Harry", "sales");
victoria;   // Employee {name: "Pigbert, Victoria", dept: "pubs", id: 1}
harry;  // Employee {name: "Tschopik, Harry", dept: "sales", id: 2}
/*
    얼핏보면 괜찮아 보입니다. 하지만 이유를 불문하고 직원 객체가 생성될때마다 idCounter는 증가분을 가지게 됩니다.
    이번장에서 나온 예제에서처럼 전체 직원 객체의 계층 구조를 생성하였다면, 
    프로토타입을 설정할때마다 직원 생성자는 매번 호출 됩니다.
    다음과 같은 코드를 작성하였다고 가정합니다:
*/
var idCounter = 1;

function Employee (name, dept) {
   this.name = name || "";
   this.dept = dept || "general";
   this.id = idCounter++;
}

function Manager (name, dept, reports) {
    this.base = Employee;
    this.base(name, dept);
    this.reports = reports || '';
}
Manager.prototype = new Employee;

function WorkerBee (name, dept, projs) {
    this.base = Employee;
    this.base(name, dept);
    this.projects = projs || [];

}
WorkerBee.prototype = new Employee;

function Engineer (name, projs, mach) {
    this.base = WorkerBee;
    this.base(name, "Engineer", projs);
    this.machine = mach || "default";
}
Engineer.prototype = new WorkerBee;

function SalesPerson (name, projs, quota) {
    this.base = WorkerBee;
    this.base(name, "Sales", quota);
    this.quota = quota || 10;
}
SalesPerson.prototype = new WorkerBee;

var mac = new Engineer("Wood, Mac", ['a', 'b'], "machineA");
mac;    // Engineer {name: "Wood, Mac", dept: "Engineer", id: 5, projects: Array(0), base: ƒ, …}
// 여기서 생략된 정의가 base속성을 가지고 해당 생성자를 프로토타입 체인내의 상위 생성자들을 호출한닥고 좀 더 가정하면, 이런 경우, 생성된 mac객체의 id값은 5가 됩니다.

/*
    어플리케이셔네 따라, 카운터가 이렇게 추가적으로 증가된 것은 문제가 될 수도 그렇지 않을 수 도 있습니다. 
    카운터에 정확한 값이 설정되기를 원한다면, 사용가능한 해결적은 아래와 같은 생성자를 대신 사용하는 것입니다:
*/
var idCounter = 1;

function Employee (name, dept) {
    this.name = name || "";
    this.dept = dept || "general";
    if (name) this.id = idCounter++;
}

function Manager (name, dept, reports) {
    this.base = Employee;
    this.base(name, dept);
    this.reports = reports || '';
}
Manager.prototype = new Employee;

function WorkerBee (name, dept, projs) {
    this.base = Employee;
    this.base(name, dept);
    this.projects = projs || [];

}
WorkerBee.prototype = new Employee;

function Engineer (name, projs, mach) {
    this.base = WorkerBee;
    this.base(name, "Engineer", projs);
    this.machine = mach || "default";
}
Engineer.prototype = new WorkerBee;

function SalesPerson (name, projs, quota) {
    this.base = WorkerBee;
    this.base(name, "Sales", quota);
    this.quota = quota || 10;
}
SalesPerson.prototype = new WorkerBee;

var mac = new SalesPerson("Wood, Mac", ["projectNo1", "projectNo2"], 100);
mac;    // SalesPerson {name: "Wood, Mac", dept: "Sales", id: 1, projects: 100, base: ƒ, …}
var mac2 = new Engineer ("이름이 뭐니", ["프로젝트 안할래", "프로젝트너나해"], "머신너가져");
mac2;   // Engineer {name: "이름이 뭐니", dept: "Engineer", id: 2, projects: Array(2), base: ƒ, …}
/*
    prototype으로 사용할 직원 인스턴스를 생성할 때, 생성자에 인자들을 주어선 안됩니다. 
    이 생성자 정의를 사용하여, 인자들을 주지 않을 경우, 생성자는 id에 값을 할당하지 않으며 카운터를 갱신하지 않습니다. 
    따라서, id값을 가지는 직원 객체에 대해, 반드시 해당 직원의 이름을 명시해야 합니다. 
    이 예제의 경우 mac인스턴스의 id값은 1이 됩니다.
*/

/*
    다중상속 금지
        몇몇 객체 지향언어들은 다중 상속을 허용합니다. 
        그것은, 관련이 없는 부모 객체들로 부터 속성들과 값들을 상속 받을 수 있는 것을 말합니다. 
        자바스크립트는 다중 상속을 지원하지 않습니다.

        속성 값의 상속은 속성에 대한 값을 찾기 위한 프로토타입 체인을 검색에 의해 실행 시점에 이루어 집니다. 
        하나의 객체는 오로지 하나의 결합된 prototype만을 가지기 때문에, 자바스크립트는 동적으로 하나 이상의 프로토타입 체인으로 부터 상속을 할 수 없습니다.

        자바스크립트에서, 하나 이상의 다른 생성자 함수를 호출하는 생성자를 사용할 수 있습니다. 
        이것은 다중 상속처럼 보여질 수 있습니다. 
        예를 들어, 다음과 같은 구문들을 살펴보세요:
*/
var idCounter = 1;

function Employee (name, dept) {
    this.name = name || "";
    this.dept = dept || "general";
    if (name) this.id = idCounter++;
}

function Manager (name, dept, reports) {
    this.base = Employee;
    this.base(name, dept);
    this.reports = reports || '';
}
Manager.prototype = new Employee;

function WorkerBee (name, dept, projs) {
    this.base = Employee;
    this.base(name, dept);
    this.projects = projs || [];

}
WorkerBee.prototype = new Employee;

function Hobbyist (hobby) {
    this.hobby = hobby || "scuba";
 }
 
 function Engineer (name, projs, mach, hobby) {
    this.base1 = WorkerBee;
    this.base1(name, "engineering", projs);
    this.base2 = Hobbyist;
    this.base2(hobby);
    this.machine = mach || "";
 }
 Engineer.prototype = new WorkerBee;
 
 var dennis = new Engineer("Doe, Dennis", ["collabra"], "hugo");
 dennis; // Engineer {name: "Doe, Dennis", dept: "engineering", id: 1, base1: ƒ, base: ƒ, …}
 dennis.name == "Doe, Dennis"
 dennis.dept == "engineering"
 dennis.projects == ["collabra"]
 dennis.machine == "hugo"
 dennis.hobby == "scuba"
 // all true
 // 얼핏보면 다중 상속으로 착각할수 있으나 dennis의 구조는 Engineer -> WorkerBee -> Employee -> Object 이다.
 // dennis객체는 Hobbyist 생성자로부터 취미(hobby)속성을 받아 오지 않습니다. 그런데,Hobbyist생성자의 프로토타입에 속성을 추가 했다고 가정하면 
 Hobbyist.prototype.equipment = ["mask", "fins", "regulator", "bcd"];
 // 객체는 새로이 추가된 속성을 상속받지 않습니다. 
 dennis.equipment;  // undefined

 // 필요한 상속을 쓰기, 다중상속을 구현하고 싶었지만 실패...
var idCounter = 1;
 
function Employee (name, dept) {
    this.name = name || "";
    this.dept = dept || "general";
    if (name) this.id = idCounter++;
}
function WorkerBee (name, dept, projs) {
    this.base = Employee;
    this.base(name, dept);
    this.projects = projs || [];
 
}
 WorkerBee.prototype = new Employee;
 
function Hobbyist (hobby) {
    this.hobby = hobby || "scuba";
}
Hobbyist.prototype = new Employee;

function Engineer (name, projs, mach, hobby) {
    this.base1 = WorkerBee;
    this.base1(name, "engineering", projs);
    this.base2 = Hobbyist;
    this.base2(hobby);
    this.machine = mach || "";
}
var inheritTest = function(parentName) {
    return Engineer.prototype = parentName;
}
//inheritTest(new Hobbyist);
inheritTest(new WorkerBee);
var dennis = new Engineer("Doe, Dennis", ["collabra"], "hugo");

Hobbyist.prototype.equipment = ["mask", "fins", "regulator", "bcd"];
dennis.equipment; // ["mask", "fins", "regulator", "bcd"]0: "mask"1: "fins"2: "regulator"3: "bcd"length: 4__proto__: Array(0)

WorkerBee.prototype.test = [123,123];
dennis.test;