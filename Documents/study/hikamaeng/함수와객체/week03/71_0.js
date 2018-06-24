const Task = class {
    constructor() {
        this._list = [];
    }
    add(task) {
        this._list.push(task);
    }
    remove(task) {
        const l = this._list;
        if (l.include(task)) l.splice(l.indexOf(task), 1);
    }
    getResult(sort, state) {
        // 인자는 덮어쓰지 않는다.
        const l = this._list;

        let result = [];

        // if (state) result = [l.filter(v => !v.isComplete()), l.filter(v => v.isComplete())].reduce((p, c) => p.concat(c.sort(s)), []);
        // else result = [...l].sort(sort);

        result = state ? result = [l.filter(v => !v.isComplete()), l.filter(v => v.isComplete())].reduce((p, c) => p.concat(c.sort(sort)), []) : [...l].sort(sort);

        return {
            item: this._getResult(),
            children: result
        }
    }
    _getRsult() { throw 'must be overide!!!' }
};
const TaskItem = class extends Task {
    static title(a, b) {
        return a.sortTitle(b);
    }
    static date(a, b) {
        return a.sortDate(b);
    }
    constructor(title) {
        super();
        this._title = title;
        this._date = new Date();
        this._isComplete = false;
        this._list = [];
    }
    _getResult(sort, state) {
        return this;
    }
    isComplete() {
        return this._isComplete;
    }
    toggle() {
        this._isComplete = !this.isComplete;
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
        this._list = [];
    }
    add(title) {
        super.add(new TaskItem(title));
    }
    remove(task) {
        super.remove(task);
    }
    _getResult(sort, state) {
        return this._title;
    }
    byRegister(state = false) {
        return this.getResult(TaskItem.register, state);
    }
    byTtitle(state = false) {
        return this.getResult(TaskItem.title, state);
    }
    byDate(state = false) {
        return this.getResult(TaskItem.date, state);
    }
};

const Dr = class {
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
        this._sort = 'register';
    }
    sort() {
        this._sort = s;
        this.render();
    }
    render() {
        const parent = document.querySelector(this._parent);
        const data = this._list.getResult(this._sort, true);

        parent.innerHTML = '';

        [
            Dr.el('h2', 'innerHTML', data.item), 'register,title.date'.split(',').reduce((p, c) => {
                p.appendChild(Dr.el('button', 'innerHTML', c, 'addEventListener', ['click', e => this.sort(c)]))
            }, Dr.el('nav'))
        ].reduce((p, c) => (p.appendChild(c), p), parent);
    }
}

const todo = new Dr(new TaskList('list1', '#todo'));
todo.render();


// const list = new TaskList('list1');

// list.add('task1');
// list.add('task3');
// list.add('task2');

// const list1 = list.byRegister();
// list1.children[0].add(new TaskItem('sub1'));
// console.log(list.byRegister());
// console.log(list.byTtitle());