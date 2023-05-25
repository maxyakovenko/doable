import { Todo } from 'src/libs/todos/todo.model'
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todos.actions';

export interface TodosState extends EntityState<Todo> {
    currentTodo: Todo;
}

const adapter = createEntityAdapter<Todo>();

const initialState: TodosState = adapter.getInitialState({
    currentTodo: null
});

export const todosReducer = createReducer(
    initialState,
    on(TodoActions.create, (state, action) => adapter.addOne(action.payload, state)),
    on(TodoActions.update, (state, action) => adapter.updateOne({ id: action.payload.id, changes: { ...action.payload } }, state)),
    on(TodoActions.updateMany, (state, action) => adapter.updateMany(action.payload, state)),
    on(TodoActions.load, (state, action) => adapter.setMany(action.payload, state)),
    on(TodoActions.select, (state, action) => ({ ...state, currentTodo: action.payload })),
    on(TodoActions.remove, (state, action) => adapter.removeOne(action.payload.id, state)),
    on(TodoActions.markAsCompleted, (state, action) => adapter.updateOne({ ...action.payload, changes: { completed: true } }, state)),
    on(TodoActions.markAsNotCompleted, (state, action) => adapter.updateOne({ ...action.payload, changes: { completed: false } }, state)),
    on(TodoActions.markAllAsCompleted, (state) => adapter.map(entity => ({ ...entity, completed: true }), state)),
    on(TodoActions.markAllAsNotCompleted, (state) => adapter.map(entity => ({ ...entity, completed: false }), state)),
);

const { selectAll, selectTotal } = adapter.getSelectors();

export const selectTodoEntities = selectAll;

export const selectTodoEntitiesTotal = selectTotal;

export const getCurrentTodo = (state: TodosState): Todo => state.currentTodo;