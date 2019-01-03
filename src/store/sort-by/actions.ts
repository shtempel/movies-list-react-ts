import { Action } from '../store';

export enum SortByActions {
    SetSortBy = 'SET_SORT_BY'
}

export const setSortBy = (sortBy: string) => ({
    type: SortByActions.SetSortBy,
    payload: sortBy
});

export type SortByActionType = Action<string>;
