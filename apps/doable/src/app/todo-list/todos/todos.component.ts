import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo, createTodo } from '@doable/api-interfaces';
import { TodoItemComponent } from '../todo-item/todo.component';
import { OrderPipe } from '../../core/pipes/order.pipe';

@Component({
  selector: 'doable-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TodoItemComponent, OrderPipe]
})
export class TodosComponent {
  @Input() todos: Todo[] = [];
  @Input() currentTodo: Todo = createTodo();
  @Output() todoCancelled: EventEmitter<Todo> = new EventEmitter();
  @Output() todoChecked: EventEmitter<Todo> = new EventEmitter();
  @Output() todoCreated: EventEmitter<Todo> = new EventEmitter();
  @Output() todoDeleted: EventEmitter<Todo> = new EventEmitter();
  @Output() todoSelected: EventEmitter<Todo> = new EventEmitter();
  @Output() todoUnchecked: EventEmitter<Todo> = new EventEmitter();
  @Output() todoUpdated: EventEmitter<Todo> = new EventEmitter();
  @Output() markAllAsCompleted: EventEmitter<void> = new EventEmitter();
  @Output() markAllAsNotCompleted: EventEmitter<void> = new EventEmitter();
  @Output() clear: EventEmitter<void> = new EventEmitter();

  public form = new FormGroup<{title: FormControl<string>, note: FormControl<string>}>({
    title: new FormControl('', [Validators.required]),
    note: new FormControl('')
  });

  get title(): string {
    return this.form.get('title')?.getRawValue();
  }

  get note(): string {
    return this.form.get('note')?.getRawValue();
  }

  handleFormSubmit(): void {
    if(!this.form.valid) {
      return;
    }
    this.handleTodoCreated(createTodo({ title: this.title, note: this.note }));
    this.form.reset();
  }

  handleClearClicked(): void {
    this.clear.emit();
  }

  handleTodoCreated(todo: Todo): void {
    this.todoCreated.emit(todo);
  }

  handleTodoUpdated(todo: Todo): void {
    this.todoUpdated.emit(todo);
  }

  handleTodoCancelled(todo: Todo): void {
    this.todoCancelled.emit(todo);
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

  handleMarkAllAsCompleted(): void {
    this.markAllAsCompleted.emit();
  }

  handleMarkAllAsNotCompleted(): void {
    this.markAllAsNotCompleted.emit();
  }
}
