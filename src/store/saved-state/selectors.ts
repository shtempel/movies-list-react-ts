import { createSelector } from 'reselect';
import { selectLocale } from '../language/selectors';
import { selectRouterSavedState } from '../router/selectors';
import { selectCurrentMovie, selectFavorites, selectMovies } from '../movies/selectors';

export const selectSavedState = createSelector(
    [selectRouterSavedState, selectCurrentMovie, selectMovies, selectFavorites, selectLocale],
    (router, currentMovie, movies, favMovies, locale) => ({
        router, currentMovie, movies, favMovies, locale
    })
);
