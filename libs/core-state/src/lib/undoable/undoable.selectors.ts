import { createFeatureSelector, createSelector } from '@ngrx/store';
import { History } from './undoable.reducer';

export const selectUndoableState = createFeatureSelector<History>('history');

export const selectPast = createSelector(
    selectUndoableState,
    (history) => history.past
);

export const selectFuture = createSelector(
    selectUndoableState,
    (history) => history.future
);


export const selectHasPast = createSelector(
    selectPast,
    (actions) => Boolean(actions.length)
);

export const selectHasFuture = createSelector(
    selectFuture,
    (actions) => Boolean(actions.length)
);