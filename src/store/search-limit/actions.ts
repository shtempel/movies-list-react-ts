import { createAction } from 'typesafe-actions';
import { Amount } from './reducer';


export const setSearchLimit = createAction(
    'SET_SEARCH_LIMIT',
    resolve => (limit: Amount) => resolve(limit)
);
