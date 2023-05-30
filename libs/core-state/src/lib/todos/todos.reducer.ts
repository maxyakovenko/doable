import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todos.actions';
import { Todo } from '@doable/api-interfaces';

export interface TodosState extends EntityState<Todo> {
    currentTodo: Todo;
}

const adapter = createEntityAdapter<Todo>();

const initialState: TodosState = adapter.getInitialState({
    currentTodo: null
});

export const todosReducer = createReducer(
    initialState,
    on(TodoActions.created, (state, action) => adapter.addOne(action.payload, state)),
    on(TodoActions.loaded, (state, action) => adapter.setAll(action.payload, state)),
    on(TodoActions.updated, (state, action) => adapter.updateOne({ id: action.payload.id, changes: { ...action.payload } }, state)),
    on(TodoActions.updateMany, (state, action) => adapter.updateMany(action.payload, state)),
    on(TodoActions.select, (state, action) => ({ ...state, currentTodo: action.payload })),
    on(TodoActions.removed, (state, action) => adapter.removeOne(action.payload.id, state))
);

const { selectAll } = adapter.getSelectors();

export const selectTodoEntities = selectAll;

export const getCurrentTodo = (state: TodosState): Todo => state.currentTodo;