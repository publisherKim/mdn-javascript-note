const Listennner = class {
    listenner() {
        throw 'must be overrided'
    }
};

const Task = class extends Listenner {
    constructor() {
        this._list = [];
        this._listenner = new Set();
    }
    _notify(type) {
        this._listenner.forEach(v => v.listen(type));
    }
    addListenner(listenner) {
        this._listenner.add(listenner);
        return this;
    }
    removeListenner(listenner) {
        this._listenner.delete(listenner);
    }
    listen(type) {
        this._notify(type);
    }
    add(task) {
        this._list.push(task);
        this._notify('added');
    }
    remove(task) {
        const l = this._list;
        if (l.includes(task)) l.splice(l.indexOf(task), 1);
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
    constructor(title) {
        super();
        this._title = title;
        this._date = new Date();
        this._isComplete = false;
    }
    get date() {
        return this._date.toISOString(); // toJSON
    }
    get title() {
        return this._title;
    }
    _getResult(sort, state) {
        return this;
    }
    isComplete() {
        return this._isComplete;
    }
    toggle() {
        this._isComplete = !this._isComplete;
    }
    sortTitle(task) {
        return this._title > task._title;
    }
    sortDate(task) {
        return this._date > task._date;
    }
};
const TaskList = class extends Task {
    constructor(title) {
        super();
        this._title = title;
        this._sort = 'register';
    }
    get title() { return this._title; }
    get sort() {
        return this._sort;
    }
    set sort(v) {
        this._sort = v;
        this._notify('sort');
    }
    add(title) {
        super.add(new TaskItem(title));
    }
    _getResult(sort, state) {
        return this._title;
    }
};
const Dr = class extends Listenner {
    static el(type, ...attr) {
        const el = document.createElement(type);
        for (let i = 0; i < attr.length;) {
            const k = attr[i++],
                v = attr[i++];
            if (typeof el[k] === 'function') el[k].apply(el, Array.isArray(v) ? v : [v])
            else if (k[0] === '@') el.style[k.substr(1)] = v;
            else el[k] = v;
        }
        return el;
    }
    constructor(taskList, parent) {
        this._list = taskList;
        this._parent = parent;
        this._list.addListenner(this);
    }
    listen(type) {
        this.render();
    }
    sort(s) {
        this._list.sort = s;
        this.render();
    }
    add(title) {
        this._list.add(title);
        this.render();
    }
    remove(taskItem) {
        this._list.remove(taskItem);
        this.render();
    }
    toggle(taskItem) {
        taskItem.toggle(); // !!
        this.render();
    }
    addSubTask(taskItem, title) {
        taskItem.add(new TaskItem(title));
        this.render();
    }
    render() { // throw
        const parent = document.querySelector(this._parent);
        parent.innerHTML = '';
        const visitor = new Visitor(this, parent);
        visitor.accept(this._list, this._list.sort, true);
    }
};
const Visitor = class {
    constructor(renderer, el) {
        this._renderer = renderer;
        this._parent = el;
        this._current = null;
    }
    accept(task, sort, state) {
        const s = TaskItem[sort];
        switch (true) {
            case task instanceof TaskItem:
                this._item(task);
                break;
            case task instanceof TaskList:
                this._list(task);
                break;
        }
        this._startSub();
        task.getResult(sort, state).children.forEach(
            ({ item }) => this.accept(item, s, state)
        );
        visitor.endSub();
    }
    list(taskList) {
        const r = this._renderer;
        [
            Dr.el('h2', 'innerHTML', taskList.title),
            'register,title,date'.split(',').reduce((p, c) => {
                p.appendChild(Dr.el('button', 'innerHTML', c,
                    'addEventListener', ['click', e => r.sort(c)]));
                return p;
            }, Dr.el('nav')),
            Dr.el('section',
                'appendChild', Dr.el('input', 'type', 'text'),
                'appendChild', Dr.el('button', 'innerHTML', 'add task',
                    'addEventListener', [
                        'click', e => r.add(e.target.previousSibling.value)
                    ])
            )
        ].forEach(v => this._parent.appendChild(v));
        this._current = this._parent;
        this._current.color = 255;
    }
    item(taskItem) {
        const r = this._renderer;
        [
            Dr.el('h3', 'innerHTML', taskItem.title,
                '@textDecoration', taskItem.isComplete() ? 'line-though' : 'none'
            ),
            Dr.el('time', 'innerHTML', taskItem.date, 'dateTime', taskItem.date),
            Dr.el('button', 'innerHTML', taskItem.isComplete() ? 'progress' : 'complete',
                'addEventListener', [
                    'click', e => r.toggle(taskItem)
                ]),
            Dr.el('button', 'innerHTML', 'remove',
                'addEventListener', [
                    'click', e => r.remove(taskItem)
                ]),
            Dr.el('input', 'type', 'text'),
            Dr.el('button', 'innerHTML', 'add task',
                'addEventListener', [
                    'click', e => r.addSubTask(taskItem, e.target.previousSibling.value)
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


// const list = new TaskList('list1');

// list.add('task1');
// list.add('task3');
// list.add('task2');

// const list1 = list.byRegister();
// list1.children[0].add(new TaskItem('sub1'));
// console.log(list.byRegister());
// console.log(list.byTtitle());