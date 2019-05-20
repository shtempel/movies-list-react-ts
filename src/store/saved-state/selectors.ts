import { createSelector } from 'reselect';
import { selectLanguage } from '../language/selectors';
import { selectRouterSavedState } from '../router/selectors';
import { selectCurrentMovie, selectFavorites, selectMovies } from '../movies/selectors';

export const selectSavedState = createSelector(
    [selectRouterSavedState, selectCurrentMovie, selectMovies, selectFavorites, selectLanguage],
    (router, currentMovie, movies, favMovies, language) => ({
        router, currentMovie, movies, favMovies, language
    })
);
