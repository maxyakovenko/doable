import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Todo } from '@doable/api-interfaces';

export enum TodosActionTypes {
    Clear = '[Todo] Clear',
    Create = '[Todo] Create',
    Created = '[Todo] Created',
    Delete = '[Todo] Delete',
    Deleted = '[Todo] Deleted',
    DeleteMany = '[Todo] Delete Many',
    Load = '[Todo] Load',
    Loaded = '[Todo] Loaded',
    MarkAsCompleted = '[Todo] Mark As Completed',
    MarkAsNotCompleted = '[Todo] Mark As Not Completed',
    Redo = '[Todo] Redo',
    Select = '[Todo] Select',
    Undo = '[Todo] Undo',
    Update = '[Todo] Update',
    Updated = '[Todo] Updated',
    UpdateMany = '[Todo] Update Many',
}

export const create = createAction(TodosActionTypes.Create, props<{ payload: Todo }>());
export const created = createAction(TodosActionTypes.Created, props<{ payload: Todo }>());
export const load = createAction(TodosActionTypes.Load);
export const loaded = createAction(TodosActionTypes.Loaded, props<{payload: Todo[] }>());
export const markAsCompleted = createAction(TodosActionTypes.MarkAsCompleted, props<{ payload: Todo[] }>());
export const markAsNotCompleted = createAction(TodosActionTypes.MarkAsNotCompleted, props<{ payload: Todo[] }>());
export const redo = createAction(TodosActionTypes.Redo);
export const remove = createAction(TodosActionTypes.Delete, props<{ payload: Todo }>());
export const deleteMany = createAction(TodosActionTypes.DeleteMany, props<{ payload: Todo[] }>());
export const removed = createAction(TodosActionTypes.Deleted, props<{ payload: Todo }>());
export const select = createAction(TodosActionTypes.Select, props<{ payload: Todo }>());
export const undo = createAction(TodosActionTypes.Undo);
export const update = createAction(TodosActionTypes.Update, props<{ payload: Todo }>());
export const updated = createAction(TodosActionTypes.Updated, props<{ payload: Todo }>());
export const updateMany = createAction(TodosActionTypes.UpdateMany, props<{ payload: Update<Todo>[] }>());