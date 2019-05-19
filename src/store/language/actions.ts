import { createAction } from 'typesafe-actions';

export const setLocale = createAction(
    'SET_LANGUAGE',
    resolve => (locale: string) => resolve(locale)
);
