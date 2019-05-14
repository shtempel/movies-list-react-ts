import {createAction} from 'typesafe-actions';
import {SearchBy} from './reducer';

export const setSearchBy = createAction(
    'SET_SEARCH_BY',
    resolve => (searchBy: SearchBy) => resolve(searchBy)
);
