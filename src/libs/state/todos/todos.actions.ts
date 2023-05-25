import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Todo } from 'src/libs/todos/todo.model';

export enum TodosActionTypes {
    Create = '[Todo] Create',
    Delete = '[Todo] Delete',
    Load = '[Todo] Load',
    MarkAsCompleted = '[Todo] Mark As Completed',
    MarkAsNotCompleted = '[Todo] Mark As Not Completed',
    MarkAllAsCompleted = '[Todo] Mark All As Completed',
    MarkAllAsNotCompleted = '[Todo] Mark All As Not Completed',
    Redo = '[Todo] Redo',
    Select = '[Todo] Select',
    Undo = '[Todo] Undo',
    Update = '[Todo] Update',
    UpdateMany = '[Todo] Update Many',
}

export const create = createAction(TodosActionTypes.Create, props<{ payload: Todo }>());
export const load = createAction(TodosActionTypes.Load, props<{ payload: Todo[] }>());
export const markAsCompleted = createAction(TodosActionTypes.MarkAsCompleted, props<{ payload: Todo }>());
export const markAsNotCompleted = createAction(TodosActionTypes.MarkAsNotCompleted, props<{ payload: Todo }>());
export const markAllAsCompleted = createAction(TodosActionTypes.MarkAllAsCompleted);
export const markAllAsNotCompleted = createAction(TodosActionTypes.MarkAllAsNotCompleted);
export const redo = createAction(TodosActionTypes.Redo);
export const remove = createAction(TodosActionTypes.Delete, props<{ payload: Todo }>());
export const select = createAction(TodosActionTypes.Select, props<{ payload: Todo }>());
export const undo = createAction(TodosActionTypes.Undo);
export const update = createAction(TodosActionTypes.Update, props<{ payload: Todo }>());
export const updateMany = createAction(TodosActionTypes.UpdateMany, props<{ payload: Update<Todo>[] }>());