import { Injectable } from '@angular/core';
import { TodosService } from '@doable/core-data';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, map, switchMap, withLatestFrom } from 'rxjs';
import * as TodosActions from './todos.actions';
import * as UndoableActions from '../undoable/undoable.actions';
import { Store } from '@ngrx/store';
import { TodosState } from './todos.reducer';
import { selectTodoById } from './todos.selectors';

@Injectable()
export class TodosEffects {
    constructor(private actions$: Actions, private todosService: TodosService, private store: Store<TodosState>) { }

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
            switchMap(() => [TodosActions.load(), UndoableActions.add({ payload: action })])
        ))
    ));

    completeTodos$ = createEffect(() => this.actions$.pipe(
        ofType(TodosActions.markAsCompleted),
        exhaustMap((action) => this.todosService.complete(action.payload).pipe(
            switchMap(() => [TodosActions.load(), UndoableActions.add({ payload: action })])
        ))
    ));

    uncompleteTodos$ = createEffect(() => this.actions$.pipe(
        ofType(TodosActions.markAsNotCompleted),
        exhaustMap((action) => this.todosService.uncomplete(action.payload).pipe(
            switchMap(() => [TodosActions.load(), UndoableActions.add({ payload: action })])
        ))
    ));

    createTodo$ = createEffect(() => this.actions$.pipe(
        ofType(TodosActions.create),
        exhaustMap((action) => this.todosService.create(action.payload)
            .pipe(
                switchMap((todo) => [UndoableActions.add({ payload: action }), TodosActions.created({ payload: todo })]),
                catchError(() => EMPTY)
            ))
    ));

    updateTodo$ = createEffect(() => this.actions$.pipe(
        ofType(TodosActions.update),
        exhaustMap((action) => this.todosService.update(action.payload)
            .pipe(
                withLatestFrom(this.store.select(selectTodoById(action.payload.id))),
                switchMap(([newTodo, oldTodo]) => [
                    TodosActions.updated({ payload: newTodo }),
                    UndoableActions.add(
                        { 
                            payload: { ...action, payload: oldTodo },
                            future: { ...action, payload: newTodo }
                        })
                ]),
                catchError(() => EMPTY)
            )
        )
    ));

    deleteTodo$ = createEffect(() => this.actions$.pipe(
        ofType(TodosActions.remove),
        exhaustMap((action) => this.todosService.delete(action.payload)
            .pipe(
                switchMap(() => [TodosActions.removed({ payload: action.payload }), UndoableActions.add({ payload: action })]),
                catchError(() => EMPTY)
            ))
    ));
}