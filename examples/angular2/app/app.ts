import {Component} from 'angular2/core';
import {TodoStore, Todo} from './services/store';
import { DatePipe } from 'angular2/common';

@Component({
	selector: 'todo-app',
	templateUrl: 'app/app.html'
})
export default class TodoApp {
	todoStore: TodoStore;
	newTodoText = '';
	newDueDate: number;

	constructor(todoStore: TodoStore, private datePipe: DatePipe) {
		this.todoStore = todoStore;
	}

	stopEditing(todo: Todo, editedTitle: string) {
		todo.title = editedTitle;
		todo.editing = false;
	}

	cancelEditingTodo(todo: Todo) {
		todo.editing = false;
	}

	updateEditingTodo(todo: Todo, editedTitle: string) {
		editedTitle = editedTitle.trim();
		todo.editing = false;

		if (editedTitle.length === 0) {
			return this.todoStore.remove(todo);
		}

		todo.title = editedTitle;
	}

	editTodo(todo: Todo) {
		todo.editing = true;
	}

	removeCompleted() {
		this.todoStore.removeCompleted();
	}

	toggleCompletion(todo: Todo) {
		this.todoStore.toggleCompletion(todo);
	}

	remove(todo: Todo){
		this.todoStore.remove(todo);
	}

	addTodo() {
		if (this.newTodoText.trim().length) {
			const currentNumericTime = this.datePipe.transform(new Date(this.newDueDate), ['yyyy-MM-dd']);
			this.todoStore.add(this.newTodoText, new Date(currentNumericTime).getTime());
			this.newTodoText = '';
			this.newDueDate = null;
		}
	}
}
