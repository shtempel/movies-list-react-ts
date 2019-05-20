import { createSelector } from 'reselect';

import { GlobalState } from '../interfaces';

const state = (state: GlobalState) => state;

export const selectSearchLimit = createSelector(
    state,
    (state) => state.searchLimit
);
