import { ActionsSubject, Store, select } from '@ngrx/store';
import { guid } from '../utils';
import { Injectable } from '@angular/core';
import { Observable, filter } from 'rxjs';
import { selectCurrentTodo, selectTodos } from '..';
import { Todo } from 'src/libs/todos/todo.model';
import { TodosActionTypes } from './todos.actions';
import { TodosState } from './todos.reducer';
import * as TodoActions from './todos.actions';

@Injectable({
    providedIn: 'root'
})
export class TodoListFacade {
    todos$: Observable<Todo[]>;
    currentTodo$: Observable<Todo>;
    mutation$ = this.actions$
        .pipe(
            filter((action) => action.type === TodosActionTypes.Create ||
                action.type === TodosActionTypes.Update ||
                action.type === TodosActionTypes.Delete)
        );
    constructor(private store: Store<TodosState>, private actions$: ActionsSubject) {
        this.todos$ = this.store
            .pipe(
                select(selectTodos),
            );

        this.currentTodo$ = this.store
            .pipe(
                select(selectCurrentTodo)
            );
    }

    create(todo: Todo): void {
        this.store.dispatch(TodoActions.create({ payload: { ...todo, id: guid() } }));
    }

    load(todos: Todo[]): void {
        this.store.dispatch(TodoActions.load({ payload: todos }));
    }

    update(todo: Todo): void {
        this.store.dispatch(TodoActions.update({ payload: todo }));
    }

    select(todo: Todo): void {
        this.store.dispatch(TodoActions.select({ payload: todo }));
    }

    delete(todo: Todo): void {
        this.store.dispatch(TodoActions.remove({ payload: todo }));
    }

    complete(todo: Todo): void {
        this.store.dispatch(TodoActions.update({ payload: { ...todo, completed: true} }));
    }

    uncomplete(todo: Todo): void {
        this.store.dispatch(TodoActions.update({ payload: { ...todo, completed: false} }));
    }

    undo(): void {
        //
    }

    redo(): void {
        //
    }
}