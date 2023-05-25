import { Component, OnInit } from '@angular/core';
import { Observable, filter, fromEvent } from 'rxjs';
import { TodoListFacade } from 'src/libs/state/todos/todos.facade';
import { Todo, createTodo } from 'src/libs/todos/todo.model';
import { TodosComponent } from './todos/todos.component';
import { CommonModule } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TodosComponent
  ]
})
export class TodoListComponent implements OnInit {
  public todos$: Observable<Todo[]>;
  public todosTotal$: Observable<number>;
  public completedTodosTotal$: Observable<number>;
  public currentTodo$: Observable<Todo>;
  private keydown$: Observable<KeyboardEvent>;
  private commandZ$: Observable<KeyboardEvent>;
  private commandShiftZ$: Observable<KeyboardEvent>;

  constructor(
    private facade: TodoListFacade
  ) {
    this.keydown$ = fromEvent<KeyboardEvent>(document, 'keydown');
    this.commandZ$ = this.keydown$
      .pipe(
        filter((e: KeyboardEvent) => e.key === 'z' && e.metaKey && !e.shiftKey),
        untilDestroyed(this)
      );
    this.commandShiftZ$ = this.keydown$
        .pipe(
          filter((e: KeyboardEvent) => e.key === 'z' && e.metaKey && e.shiftKey),
          untilDestroyed(this)
        );
  }

  ngOnInit(): void {
    this.facade.mutation$
      .subscribe(() => {
        this.select(createTodo());
      });

    this.todos$ = this.facade.todos$;

    this.todosTotal$ = this.facade.todosTotal$;
    this.completedTodosTotal$ = this.facade.completedTodosTotal$;

    this.currentTodo$ = this.facade.currentTodo$;

    this.commandZ$
      .subscribe(() => this.undo());
    this.commandShiftZ$
      .subscribe(() => this.redo());
  }

  load(todos: Todo[]) {
    this.facade.load(todos);
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

  delete(todo: Todo): void {
    this.facade.delete(todo);
  }

  markAsCompleted(todo: Todo): void {
    this.facade.markAsCompleted(todo);
  }

  markAsNotCompleted(todo: Todo): void {
    this.facade.markAsNotCompleted(todo);
  }

  markAllAsCompleted(): void {
    this.facade.markAllAsCompleted();
  }

  markAllAsNotCompleted(): void {
    this.facade.markAllAsNotCompleted();
  }

  undo(): void {
    this.facade.undo();
  }

  redo(): void {
    this.facade.redo();
  }
}
