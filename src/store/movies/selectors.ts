import { createSelector } from 'reselect';
import { GlobalState } from '../store';

export const getMoviesState = (state: GlobalState) => state.moviesState;

export const getMovies = createSelector(
    getMoviesState,
    state => state.movies
);

export const getCurrentMovie = createSelector(
    getMoviesState,
    state => state.currentMovie
);

export const getMoviesQuantity = createSelector(
    getMovies,
    state => state.length
);