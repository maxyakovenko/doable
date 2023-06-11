import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState } from './todos.reducer';
import * as fromTodos from './todos.reducer';


export const selectTodosState = createFeatureSelector<TodosState>('todos');

export const selectTodos = createSelector(
    selectTodosState,
    fromTodos.getAllTodos
);

export const selectTodoEntities = createSelector(
    selectTodosState,
    fromTodos.getTodoEntities
);

export const selectCompletedTodos = createSelector(
    fromTodos.getAllTodos,
    fromTodos.getCompletedTodoEntities
);

export const selectCurrentTodo = createSelector(
    selectTodosState,
    fromTodos.getCurrentTodo
);

export const selectTodoById = (id: string) => createSelector(
    selectTodoEntities,
    (todos) => fromTodos.getTodoEntity(todos, id)
);
