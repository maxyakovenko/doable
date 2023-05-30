import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState, getCurrentTodo, selectTodoEntities } from './todos.reducer';

export const selectTodosState = createFeatureSelector<TodosState>('todos');

export const selectTodos = createSelector(
    selectTodosState,
    selectTodoEntities
)

export const selectCompletedTodos = createSelector(
    selectTodos,
    (entities) => entities.filter((entity) => entity.completed)
);

export const selectCurrentTodo = createSelector(
    selectTodosState,
    getCurrentTodo
)
