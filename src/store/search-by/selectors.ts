import { createSelector } from 'reselect';

import { GlobalState } from '../interfaces';

const state = (state: GlobalState) => state;

export const selectSearchBy = createSelector(
    state,
    (state) => state.searchBy
);
