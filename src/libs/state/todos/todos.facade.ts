import { ActionsSubject, Store, select } from '@ngrx/store';
import { guid } from '../utils';
import { Injectable } from '@angular/core';
import { Observable, filter } from 'rxjs';
import { selectCompletedTodosTotal, selectCurrentTodo, selectTodoTotal, selectTodos } from '..';
import { Todo } from 'src/libs/todos/todo.model';
import { TodosActionTypes } from './todos.actions';
import { TodosState } from './todos.reducer';
import * as TodoActions from './todos.actions';

@Injectable({
    providedIn: 'root'
})
export class TodoListFacade {
    todos$: Observable<Todo[]>;
    todosTotal$: Observable<number>;
    completedTodosTotal$: Observable<number>;
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

        this.todosTotal$ = this.store
            .pipe(select(selectTodoTotal));
        this.completedTodosTotal$ = this.store
            .pipe(select(selectCompletedTodosTotal))
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

    markAsCompleted(todo: Todo): void {
        this.store.dispatch(TodoActions.markAsCompleted({ payload: todo }));
    }

    markAsNotCompleted(todo: Todo): void {
        this.store.dispatch(TodoActions.markAsNotCompleted({ payload: todo }));
    }

    markAllAsCompleted(): void {
        this.store.dispatch(TodoActions.markAllAsCompleted());
    }

    markAllAsNotCompleted(): void {
        this.store.dispatch(TodoActions.markAllAsNotCompleted());
    }

    undo(): void {
        //
    }

    redo(): void {
        //
    }
}