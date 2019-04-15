import {createSelector} from 'reselect';

import {GlobalState} from '../store';

const state = (state: GlobalState) => state;

export const selectSearchLimit = createSelector(
    state,
    (state) => state.searchLimit
);
