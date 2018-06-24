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
  static getTask(id, type, title) {
    let task;
    Task._blockId = true;
    switch (type) {
      case 'item': task = new TaskItem(title); break;
      case 'list': task = new TaskList(title); break;
      default: throw 'invalid type';
    }
    Task._blockId = false;
    Task._instances.set(task._id = id, task);
    return task;
  }
  static getTaskById(id) {
    return Task._instances.get(id);
  }
  static restoreTask(saved) {
    const task = JSON.parse(saved);
    return Task.getTask(task.id, task.type, task.title).restore(task);
  }
  get id() { return this._id; }
  constructor() {
    super();
    //this._listener = new Set();
    if (Task._blockId) return;
    this._id = Date.now() + '-' + Math.random() * 1000000;
    Task._instances.set(this._id, this);
    this._extra = new Map();
  }
  getExtra(){
    return this._extra.get(key);
  }
  setExtra(key, valyue){
    if('function, object'.includes(typeof value)) return;
    this._extra.set(key, value);
  }
  toJSON() {
    return `{
      "id": "${this._id}",
      "list": [${this._list.map(v => v.toJSON()).join(',')}],
      "extra": ${JSON.stringify(this._extra)},
      ${this._toJSON()}
    }`;
  }
  _toJSON() {
    throw 'must be overrided';
  }
  _notify(type) {
    this._listener.forEach(v => v.listen(type));
  }
  addListener(listener) {
    if(!this.hasOwnProeperty('_listenner')) return;
    this._listener.add(listener);
    return this;
  }
  removeListener(listener) {
    if(!this.hasOwnProeperty('_listenner')) this._listenner = new Set();
    this._listener.delete(listener);
  }
  listen(type) {
    this._notify(type);
  }
  add(task, isNoNotify = false) {
    if (this.hasOwnProeperty('_list')) this._list = [];
    this._list.push(task.addListener(this));
    if (!isNoNotify) this._notify('added');
  }
  remove(task) {
    const l = this._list;
    if (l.includes(task)) l.splice(l.indexOf(task), 1);
    task.removeListener(this);
    Task._instances.delete(this._id);
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
    v = v.substring(1, v.length - 1)
    v = v.replace(/\\(n|t)?/g, '');
    return v;
  }
  restore(data) {
    const v = typeof data === 'string' ? JSON.parse(data) : data;
    Task._instances.delete(this._id);
    Task._instances.set(this._id = v.id, this);
    let i = this._list.length;
    while (i--) { this.remove(this._list[i]); }
    v.list.forEach(v => {
      this.add(Task.getTask(v.id, v.type, 'default').restore(v), true);
    });
    this._extra = v.extra;
    this._restore(v);
    this._notify('restore');
    return this;
  }
  _restore() { throw 'must be overrided'; }
};
Task._instances = new Map();
Task.prototype._list = Object.freeze([]);
Task.prototype._listener = new Set();

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
  _restore({ title, date, state }) {
    this._title = title;
    this._date = new Date(Date.parse(date));
    this._state = TaskState.getState(state);
  }
  _toJSON() {
    return `
      "type": "item",
      "title": "${this._title}",
      "date": "${this._date.toISOString()}",
      "state": "${this._state + ''}"`;
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
  constructor(title) {
    super();
  	this._title = title;
    this._sort = 'register';
  }
  _restore({ title, sort }) {
    this._title = title;
    this._sort = sort;
  }
  _toJSON() {
    return `
      "type": "list",
      "title": "${this._title}",
      "sort": "${this._sort}"`;
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
const TaskSave = class {
  constructor(task) {
    this._id = task.id;
    this._saved = task.save();
  }
  getTask() {
    return Task.getTaskById(this._id) || Task.restoreTask(this._saved);
  }
};
const TaskCommand = class {
  constructor(root, task, method, ...param) {
    this._root = root;
    this._task = new TaskSave(task);
    this._method = method;
    this._param = param.map(v => v instanceof Task ? new TaskSave(v) : v);
    this._undo = null;
  }
  run() {
    const task = this._task.getTask();
    const param = this._param.map(v => v instanceof TaskSave ? v.getTask() : v);
    this._undo = this._root.save();
    if (typeof task[this._method] === 'function') task[this._method](...param);
    else task[this._method] = param[0];
  }
  rollback() {
    this._root.restore(this._undo);
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
    this._commands = [];
    this._cursor = 0;
  }
  listen(type) {
    this.render();
  }
  sort(s) {
    this._cmd(new TaskCommand(this._list, this._list, 'sort', s)).run();
  }
  _cmd(cmd) {
    this._commands.length = this._cursor + 1;
    this._commands.push(cmd);
    this._cursor = this._commands.length - 1;
    return cmd;
  }
  undo() {
    if (!this._commands.length || this._cursor === 0) return;
    this._commands[this._cursor--].rollback();
  }
  redo() {
   if (!this._commands.length || this._cursor === this._commands.length - 1) return;
    const cmd = this._commands[++this._cursor];
    cmd.rollback();
    cmd.run();
  }
  remove(parent, taskItem) {
    this._cmd(new TaskCommand(this._list, parent, 'remove', taskItem)).run();
  }
  setState(taskItem, type) {
    this._cmd(new TaskCommand(this._list, taskItem, 'setState', type)).run();
  }
  add(task, title) {
    this._cmd(new TaskCommand(this._list, task, 'add', new TaskItem(title))).run();
  }
  render() { // throw
    const parent = document.querySelector(this._parent);
    parent.innerHTML = '';
    const visitor = new Visitor(this, parent);
    visitor.render(this._list, this._list.sort, true);
  }
};
const ItemDeco = class {
  constructor(){
    this._deco = deco;
  }
  item(r, taskItem, parent, current){
    if(this._deco) this._deco.item();
    this._item(r, taskItem, parent, current);
  }
};
const BaseItem = class extends ItemDeco {
  constructor(){
    super()
  } 
  _item(r, taskItem, parent, current){
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
};
const MemoItem = class extends ItemDeco {
  constructor(){
    super(deco)
  }
  _item(){

  }
};
const CompleDateItem = class extends ItemDeco {
  constructor(){
    super(deco)
  } 
  _item(){

  }
};

const Visitor = class {
  constructor(renderer, el, itemDeco) {
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
      Dr.el('textarea', '@cssText', 'width:90%;height:300px;', 'id', 'data'),
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
        'appendChild', Dr.el('button', 'innerHTML', 'restore',
          'addEventListener', [
            'click', e => taskList.restore(document.getElementById('data').value)
        ]),
        'appendChild', Dr.el('button', 'innerHTML', 'undo',
          'addEventListener', [
            'click', e => r.undo()
        ]),
        'appendChild', Dr.el('button', 'innerHTML', 'redo',
          'addEventListener', [
            'click', e => r.redo()
        ])
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
    this._itemDeco.item(this._renderer,)
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