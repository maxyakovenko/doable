/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createAction, props } from '@ngrx/store';

export interface UndoableAction extends Action {
    payload?: any;
    future?: any;
}

export enum UndoableActionTypes {
    Add = '[Undoable] Add',
    Undo = '[Undoable] Undo',
    Redo = '[Undoable] Redo'
}

export const add = createAction(UndoableActionTypes.Add, props<{payload: UndoableAction, future?: UndoableAction}>());
export const undo = createAction(UndoableActionTypes.Undo, props<{ payload: UndoableAction }>());
export const redo = createAction(UndoableActionTypes.Redo, props<{ payload: UndoableAction }>());