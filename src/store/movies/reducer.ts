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
        case MoviesActions.FetchMovieSuccess: {
            const { payload: movies } = action as Action<MovieItem[]>;
            return {
                ...state,
                movies
            }
        }

        case MoviesActions.FetchMovieByIdSuccess: {
            const { payload: currentMovie } = action as Action<MovieItem>;
            return {
                ...state,
                currentMovie
            }
        }

        default: {
            return state;
        }
    }
};

export default reducer;
