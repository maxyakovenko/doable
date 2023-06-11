/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { TodosState, todosReducer } from './todos/todos.reducer';
import { undoable } from './undoable/undoable.reducer';

export interface AppState {
    todos: TodosState
};

export const reducers: ActionReducerMap<AppState> = {
    todos: todosReducer
};

export const metaReducers: MetaReducer<any>[] = [ undoable ];