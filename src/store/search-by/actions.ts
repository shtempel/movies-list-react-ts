import { createAction } from 'typesafe-actions';

export const setSearchBy = createAction(
    'SET_SEARCH_BY',
    resolve => (searchBy: string) => resolve(searchBy)
);
