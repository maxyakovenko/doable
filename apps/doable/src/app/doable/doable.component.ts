import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Todo, createTodo } from '@doable/api-interfaces';
import { TodoListFacade } from '@doable/core-state';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { DoableActionsComponent } from './doable-actions/doable-actions.component';
import { DoableHeaderComponent } from './doable-header/doable-header.component';
import { DoableListComponent } from './doable-list/doable-list.component';
@UntilDestroy()
@Component({
  selector: 'doable-app',
  templateUrl: './doable.component.html',
  styleUrls: ['./doable.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DoableHeaderComponent,
    DoableActionsComponent,
    DoableListComponent
  ]
})
export class DoableComponent implements OnInit {
  @HostListener('document:keydown.meta.z', ['$event'])
  handleCommandZ(e: KeyboardEvent): void {
    e.preventDefault();
    this.facade.undo();
  }
  @HostListener('document:keydown.meta.shift.z', ['$event'])
  handleCommandShiftZ(e: KeyboardEvent): void {
    e.preventDefault();
    this.facade.redo();
  }
  public todos$: Observable<Todo[]>;
  public currentTodo$: Observable<Todo>;

  constructor(
    private facade: TodoListFacade
  ) {}

  ngOnInit(): void {
    this.facade.mutation$
      .subscribe(() =>
        this.select(createTodo())
      );

    this.todos$ = this.facade.todos$;

    this.currentTodo$ = this.facade.currentTodo$;

    this.load();
  }

  load() {
    this.facade.load();
  }

  create(todo: Todo): void {
    this.facade.create(todo);
  }

  update(todo: Todo): void {
    this.facade.update(todo);
  }

  select(todo: Todo): void {
    this.facade.select(todo);
  }

  clear(): void {
    this.facade.clear();
  }

  delete(todo: Todo): void {
    this.facade.delete(todo);
  }

  deleteMany(todos: Todo[]): void {
    this.facade.deleteMany(todos);
  }

  markAsCompleted(todo: Todo): void {
    this.facade.markAsCompleted([todo]);
  }

  markAsNotCompleted(todo: Todo): void {
    this.facade.markAsNotCompleted([todo]);
  }

  markAllAsCompleted(): void {
    this.facade.markAllAsCompleted();
  }

  markAllAsNotCompleted(): void {
    this.facade.markAllAsNotCompleted();
  }
}
