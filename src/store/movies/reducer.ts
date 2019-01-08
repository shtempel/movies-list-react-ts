import { Reducer } from 'redux';
import { MovieItem, MoviesActions, MoviesActionType } from './actions';
import { Action } from '../store';

export interface MoviesState {
    isLoading: boolean;
    movies: MovieItem[];
    currentMovie: MovieItem;
}

export const initialState: MoviesState = {
    isLoading: false,
    movies: [],
    currentMovie: {}
};

const reducer: Reducer<MoviesState, MoviesActionType> = (
    state = initialState,
    action: MoviesActionType
) => {
    switch (action.type) {
        case MoviesActions.FetchMovies: {
            return {
                ...state,
                isLoading: true
            }
        }

        case MoviesActions.FetchMovieSuccess: {
            const { payload: movies } = action as Action<MovieItem[]>;
            return {
                ...state,
                isLoading: false,
                movies
            }
        }

        case MoviesActions.FetchMoviesFail: {
            return {
                ...state,
                isLoading: false
            }
        }

        case MoviesActions.FetchMovieById: {
            return {
                ...state,
                isLoading: true
            }
        }

        case MoviesActions.FetchMovieByIdSuccess: {
            const { payload: currentMovie } = action as Action<MovieItem>;
            return {
                ...state,
                currentMovie,
                isLoading: false
            }
        }

        case MoviesActions.FetchMovieByIdFail: {
            return {
                ...state,
                isLoading: false
            };
        }

        case MoviesActions.SortByRating: {
            return {
                ...state,
                movies: state.movies.sort((a: any, b: any) => {
                    return a.voteAverage - b.voteAverage;
                })
            };
        }

        case MoviesActions.SortByDate: {
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
