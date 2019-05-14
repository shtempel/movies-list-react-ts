import { createAction } from 'typesafe-actions';

import {Amount} from '../../components/results-amount-controller/results-amount-controller';

export const setSearchLimit= createAction(
    'SET_SEARCH_LIMIT',
    resolve => (limit: Amount) => resolve(limit)
);
