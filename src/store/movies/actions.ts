import { Action } from '../store';

export enum MoviesActions {
    FetchMovies = 'FETCH_MOVIES',
    FetchMovieSuccess = 'FETCH_MOVIES_SUCCESS',
    FetchMoviesFail = 'FETCH_MOVIES_FAIL',
}

export interface MovieItem {
    title: string;
    movieId: number;
    posterPath: string;
    releaseDate: string;
    genres: string[];
}

export const fetchMovies = (queryString: string): Action<string> => ({
    type: MoviesActions.FetchMovies,
    payload: queryString
});

export const fetchMoviesSuccess = (movies: MovieItem[]): Action<MovieItem[]> => ({
    type: MoviesActions.FetchMovieSuccess,
    payload: movies
});

export const fetchMoviesFail = (error: Error) => ({
    type: MoviesActions.FetchMoviesFail,
    payload: error
});

export type MoviesActionType =
    | Action<MovieItem[]>
    | Action<Error>
    | Action<string>;
