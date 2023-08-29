import { Injectable } from '@angular/core';
import { Todo } from '@doable/api-interfaces';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { Observable, filter, map, take } from 'rxjs';
import * as UndoableActions from '../undoable/undoable.actions';
import { UndoableAction } from '../undoable/undoable.actions';
import { selectFuture, selectHasFuture, selectHasPast, selectPast } from '../undoable/undoable.selectors';
import { guid } from '../utils';
import * as TodoActions from './todos.actions';
import { TodosActionTypes } from './todos.actions';
import { TodosState } from './todos.reducer';
import { selectCurrentTodo, selectTodos } from './todos.selectors';

@Injectable()
export class TodoListFacade {
    todos$: Observable<Todo[]>;
    currentTodo$: Observable<Todo>;
    past$: Observable<UndoableAction[]>;
    future$: Observable<UndoableAction[]>;
    hasPast$: Observable<boolean>;
    hasFuture$: Observable<boolean>;
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

        this.past$ = this.store.select(selectPast);
        this.future$ = this.store.select(selectFuture);
        this.hasFuture$ = this.store.select(selectHasFuture);
        this.hasPast$ = this.store.select(selectHasPast);
    }

    create(todo: Todo): void {
        this.store.dispatch(TodoActions.create({ payload: { ...todo, id: guid() } }));
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

    clear(): void {
        this.todos$
            .pipe(take(1))
            .subscribe((todos) => this.deleteMany(todos));
    }

    deleteMany(todos: Todo[]): void {
        this.store.dispatch(TodoActions.deleteMany({ payload: todos }));
    }

    delete(todo: Todo): void {
        this.store.dispatch(TodoActions.remove({ payload: todo }));
    }

    markAllAsCompleted(): void {
        this.todos$
            .pipe(
                take(1),
                map((todos) => todos.filter(todo => !todo.completed))
            )
            .subscribe((todos) => {
                this.markAsCompleted(todos);
            });
    }

    markAllAsNotCompleted(): void {
        this.todos$
            .pipe(
                take(1),
                map((todos) => todos.filter(todo => todo.completed))
            )
            .subscribe((todos) => {
                this.markAsNotCompleted(todos);
            });
    }

    markAsCompleted(todos: Todo[]): void {
        this.store.dispatch(TodoActions.markAsCompleted({ payload: todos }));
    }

    markAsNotCompleted(todos: Todo[]): void {
        this.store.dispatch(TodoActions.markAsNotCompleted({ payload: todos }));
    }

    undo(): void {
        this.past$.pipe(
            take(1),
            filter((past) => !!past.length)
        ).subscribe((past) => this.store.dispatch(UndoableActions.undo({ payload: past[past.length - 1] })));
    }

    redo(): void {
        this.future$.pipe(
            take(1),
            filter((future) => !!future.length)
        ).subscribe((future) => this.store.dispatch(UndoableActions.redo({ payload: future[0] })));
    }
}