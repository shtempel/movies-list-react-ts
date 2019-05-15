import { createSelector } from 'reselect';

import {GlobalState} from '../store';
import { RouterSavedState } from './types';

const slice = (state: GlobalState) => state.router;

export const selectCurrentPath = createSelector(
    [slice],
    localization => localization.location.pathname
);

export const selectRouterSavedState = createSelector(
    selectCurrentPath,
    (pathname): RouterSavedState => ({ location: { pathname } })
);
