import { ActionReducerMap } from '@ngrx/store';
import { TodosState, todosReducer } from './todos/todos.reducer';


export interface AppState {
    todos: TodosState
};

export const reducers: ActionReducerMap<AppState> = {
    todos: todosReducer
};