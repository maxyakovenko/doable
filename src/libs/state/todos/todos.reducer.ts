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
    on(TodoActions.load, (state, action) => adapter.setMany(action.payload, state)),
    on(TodoActions.select, (state, action) => ({ ...state, currentTodo: action.payload })),
    on(TodoActions.remove, (state, action) => adapter.removeOne(action.payload.id, state)),
);

const { selectAll } = adapter.getSelectors();

export const selectTodoEntities = selectAll;

export const getCurrentTodo = (state: TodosState) => state.currentTodo;