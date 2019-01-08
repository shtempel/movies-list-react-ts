import { Action, EmptyAction } from '../store';

export enum MoviesActions {
    FetchMovies = 'FETCH_MOVIES',
    FetchMovieSuccess = 'FETCH_MOVIES_SUCCESS',
    FetchMoviesFail = 'FETCH_MOVIES_FAIL',

    FetchMovieById = 'FETCH_MOVIE_BY_ID ',
    FetchMovieByIdSuccess = 'FETCH_MOVIE_BY_ID_SUCCESS',
    FetchMovieByIdFail = 'FETCH_MOVIE_BY_ID_FAIL',

    SortByDate = 'SORT_BY_DATE',
    SortByRating = 'SORT_BY_RATING'
}

export interface MovieItem {
    id?: number;
    title?: string;
    posterPath?: string;
    releaseDate?: string;
    genres?: string[];
    voteAverage?: number;
    tagLine?: string;
    runtime?: number;
    overview?: string;
}

export interface FetchMoviesPayload {
    searchQuery: string;
    searchBy: string;
}

export interface FetchMovieByIdPayload {
    id: number;
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

export const fetchMovieById = (payload: FetchMovieByIdPayload): Action<FetchMovieByIdPayload> => ({
    type: MoviesActions.FetchMovieById,
    payload
});

export const fetchMovieByIdSuccess = (currentMovie: MovieItem): Action<MovieItem> => ({
    type: MoviesActions.FetchMovieByIdSuccess,
    payload: currentMovie
});

export const fetchMovieByIdFail = (error: Error) => ({
    type: MoviesActions.FetchMovieByIdFail,
    payload: error
});

export const sortByRating = (): EmptyAction => ({
    type: MoviesActions.SortByRating
});

export const sortByDate = (): EmptyAction => ({
    type: MoviesActions.SortByDate
});

export type MoviesActionType =
    | Action<MovieItem[]>
    | Action<MovieItem>
    | Action<Error>
    | EmptyAction
    | Action<string>;
