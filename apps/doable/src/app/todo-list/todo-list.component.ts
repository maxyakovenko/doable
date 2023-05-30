import { Component, OnInit } from '@angular/core';
import { Observable, filter, fromEvent, take } from 'rxjs';
import { TodoListFacade } from '@doable/core-state';
import { Todo, createTodo } from '@doable/api-interfaces';
import { TodosComponent } from './todos/todos.component';
import { CommonModule } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'doable-list',
  templateUrl: './todo-list.component.html',
  standalone: true,
  styles: [
    `.logo {
      position: absolute;
      top: -16px;
      width: 75px;
    }`
  ]
  ,
  imports: [
    CommonModule,
    TodosComponent
  ]
})
export class TodoListComponent implements OnInit {
  public todos$: Observable<Todo[]>;
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

    this.currentTodo$ = this.facade.currentTodo$;

    this.commandZ$
      .subscribe(() => this.undo());
    this.commandShiftZ$
      .subscribe(() => this.redo());

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
    this.todos$
      .pipe(take(1))
      .subscribe((todos) => {
        this.facade.deleteMany(todos);
      });
  }

  delete(todo: Todo): void {
    this.facade.delete(todo);
  }

  markAsCompleted(todo: Todo): void {
    this.facade.markAsCompleted([todo]);
  }

  markAsNotCompleted(todo: Todo): void {
    this.facade.markAsNotCompleted([todo]);
  }

  markAllAsCompleted(): void {
    this.todos$
      .pipe(take(1))
      .subscribe((todos) => {
        this.facade.markAsCompleted(todos);
      });
  }

  markAllAsNotCompleted(): void {
    this.todos$
      .pipe(take(1))
      .subscribe((todos) => {
        this.facade.markAsNotCompleted(todos);
      });
  }

  undo(): void {
    this.facade.undo();
  }

  redo(): void {
    this.facade.redo();
  }
}
