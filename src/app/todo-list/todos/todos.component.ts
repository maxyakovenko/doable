import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo, createTodo } from 'src/libs/todos/todo.model';
import { TodoItemComponent } from '../todo-item/todo.component';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TodoItemComponent]
})
export class TodosComponent {
  public currentTodo: Todo = createTodo();
  @Input() todos: Todo[] = [];
  @Input('currentTodo') set todo(todo: Todo) {
    if (!todo) {
      return;
    }
    this.currentTodo = todo;
    this.form.setValue({ title: todo.title });
  };
  @Output() todoCreated: EventEmitter<Todo> = new EventEmitter();
  @Output() todoChecked: EventEmitter<Todo> = new EventEmitter();
  @Output() todoUnchecked: EventEmitter<Todo> = new EventEmitter();
  @Output() todoSelected: EventEmitter<Todo> = new EventEmitter();
  @Output() todoDeleted: EventEmitter<Todo> = new EventEmitter();
  @Output() todoUpdated: EventEmitter<Todo> = new EventEmitter();

  public form = new FormGroup<{title: FormControl<string>}>({
    title: new FormControl('', [Validators.required])
  });

  get title(): string {
    return this.form.get('title')?.getRawValue();
  }

  handleFormSubmit(): void {
    if(!this.form.valid) {
      return;
    }
    this.currentTodo.id ?
      this.handleTodoUpdated({ ...this.currentTodo, title: this.title }):
      this.handleTodoCreated(createTodo({ title: this.title }));
  }

  handleTodoCreated(todo: Todo): void {
    this.todoCreated.emit(todo);
  }

  handleTodoUpdated(todo: Todo): void {
    this.todoUpdated.emit(todo);
  }

  handleTodoChecked(todo: Todo): void {
    this.todoChecked.emit(todo);
  }

  handleTodoUnchecked(todo: Todo): void {
    this.todoUnchecked.emit(todo);
  }

  handleTodoSelection(todo: Todo): void {
    this.todoSelected.emit(todo);
  }

  handleTodoDelete(todo: Todo): void {
    this.todoDeleted.emit(todo);
  }
}
