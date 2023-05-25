import { createAction, props } from '@ngrx/store';
import { Todo } from 'src/libs/todos/todo.model';

export enum TodosActionTypes {
    Create = '[Todo] Create',
    Delete = '[Todo] Delete',
    Load = '[Todo] Load',
    Redo = '[Todo] Redo',
    Select = '[Todo] Select',
    Undo = '[Todo] Undo',
    Update = '[Todo] Update',
}

export const create = createAction(TodosActionTypes.Create, props<{ payload: Todo }>());
export const load = createAction(TodosActionTypes.Load, props<{ payload: Todo[] }>());
export const remove = createAction(TodosActionTypes.Delete, props<{ payload: Todo }>());
export const select = createAction(TodosActionTypes.Select, props<{ payload: Todo }>());
export const update = createAction(TodosActionTypes.Update, props<{ payload: Todo }>());
export const undo = createAction(TodosActionTypes.Undo);
export const redo = createAction(TodosActionTypes.Redo);