import { createAction } from 'typesafe-actions';

import { SortByEnum } from './reducer';

export const setSortBy = createAction(
    'SET_SORT_BY',
    resolve => (sortBy: SortByEnum) => resolve(sortBy)
);
