import { createAction } from 'typesafe-actions';

import { MovieItem } from './reducer';

export const setQueryString = createAction(
    'SET_QUERY_STRING',
    resolve => (queryString: string) => resolve(queryString)
);

export const setCurrentMovieId = createAction(
    'SET_CURRENT_MOVIE_ID',
    resolve => (id: string) => resolve(id)
);

export const fetchMovies = createAction('FETCH_MOVIES');

export const fetchMoviesSuccess = createAction(
    'FETCH_MOVIES_SUCCESS',
    resolve => (movies: MovieItem[]) => resolve(movies)
);

export const fetchMoviesFail = createAction(
    'FETCH_MOVIES_FAIL',
    resolve => (payload: Error) => resolve(payload)
);

export const fetchMovieById = createAction('FETCH_MOVIE_BY_ID ');

export const fetchMovieByIdSuccess = createAction(
    'FETCH_MOVIE_BY_ID_SUCCESS',
    resolve => (currentMovie: MovieItem) => resolve(currentMovie)
);

export const fetchMovieByIdFail = createAction(
    'FETCH_MOVIE_BY_ID_FAIL',
    resolve => (payload: Error) => resolve(payload)
);

export const sortByRating = createAction(
    'SORT_BY_RATING',
    resolve => (tab: string) => resolve(tab)
);

export const sortByDate = createAction(
    'SORT_BY_DATE',
    resolve => (tab: string) => resolve(tab)
);

export const fetchFavoriteMovie = createAction('FETCH_FAVORITE_MOVIE');

export const fetchFavoriteMovieSuccess = createAction(
    'FETCH_FAVORITE_MOVIE_SUCCESS',
    resolve => (movieItem: MovieItem) => resolve(movieItem)
);

export const fetchFavoriteMovieFail = createAction(
    'FETCH_FAVORITE_MOVIE_FAIL',
    resolve => (payload: Error) => resolve(payload)
);

export const removeMovieFromFavorites = createAction(
    'REMOVE_MOVIE_FROM_FAVORITES',
    resolve => (id: string) => resolve(id)
);
