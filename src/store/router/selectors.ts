import { createSelector } from 'reselect';

import { RouterSavedState } from './types';
import { GlobalState } from '../interfaces';

const slice = (state: GlobalState) => state.router;

export const selectCurrentPath = createSelector(
    [slice],
    localization => localization.location.pathname
);

export const selectRouterSavedState = createSelector(
    selectCurrentPath,
    (pathname): RouterSavedState => ({ location: { pathname } })
);
