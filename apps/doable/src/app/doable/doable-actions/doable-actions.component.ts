import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo, createTodo } from '@doable/api-interfaces';

@Component({
  selector: 'doable-actions',
  templateUrl: './doable-actions.component.html',
  styleUrls: ['./doable-actions.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class DoableActionsComponent {
  @Output() create: EventEmitter<Todo> = new EventEmitter();
  @Output() clear: EventEmitter<void> = new EventEmitter();
  @Output() markAsCompleted: EventEmitter<void> = new EventEmitter();
  @Output() markAsNotCompleted: EventEmitter<void> = new EventEmitter();

  public form = new FormGroup<{ title: FormControl<string> }>({
    title: new FormControl('', [Validators.required]),
  });

  get title(): string {
    return this.form.get('title')?.getRawValue();
  }

  handleMarkAllAsCompleted(): void {
    this.markAsCompleted.emit();
  }

  handleMarkAllAsNotCompleted(): void {
    this.markAsNotCompleted.emit();
  }

  handleClearClicked(): void {
    this.clear.emit();
  }

  handleFormSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.create.emit(createTodo({ title: this.title }));
    this.form.reset();
  }
}
