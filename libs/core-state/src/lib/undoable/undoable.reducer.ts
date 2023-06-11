/* eslint-disable no-case-declarations */
import { Action, ActionReducer } from '@ngrx/store';
import { UndoableAction, UndoableActionTypes } from './undoable.actions';
export interface UndoableState {
    history?: History;
}

export interface History {
    past: UndoableAction[],
    future: UndoableAction[],
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const undoable = (reducer: ActionReducer<any>): ActionReducer<UndoableState> => {
    const initialState: UndoableState = {
        ...reducer(undefined, {} as Action),
        history: {
            past: [],
            future: []
        }
    };
    return function (state: UndoableState = initialState, action: UndoableAction) {
        const { past, future } = state.history;
        switch (action.type) {
            case UndoableActionTypes.Add:
                return {
                    ...reducer(state, action),
                    history: {
                        past: [...past, { ...action.payload, future: action.future }],
                        future: []
                    }
                }
            case UndoableActionTypes.Undo: {
                const newPast = past.slice(0, past.length - 1);
                const newFuture = [past[past.length - 1], ...future];
                return {
                    ...reducer(state, action),
                    history: {
                        past: newPast,
                        future: newFuture
                    },
                };
            }
            case UndoableActionTypes.Redo: {
                const newPast = [...past, future[0]];
                const newFuture = future.slice(1);
                return {
                    ...reducer(state, action),
                    history: {
                        past: newPast,
                        future: newFuture
                    }
                }
            }
            default:
                return {
                    ...reducer(state, action),
                    history: {
                        past,
                        future
                    }
                }
        }
    }
}