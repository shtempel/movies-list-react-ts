import { createAction } from 'typesafe-actions';

export * from './movies/actions';
export * from './sort-by/actions';
export * from './search-by/actions';


export const init = createAction('INIT');