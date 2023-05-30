import { Injectable } from '@angular/core';
import { TodosService } from '@doable/core-data';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, map } from 'rxjs';
import * as TodosActions from './todos.actions';

@Injectable()
export class TodosEffects {
    constructor(private actions$: Actions, private todosService: TodosService) { }

    loadTodos$ = createEffect(() => this.actions$.pipe(
        ofType(TodosActions.load),
        exhaustMap(() => this.todosService.get()
            .pipe(
                map((todos) => TodosActions.loaded({ payload: todos })),
                catchError(() => EMPTY)
            )
        )
    ));

    deleteMany$ = createEffect(() => this.actions$.pipe(
        ofType(TodosActions.deleteMany),
        exhaustMap((action) => this.todosService.deleteMany(action.payload).pipe(
            map(() => TodosActions.load())
        ))
    ));

    completeTodos$ = createEffect(() => this.actions$.pipe(
        ofType(TodosActions.markAsCompleted),
        exhaustMap((action) => this.todosService.complete(action.payload).pipe(
            map(() => TodosActions.load())
        ))
    ));

    uncompleteTodos$ = createEffect(() => this.actions$.pipe(
        ofType(TodosActions.markAsNotCompleted),
        exhaustMap((action) => this.todosService.uncomplete(action.payload).pipe(
            map(() => TodosActions.load())
        ))
    ));

    createTodo$ = createEffect(() => this.actions$.pipe(
        ofType(TodosActions.create),
        exhaustMap((action) => this.todosService.create(action.payload)
            .pipe(
                map((todo) => TodosActions.created({ payload: todo })),
                catchError(() => EMPTY)
            ))
    ));

    updateTodo$ = createEffect(() => this.actions$.pipe(
        ofType(TodosActions.update),
        exhaustMap((action) => this.todosService.update(action.payload)
            .pipe(
                map((todo) => TodosActions.updated({ payload: todo })),
                catchError(() => EMPTY)
            )
        )
    ));

    deleteTodo$ = createEffect(() => this.actions$.pipe(
        ofType(TodosActions.remove),
        exhaustMap((action) => this.todosService.delete(action.payload)
            .pipe(
                map(() => TodosActions.removed({ payload: action.payload })),
                catchError(() => EMPTY)
            ))
    ));
}