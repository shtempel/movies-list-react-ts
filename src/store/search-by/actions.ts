import { Action } from '../store';

export enum SearchByActions {
    SetSearchBy = 'SET_SEARCH_BY'
}

export const setSearchBy = (searchBy: string) => ({
    type: SearchByActions.SetSearchBy,
    payload: searchBy
});

export type SearchByActionType = Action<string>;
