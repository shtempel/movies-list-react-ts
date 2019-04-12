import { createAction } from 'typesafe-actions';

export const setSortBy = createAction(
    'SET_SORT_BY',
    resolve => (sortBy: string) => resolve(sortBy)
);
