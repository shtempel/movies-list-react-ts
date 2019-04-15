import { createAction } from 'typesafe-actions';

export const setSearchLimit= createAction(
    'SET_SEARCH_LIMIT',
    resolve => (limit: string) => resolve(limit)
);
