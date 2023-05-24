import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Todo } from 'src/libs/todos/todo.model';

@Component({
  selector: '[todoItem]',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodoItemComponent {
  @Input() todo: Todo;
  @Output() checked: EventEmitter<void> = new EventEmitter();
  @Output() unchecked: EventEmitter<void> = new EventEmitter();
  @Output() deleteClicked: EventEmitter<void> = new EventEmitter();
  @Output() doubleClicked: EventEmitter<void> = new EventEmitter();

  handleCheckboxChanged(event: Event): void {
    const target = (event.target as HTMLInputElement);
    target.checked ? this.checked.emit() : this.unchecked.emit();
  }

  handleDeleteClick(): void {
    this.deleteClicked.emit();
  }

  handleDoubleClick(): void {
    this.doubleClicked.emit();
  }
}
