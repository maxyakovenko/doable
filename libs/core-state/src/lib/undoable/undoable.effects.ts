import { Injectable } from '@angular/core';
import { TodosService } from '@doable/core-data';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import * as TodosActions from '../todos/todos.actions';
import { TodosActionTypes } from '../todos/todos.actions';
import * as UndoableActions from './undoable.actions';

@Injectable()
export class UndoableEffects {
    constructor(private actions$: Actions, private todosService: TodosService) {}
    undo$ = createEffect(() => this.actions$.pipe(
        ofType(UndoableActions.undo),
        map(({ payload }) => {
            switch(payload.type) {
                case TodosActionTypes.Create:
                    return TodosActions.undoCreated({ payload });
                case TodosActionTypes.Update:
                    return TodosActions.undoUpdated({ payload });
                case TodosActionTypes.Delete:
                    return TodosActions.undoRemoved({ payload });
                case TodosActionTypes.MarkAsCompleted:
                    return TodosActions.undoMarkAsCompleted({ payload });
                default:
                    return null;
            }
        })
    ));

    redo$ = createEffect(() => this.actions$.pipe(
        ofType(UndoableActions.redo),
        map(({ payload }) => {
            switch(payload.type) {
                case TodosActionTypes.Create:
                    return TodosActions.redoCreated({ payload });
                case TodosActionTypes.Update:
                    return TodosActions.redoUpdated({ payload });
                case TodosActionTypes.Delete:
                    return TodosActions.redoRemoved({ payload });
                case TodosActionTypes.MarkAsCompleted:
                    return TodosActions.redoMarkAsCompleted({ payload });
                default:
                    return null;
            }
        })
    ));

    undoCreateTodo$ = createEffect(() => this.actions$.pipe(
        ofType(TodosActions.undoCreated),
        exhaustMap(({ payload }) => this.todosService.delete(payload.payload).pipe(
            map(() => TodosActions.removed({ payload: payload.payload }))
        ))
    ));

    redoCreateTodo$ = createEffect(() => this.actions$.pipe(
        ofType(TodosActions.redoCreated),
        exhaustMap(({ payload }) => this.todosService.create(payload.payload).pipe(
            map(() => TodosActions.created({ payload: payload.payload }))
        ))
    ));

    undoRemoveTodo$ = createEffect(() => this.actions$.pipe(
        ofType(TodosActions.undoRemoved),
        exhaustMap(({ payload }) => this.todosService.create(payload.payload).pipe(
            map(() => TodosActions.created({ payload: payload.payload }))
        ))
    ));

    redoRemoveTodo$ = createEffect(() => this.actions$.pipe(
        ofType(TodosActions.redoRemoved),
        exhaustMap(({ payload }) => this.todosService.delete(payload.payload).pipe(
            map(() => TodosActions.removed({payload: payload.payload}))
        ))
    ));

    undoUpdateTodo$ = createEffect(() => this.actions$.pipe(
        ofType(TodosActions.undoUpdated),
        exhaustMap(({ payload }) => this.todosService.update(payload.payload).pipe(
            map(() => TodosActions.updated({ payload: payload.payload }))
        ))
    ));

    redoUpdateTodo$ = createEffect(() => this.actions$.pipe(
        ofType(TodosActions.redoUpdated),
        exhaustMap(({ payload }) => this.todosService.update(payload.future.payload).pipe(
            map((todo) => TodosActions.updated({ payload: todo }))
        ))
    ));

    undoMarkAsCompleted$ = createEffect(() => this.actions$.pipe(
        ofType(TodosActions.undoMarkAsCompleted),
        exhaustMap(({ payload }) => this.todosService.uncomplete(payload.payload).pipe(
            map(() => TodosActions.load())
        ))
    ));

    redoMarkAsCompleted$ = createEffect(() => this.actions$.pipe(
        ofType(TodosActions.redoMarkAsCompleted),
        exhaustMap(({ payload }) => this.todosService.complete(payload.payload).pipe(
            map(() => TodosActions.load())
        ))
    ));
}