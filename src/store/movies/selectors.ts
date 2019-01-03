import { createSelector } from 'reselect';
import { GlobalState } from "../store";

export const getMoviesState = (state: GlobalState) => state;

export const getMovies = createSelector(
    getMoviesState,
    state => state.moviesState.movies
);

export const getMoviesQuantity = createSelector(
    getMovies,
    state => state.length
);