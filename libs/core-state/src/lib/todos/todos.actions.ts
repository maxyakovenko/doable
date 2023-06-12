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
    RedoCreated = '[Todo] Redo Created',
    RedoDeletedMany = '[Todo] Redo Deleted Many',
    RedoMarkAsCompleted = '[Todo] Redo Mark As Completed',
    RedoMarkAsNotCompleted = '[Todo] Redo Mark As Not Completed',
    RedoRemoved = '[Todo] Redo Removed',
    RedoUpdated = '[Todo] Redo Updated',
    UndoCreated = '[Todo] Undo Created',
    UndoDeletedMany = '[Todo] Undo Deleted Many',
    UndoMarkAsCompleted = '[Todo] Undo Mark As Completed',
    UndoMarkAsNotCompleted = '[Todo] Undo Mark As Not Completed',
    UndoRemoved = '[Todo] Undo Removed',
    UndoUpdated = '[Todo] Undo Updated',
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
export const undoMarkAsNotCompleted = createAction(TodosActionTypes.UndoMarkAsNotCompleted, props<{ payload: UndoableAction }>());
export const redoMarkAsNotCompleted = createAction(TodosActionTypes.RedoMarkAsNotCompleted, props<{ payload: UndoableAction }>());
export const undoRemovedMany = createAction(TodosActionTypes.UndoDeletedMany, props<{ payload: UndoableAction }>());
export const redoRemovedMany = createAction(TodosActionTypes.RedoDeletedMany, props<{ payload: UndoableAction }>());
