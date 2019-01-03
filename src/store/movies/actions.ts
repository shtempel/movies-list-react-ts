import { Action } from '../store';

export enum MoviesActions {
    FetchMovies = 'FETCH_MOVIES',
    FetchMovieSuccess = 'FETCH_MOVIES_SUCCESS',
    FetchMoviesFail = 'FETCH_MOVIES_FAIL',
}

export interface MovieItem {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    genres: string[];
    vote_average: number;
    tagline: string;
    runtime: number;
    overview: string;
}

export interface FetchMoviesPayload {
    searchQuery: string;
    searchBy: string;
}

export const fetchMovies = (payload: FetchMoviesPayload): Action<FetchMoviesPayload> => ({
    type: MoviesActions.FetchMovies,
    payload
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
