import { createSelector } from 'reselect';
import moment from 'moment';

import { GlobalState } from '../interfaces';

export const moviesState = (state: GlobalState) => state.moviesState;

export const selectMovies = createSelector(
    [moviesState],
    moviesState => moviesState.movies
);

export const selectFavorites = createSelector(
    [moviesState],
    moviesState => moviesState.favMovies
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

export const selectFavMoviesQuantity = createSelector(
    [selectFavorites],
    favs => favs.length
);

export const selectSearchQuery = createSelector(
    [moviesState],
    moviesState => moviesState.queryString
);

export const selectCurrentMovieId = createSelector(
    [moviesState],
    moviesState => moviesState.currentMovieId
);

export const selectIsFavMoviesNearRelease = createSelector(
    [selectFavorites],
    favs => favs.some(
        favItem => moment(favItem.releaseDate).toDate().getFullYear() === moment().toDate().getFullYear()
    )
);
