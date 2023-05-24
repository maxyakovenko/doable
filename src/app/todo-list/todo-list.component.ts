import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoListFacade } from 'src/libs/state/todos/todos.facade';
import { Todo, createTodo } from 'src/libs/todos/todo.model';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent implements OnInit {
  public todos$: Observable<Todo[]>;
  public currentTodo$: Observable<Todo>;

  constructor(
    private facade: TodoListFacade
  ) { }

  ngOnInit(): void {
    this.facade.mutation$
      .subscribe(() => {
        this.select(createTodo());
      });

    this.todos$ = this.facade.todos$;

    this.currentTodo$ = this.facade.currentTodo$;
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

  complete(todo: Todo): void {
    this.facade.complete(todo);
  }

  uncomplete(todo: Todo): void {
    this.facade.uncomplete(todo);
  }
}
