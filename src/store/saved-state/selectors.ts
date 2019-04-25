import {createSelector} from 'reselect';
import {selectRouterSavedState} from "../router/selectors";
import {selectCurrentMovie, selectFavorites, selectMovies} from "../movies/selectors";

export const selectSavedState = createSelector(
    [selectRouterSavedState, selectCurrentMovie, selectMovies, selectFavorites],
    (router, currentMovie, movies, favMovies) => ({
        router, currentMovie, movies, favMovies
    })
);