import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Todo } from '@doable/api-interfaces';
import { UndoableAction } from '../undoable/undoable.actions';

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
    Select = '[Todo] Select',
    Update = '[Todo] Update',
    Updated = '[Todo] Updated',
    UpdateMany = '[Todo] Update Many',
    UndoCreated = '[Todo] Undo Created',
    RedoCreated = '[Todo] Redo Created',
    UndoRemoved = '[Todo] Undo Removed',
    RedoRemoved = '[Todo] Redo Removed',
    UndoUpdated = '[Todo] Undo Updated',
    RedoUpdated = '[Todo] Redo Updated',
    UndoMarkAsCompleted = '[Todo] Undo Mark As Completed',
    RedoMarkAsCompleted = '[Todo] Redo Mark As Completed',
}

export const create = createAction(TodosActionTypes.Create, props<{ payload: Todo }>());
export const created = createAction(TodosActionTypes.Created, props<{ payload: Todo }>());
export const load = createAction(TodosActionTypes.Load);
export const loaded = createAction(TodosActionTypes.Loaded, props<{payload: Todo[] }>());
export const markAsCompleted = createAction(TodosActionTypes.MarkAsCompleted, props<{ payload: Todo[] }>());
export const markAsNotCompleted = createAction(TodosActionTypes.MarkAsNotCompleted, props<{ payload: Todo[] }>());
export const remove = createAction(TodosActionTypes.Delete, props<{ payload: Todo }>());
export const deleteMany = createAction(TodosActionTypes.DeleteMany, props<{ payload: Todo[] }>());
export const removed = createAction(TodosActionTypes.Deleted, props<{ payload: Todo }>());
export const select = createAction(TodosActionTypes.Select, props<{ payload: Todo }>());
export const update = createAction(TodosActionTypes.Update, props<{ payload: Todo }>());
export const updated = createAction(TodosActionTypes.Updated, props<{ payload: Todo }>());
export const updateMany = createAction(TodosActionTypes.UpdateMany, props<{ payload: Update<Todo>[] }>());

export const undoCreated = createAction(TodosActionTypes.UndoCreated, props<{ payload: UndoableAction }>());
export const redoCreated = createAction(TodosActionTypes.RedoCreated, props<{ payload: UndoableAction }>());
export const undoRemoved = createAction(TodosActionTypes.UndoRemoved, props<{ payload: UndoableAction }>());
export const redoRemoved = createAction(TodosActionTypes.RedoRemoved, props<{ payload: UndoableAction }>());
export const undoUpdated = createAction(TodosActionTypes.UndoUpdated, props<{ payload: UndoableAction }>());
export const redoUpdated = createAction(TodosActionTypes.RedoUpdated, props<{ payload: UndoableAction }>());
export const undoMarkAsCompleted = createAction(TodosActionTypes.UndoMarkAsCompleted, props<{ payload: UndoableAction }>());
export const redoMarkAsCompleted = createAction(TodosActionTypes.RedoMarkAsCompleted, props<{ payload: UndoableAction }>());
