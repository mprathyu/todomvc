var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var store_1 = require('./services/store');
var common_1 = require('angular2/common');
var TodoApp = (function () {
    function TodoApp(todoStore, datePipe) {
        this.datePipe = datePipe;
        this.newTodoText = '';
        this.todoStore = todoStore;
        var currentDate = this.datePipe.transform(new Date(), ['yyyy-MM-dd']);
        this.currentDateTime = new Date(currentDate).getTime();
    }
    TodoApp.prototype.stopEditing = function (todo, editedTitle) {
        todo.title = editedTitle;
        todo.editing = false;
    };
    TodoApp.prototype.cancelEditingTodo = function (todo) {
        todo.editing = false;
    };
    TodoApp.prototype.updateEditingTodo = function (todo, editedTitle) {
        editedTitle = editedTitle.trim();
        todo.editing = false;
        if (editedTitle.length === 0) {
            return this.todoStore.remove(todo);
        }
        todo.title = editedTitle;
    };
    TodoApp.prototype.editTodo = function (todo) {
        todo.editing = true;
    };
    TodoApp.prototype.removeCompleted = function () {
        this.todoStore.removeCompleted();
    };
    TodoApp.prototype.toggleCompletion = function (todo) {
        this.todoStore.toggleCompletion(todo);
    };
    TodoApp.prototype.remove = function (todo) {
        this.todoStore.remove(todo);
    };
    TodoApp.prototype.addTodo = function () {
        if (this.newTodoText.trim().length) {
            var currentNumericTime = this.datePipe.transform(new Date(this.newDueDate), ['yyyy-MM-dd']);
            this.todoStore.add(this.newTodoText, new Date(currentNumericTime).getTime(), this.priority);
            this.newTodoText = '';
            this.newDueDate = null;
            this.priority = '';
        }
    };
    TodoApp.prototype.orderByPriority = function (prop) {
        return this.todoStore.todos.sort(function (a, b) { return a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1; });
    };
    TodoApp = __decorate([
        core_1.Component({
            selector: 'todo-app',
            templateUrl: 'app/app.html',
            styleUrls: ['app/app.css'],
            providers: [common_1.DatePipe]
        }), 
        __metadata('design:paramtypes', [store_1.TodoStore, common_1.DatePipe])
    ], TodoApp);
    return TodoApp;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TodoApp;
//# sourceMappingURL=app.js.map