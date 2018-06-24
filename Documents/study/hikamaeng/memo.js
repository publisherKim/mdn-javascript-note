/*
  4주차 리팩토링
  각각 하는 역활을 분리해서 클래스를 만들어서 인스턴스를 생성한다. 
  투두 앱의 경우 4가지의 클래스로 봄 (컴포짓 패턴)
  _getResult 재귀함수 호출로 계층간 탐색으로 원하는 결과를 가져온다.
  todo의 계층 구조
  Task
  TaskList
    - 돔 생서자의 잘못된 리스트 필터 정보를 리스트 객체에 알맞게 옮긴다.
  TaskITem
  DomRender
    - 필요한 돔 요소들을 만든다 (ex: input, button ..)
    - 이벤들을 바인딩 한다.
    - 자식의 아이템들을 추출하고 

  데이터는 무한하나 렌더는 확정문으로 그려져 있다. 
  반복되는 아이템마다 즉 뎁스의 깊이에 따라 렌더를 해야만 한다. (visitor 방문자)

  task 가 visitor를 받아들일수 있도록 operation 함수를 제작한다. (visitor인자는 필수)
  operation 사용은 render

  operatin 제작
  operation(visitor, sort, state){
    visitor.list(this);
    // 나머지 전체에 대해서 순환
    this.getResult(sort, state).children.forEach( ({item}) => item.operation(visitor, sort, state));
  }

  item의 operatin 제작
  operation(visitor, sort, state){
    visitor.item(this);
    visitor.startSub();
    this.getResult(sort, state).forEach( ({item}) => item.operation(visitor, sort, state) );
    visitor.endSub();
  }

  visitor 제작 
  const visitor = new Visitor(this, parent);
  this._list.operation(visitor, this._list.sort, true);

  const Visitor = class {
    constructor(render, el){
      this._renderer = renderer;
      this._parent = el;
      this._current = null;
    }
    list(taskList){
      // children 나오기 직전까지 그림
    }
    item(taskItem){
      
    }
    startSub(){

    }
    endSub(){
      
    }
  };

  객체간의 관계도와 속성 제대로 파악하고 있지 않다.
  
  todo를 이슈 체커로 쓰고 싶다 상태가 추가될 문제들
  값을 객체로 바꾸는 상태 패턴으로 리팩토링 한다.

  캡슐화와 모듈화를 위한 심플 팩토리 패턴이 존재한다
  ex:
    const TaskState = class {
      static addState(key, cls){
        const = new cls();
        if( !(v instaceof TaskState)) throw 'invalid cls';
        if( (TaskState._subClasses || (TaskState._subClasses = new Map())).has(key) ){
          throw 'exist key'
        }
        TaskState._subClasses.set(key, cls);
      }
      TaskState.addState
      static getState(type){
        return new TaskState._subClasses.get(type);
      }
    };

  상태를 추가할수 있는 객체를 만든다.
  상태가 필요한 아이템에 추가한다.
  option
    정렬
    가용 상태
  
  하위 클래스에
    addState('waiting')   // 대기
    addState('working')   // 작업중
    addState('cloned')    // 복사됨
    addState('cancled')   // 취소됨
    addState('resolved')  // 합쳐짐
  
    renderer에서 모든 행위들이 실현된
    const TaskCommander = class {
      constructor(task, method, ...param){
        this._task = task;
        this._method = method;
        this._param = param;
      }
      call(){}
    }
  
    [1,2]

    언어를 이해한것과 객제지향 방법을 이해하는것은 다르다
    방법론은 방벙론이고 
    언어의 특성에 맞게 작성해야 구현할 수 있다.
    
*/