import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo, createTodo } from '@doable/api-interfaces';
import { OrderPipe } from '../../core/pipes/order.pipe';
import { DoableActionsComponent } from '../doable-actions/doable-actions.component';
import { DoableItemComponent } from '../doable-item/doable-item.component';

@Component({
  selector: 'doable-list',
  templateUrl: './doable-list.component.html',
  styleUrls: ['./doable-list.component.scss'],
  standalone: true,
  imports: [CommonModule, DoableItemComponent, DoableActionsComponent, OrderPipe]
})
export class DoableListComponent {
  @Input() todos: Todo[] = [];
  @Input() currentTodo: Todo = createTodo();
  @Output() todoCancelled: EventEmitter<Todo> = new EventEmitter();
  @Output() todoChecked: EventEmitter<Todo> = new EventEmitter();
  @Output() todoDeleted: EventEmitter<Todo> = new EventEmitter();
  @Output() todoSelected: EventEmitter<Todo> = new EventEmitter();
  @Output() todoUnchecked: EventEmitter<Todo> = new EventEmitter();
  @Output() todoUpdated: EventEmitter<Todo> = new EventEmitter();

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
}
