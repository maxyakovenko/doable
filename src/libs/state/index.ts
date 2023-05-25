import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
import { TodosState, getCurrentTodo, selectTodoEntities, selectTodoEntitiesTotal, todosReducer } from './todos/todos.reducer'


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

export const selectCompletedTodos = createSelector(
    selectTodos,
    (entities) => entities.filter((entity) => entity.completed)
);

export const selectCompletedTodosTotal = createSelector(
    selectCompletedTodos,
    (todos) => todos.length
)

export const selectCurrentTodo = createSelector(
    selectTodosState,
    getCurrentTodo
)

export const selectTodoTotal = createSelector(
    selectTodosState,
    selectTodoEntitiesTotal
);
