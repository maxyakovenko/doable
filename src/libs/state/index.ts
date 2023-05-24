import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
import { TodosState, getCurrentTodo, selectTodoEntities, todosReducer } from './todos/todos.reducer'


export interface AppState {
    todos: TodosState
};

export const reducers: ActionReducerMap<AppState> = {
    todos: todosReducer
};

export const selectTodosState = createFeatureSelector<TodosState>('todos');

export const selectTodos = createSelector(
    selectTodosState,
    selectTodoEntities
)

export const selectCurrentTodo = createSelector(
    selectTodosState,
    getCurrentTodo
)
