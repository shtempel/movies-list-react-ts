import { createSelector } from 'reselect';

import { GlobalState } from '../interfaces';

const state = (state: GlobalState) => state;

export const selectSortBy = createSelector(
    state,
    (state) => state.sortBy
);
