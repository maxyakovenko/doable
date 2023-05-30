import { ActionsSubject, Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable, filter } from 'rxjs';
import { selectCurrentTodo, selectTodos } from './todos.selectors';
import { Todo } from '@doable/api-interfaces';
import { TodosActionTypes } from './todos.actions';
import { TodosState } from './todos.reducer';
import * as TodoActions from './todos.actions';
import { guid } from '../utils';

@Injectable()
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
            .pipe(select(selectTodos));

        this.currentTodo$ = this.store
            .pipe(select(selectCurrentTodo));
    }

    create(todo: Todo): void {
        this.store.dispatch(TodoActions.create({ payload: {...todo, id: guid()} }));
        this.store.dispatch(TodoActions.select({ payload: null }));
    }

    load(): void {
        this.store.dispatch(TodoActions.load());
    }

    update(todo: Todo): void {
        this.store.dispatch(TodoActions.update({ payload: todo }));
    }

    select(todo: Todo): void {
        this.store.dispatch(TodoActions.select({ payload: todo }));
    }

    deleteMany(todos: Todo[]): void {
        this.store.dispatch(TodoActions.deleteMany({ payload: todos }));
    }

    delete(todo: Todo): void {
        this.store.dispatch(TodoActions.remove({ payload: todo }));
    }

    markAsCompleted(todos: Todo[]): void {
        this.store.dispatch(TodoActions.markAsCompleted({ payload: todos }));
    }

    markAsNotCompleted(todos: Todo[]): void {
        this.store.dispatch(TodoActions.markAsNotCompleted({ payload: todos }));
    }

    undo(): void {
        //
    }

    redo(): void {
        //
    }
}