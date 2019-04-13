import {createSelector} from 'reselect';

import {GlobalState} from '../store';

export const moviesState = (state: GlobalState) => state.moviesState;

export const selectMovies = createSelector(
    [moviesState],
    moviesState => moviesState.movies
);

export const selectIsLoading = createSelector(
    [moviesState],
    moviesState => moviesState.isLoading
);

export const selectCurrentMovie = createSelector(
    [moviesState],
    moviesState => moviesState.currentMovie
);

export const selectMoviesQuantity = createSelector(
    [selectMovies],
    movies => movies.length
);

export const selectSearchQuery = createSelector(
    [moviesState],
    moviesState => moviesState.queryString
);

export const selectCurrentMovieId = createSelector(
    [moviesState],
    moviesState => moviesState.currentMovieId
);