import { Todo } from '@doable/api-interfaces';
import { Dictionary, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { UndoableState } from '../undoable/undoable.reducer';
import * as TodoActions from './todos.actions';

export interface TodosState extends EntityState<Todo>, UndoableState {
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
    on(TodoActions.updated, (state, { payload }) => adapter.updateOne({
        id: payload.id, changes: {
            completed: payload.completed,
            title: payload.title,
            note: payload.note
        }
    }, state)),
    on(TodoActions.updateMany, (state, action) => adapter.updateMany(action.payload, state)),
    on(TodoActions.select, (state, action) => ({ ...state, currentTodo: action.payload })),
    on(TodoActions.removed, (state, action) => adapter.removeOne(action.payload.id, state))
);

const { selectAll, selectEntities } = adapter.getSelectors();

export const getAllTodos = selectAll;
export const getTodoEntities = selectEntities;

export const getCurrentTodo = (state: TodosState): Todo => state.currentTodo;
export const getCompletedTodoEntities = (todos: Todo[]): Todo[] => todos.filter((entity) => entity.completed);
export const getTodoEntity = (entities: Dictionary<Todo>, id: string) => entities[id];