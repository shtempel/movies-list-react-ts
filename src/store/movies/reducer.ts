import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import * as actions from './actions';
import { restoreSavedState } from '../saved-state/actions';

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

export interface MoviesState {
    isFavoriteLoading: boolean;
    isLoading: boolean;
    queryString: string;
    currentMovieId: string;
    movies: MovieItem[];
    favMovies: MovieItem[];
    currentMovie: MovieItem;
}

export type MoviesAction =
    | ActionType<typeof actions>
    | ActionType<typeof restoreSavedState>;

export const initialState: MoviesState = {
    isFavoriteLoading: false,
    isLoading: false,
    currentMovieId: '',
    queryString: '',
    movies: [],
    favMovies: [],
    currentMovie: {}
};

const reducer: Reducer<MoviesState, MoviesAction> = (state = initialState, action) => {
    switch (action.type) {

        case getType(restoreSavedState): {
            const { movies, currentMovie, favMovies } = action.payload;
            return {
                ...state,
                movies: movies || [],
                currentMovie: currentMovie || {},
                favMovies: favMovies || []
            }
        }

        case getType(actions.setQueryString): {
            return {
                ...state,
                queryString: action.payload
            };
        }

        case getType(actions.fetchFavoriteMovieSuccess): {
            return {
                ...state,
                favMovies: [...state.favMovies, action.payload],
                isFavoriteLoading: false
            }
        }

        case getType(actions.removeMovieFromFavorites): {
            return {
                ...state,
                favMovies: [
                    ...state.favMovies.filter(movie => movie.id !== parseInt(action.payload))
                ]
            }
        }

        case getType(actions.setCurrentMovieId): {
            return {
                ...state,
                currentMovieId: action.payload
            }
        }

        case getType(actions.fetchFavoriteMovie): {
            return {
                ...state,
                isFavoriteLoading: true
            };
        }

        case getType(actions.fetchMovies):
        case getType(actions.fetchMovieById): {
            return {
                ...state,
                isLoading: true
            };
        }

        case getType(actions.fetchMoviesSuccess): {
            return {
                ...state,
                isLoading: false,
                movies: action.payload
            };
        }
        case getType(actions.fetchFavoriteMovieFail): {
            return {
                ...state,
                isFavoriteLoading: false
            };
        }

        case getType(actions.fetchMovieByIdFail):
        case getType(actions.fetchMoviesFail): {
            return {
                ...state,
                isLoading: false
            };
        }

        case getType(actions.fetchMovieByIdSuccess): {
            return {
                ...state,
                currentMovie: action.payload,
                isLoading: false
            };
        }

        case getType(actions.sortByRating): {
            return {
                ...state,
                movies: state.movies.sort((a: any, b: any) => {
                    return a.voteAverage - b.voteAverage;
                })
            };
        }

        case getType(actions.sortByDate): {
            return {
                ...state,
                movies: state.movies.sort((a: any, b: any) => {
                    return parseInt(b.releaseDate) - parseInt(a.releaseDate);
                })
            };
        }

        default: {
            return state;
        }
    }
};

export default reducer;
