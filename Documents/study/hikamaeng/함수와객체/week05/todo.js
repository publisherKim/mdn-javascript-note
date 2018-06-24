const TaskState = class {
  static addState(key, cls) {
    const v = new cls();
    if (!(v instanceof TaskState)) throw 'invalid cls';
    if ((TaskState._subClasses || (TaskState._subClasses = new Map())).has(key)) throw 'exist key';
    TaskState._subClasses.set(key, cls);
  }
  static getState(type) {
    return new (TaskState._subClasses.get(type));
  }
  isComplete() {
    throw 'must be overrided';
  }
  get order() {
    throw 'must be overrided';
  }
  stateList() {
    return Array.from(TaskState._subClasses.keys());
  }
  [Symbol.toPrimitive](hint) {
    for(const [k, cls] of TaskState._subClasses) {
      if (this instanceof cls) return k;
    }
  }
};
TaskState.addState('waiting', class extends TaskState {
  isComplete() { return false; }
  get order() { return 1; }
});
TaskState.addState('working', class extends TaskState {
  isComplete() { return false; }
  get order() { return 2; }
});
TaskState.addState('closed', class extends TaskState {
  isComplete() { return true; }
  get order() { return 3; }
});
TaskState.addState('canceled', class extends TaskState {
  isComplete() { return true; }
  get order() { return 4; }
});
TaskState.addState('resolved', class extends TaskState {
  isComplete() { return true; }
  get order() { return 5; }
});
const Listener = class {
  listen(type) {
    throw 'must be overrided';
  }
};
const Task = class extends Listener {
  static getTask(type, title) {
    switch(type){
      case 'item': return new TaskItem(title);
      case 'list': return new TaskList(title);
      default: throw 'invalid type';
    }
  }
  constructor() {
    super();
    this._list = [];
    this._listener = new Set();
  }
  _notify(type) {
    this._listener.forEach(v => v.listen(type));
  }
  addListener(listener) {
    this._listener.add(listener);
    return this;
  }
  removeListener(listener) {
    this._listener.delete(listener);
  }
  listen(type) {
    this._notify(type);
  }
  add(task) {
    this._list.push(task.addListener(this));
    this._notify('added');
  }
  remove(task) {
    const l = this._list;
    if (l.includes(task)) l.splice(l.indexOf(task), 1);
    task.removeListener(this);
    this._notify('removed');
  }
  getResult(sort, state) {
    const l = this._list;
    let result = [];
    if (state) result = [l.filter(v => !v.isComplete()), l.filter(v => v.isComplete())].reduce((p, c) => p.concat(c.sort(sort)), []);
    else result = [...l].sort(sort);
    return { 
      item: this._getResult(), 
      children: result.map(v => v.getResult(sort, state))
    };
  }
  _getResult() { throw 'must be overrided'; }
  save() {
    let v = JSON.stringify(this);
    v = v.substring(1, v.length - 1);
    v.replace(/\\(nt|t)?/g, '')
    return v;
  }
  restore(data) {
    const v = typeof data === 'string' ? JSON.parse(data) : data;
    this._list.length = 0;
    v.list.forEach(v => {
      this._list.push(Task.getTask(v.type, 'default').restore(v));
    });
    this._restore(v);
    this._notify('restore');
    return this;
  }
  _restore(){
    throw 'invalid type';
  }
};
const TaskItem = class extends Task {
  static title(a, b) {
    return a.sortTitle(b);
  }
  static date(a, b) {
    return a.sortDate(b);
  }
  static register(a, b) {
    return null;
  }
  static state(a, b) {
    return a.sortState(b);
  }
  constructor(title) {
    super();
  	this._title = title;
  	this._date = new Date();
    this._state = TaskState.getState('waiting');
  }
  _restore({title, date, state}){
    this._title = title;
    this._date = new Date(Date.parese(date));
    this._state = TaskState.getState(state);
  }
  toJSON(){
    return `{
      "type": "item",
      "title": "${this._title}",
      "date": "${this._date.toISOString()}",
      "state": "${this._state + ''}",
      "list": [${this._list.map(v => v.toJSON()).join('')}]
    }`;
  }
  get date() { 
    return this._date.toISOString(); // toJSON
  }
  get title() { 
    return this._title;
  }
  get state() {
    return this._state;
  }
  _getResult(sort, state) {
    return this;
  }
  isComplete() {
  	return this._state.isComplete();
  }
  setState(type) {
    this._state = TaskState.getState(type);
    this._notify('state');
  }
  sortTitle(task) {
  	return this._title > task._title;
  }
  sortDate(task) {
  	return this._date > task._date;
  }
  sortState(task) {
    return this._state.order > task._state.order;
  }
};
const TaskList = class extends Task {
  _restore({title, sort}){
    this._title = title;
    this.sort = sort;
  }
  constructor(title) {
    super();
  	this._title = title;
    this._sort = 'register';
  }
  toJSON(){
    return `{
      "type": "item",
      "title": "${this._title}",
      "date": "${this._sort}",
      "list": [${this._list.map(v => v.toJSON()).join('')}]
    }`;
  } 
  get title() { return this._title; }
  get sort() { 
    return this._sort; 
  }
  set sort(v) { 
    this._sort = v; 
    this._notify('sort');
  }
  _getResult(sort, state) {
  	return this._title;
  }
};
const Dr = class extends Listener {
  static el(type, ...attr) {
    const el = document.createElement(type);
    for (let i = 0; i < attr.length;) {
      const k = attr[i++], v = attr[i++];
      if (typeof el[k] === 'function') el[k].apply(el, Array.isArray(v) ? v : [v])
      else if(k[0] === '@') el.style[k.substr(1)] = v;
      else el[k] = v;
    }
    return el;
  }
  constructor(taskList, parent) {
    super();
    this._list = taskList;
    this._parent = parent;
    this._list.addListener(this);
  }
  listen(type) {
    this.render();
  }
  sort(s) {
    this._list.sort = s;
  }
  remove(parent, taskItem) {
    parent.remove(taskItem);
  }
  setState(taskItem, type) {
    taskItem.setState(type);
  }
  add(task, title) {
    task.add(new TaskItem(title));
  }
  render() { // throw
    const parent = document.querySelector(this._parent);
    parent.innerHTML = '';
    const visitor = new Visitor(this, parent);
    visitor.render(this._list, this._list.sort, true);
  }
};
const Visitor = class {
  constructor(renderer, el) {
    this._renderer = renderer;
    this._parent = el;
    this._current = null;
  }
  render(task, sort, state, parent) {
    const s = TaskItem[sort];
    switch (true) {
      case task instanceof TaskItem:
        this._item(task, parent);
        break;
      case task instanceof TaskList: 
        this._list(task);
        break;
    }
    this._startSub();
    task.getResult(s, state).children.forEach(
      ({ item }) => this.render(item, s, state, task)
    );
    this._endSub();
  }
  _list(taskList) {
    const r = this._renderer;
    [
      Dr.el('textarea', '@cssText', 'width:90px;height:300px', 'id', 'data'),
      Dr.el('h2', 'innerHTML', taskList.title),
      'register,state,title,date'.split(',').reduce((p, c) => { 
        p.appendChild(Dr.el('button', 'innerHTML', c, 
          'addEventListener', ['click', e => r.sort(c)]));
        return p;
      }, Dr.el('nav')),
      Dr.el('section', 
        'appendChild', Dr.el('button', 'innerHTML', 'save',
          'addEventListener', [
            'click', e => (document.getElementById('data').value = taskList.save())
        ]),
        'appendChild', Dr.el('button', 'innerHTML', 'save',
          'addEventListener', [
            'click', e => task.List.restore(document.getElementById('data').value = taskList.save())
        ]),
      ),
      Dr.el('section', 
        'appendChild', Dr.el('input', 'type', 'text'),
        'appendChild', Dr.el('button', 'innerHTML', 'add task',
          'addEventListener', [
            'click', e => r.add(taskList, e.target.previousSibling.value)
        ])
      )
    ].forEach(v => this._parent.appendChild(v));
    this._current = this._parent;
    this._current.color = 255;
  }
  _item(taskItem, parent) {
    const r = this._renderer;
    [
      Dr.el('h3', 'innerHTML', taskItem.title,
        '@textDecoration', taskItem.isComplete() ? 'line-though' : 'none'
      ),
      Dr.el('time', 'innerHTML', taskItem.date, 'dateTime', taskItem.date),
      taskItem.state.stateList().reduce((select, v) => {
        select.appendChild(Dr.el('option', 'value', v, 'innerHTML', v, 
          'selected', taskItem.state + '' == v ? true : false));
        return select;
      }, Dr.el('select')),
      Dr.el('button', 'innerHTML', 'change',
        'addEventListener', [
        'click', e => r.setState(taskItem, e.target.previousSibling.value)
      ]),
      Dr.el('button', 'innerHTML', 'remove',
        'addEventListener', [
        'click', e => r.remove(parent, taskItem)
      ]),
      Dr.el('input', 'type', 'text'), 
      Dr.el('button', 'innerHTML', 'add task',
        'addEventListener', [
        'click', e => r.add(taskItem, e.target.previousSibling.value)
      ])
    ].forEach(v => this._current.appendChild(v));
  }
  _startSub() {
    const c = parseInt(this._current.color, 10) - 25;
    this._current = this._current.appendChild(Dr.el('section', 
      'color', c,
      '@marginLeft', '15px',
      '@backgroundColor', `rgb(${c}, ${c}, ${c})`
    ));
  }
  _endSub() {
    this._current = this._current.parentNode;
  }
};
const todo = new Dr(new TaskList('list1'), '#todo');
todo.render();