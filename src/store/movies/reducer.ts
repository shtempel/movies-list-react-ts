import { Reducer } from 'redux';
import { MovieItem, MoviesActions, MoviesActionType } from './actions';
import { Action } from '../store';

export interface MoviesState {
    isLoading: boolean;
    movies: MovieItem[];
}

export const initialState: MoviesState = {
    isLoading: false,
    movies: []
};

const reducer: Reducer<MoviesState, MoviesActionType> = (
    state = initialState,
    action: MoviesActionType
) => {
    switch (action.type) {
        case MoviesActions.FetchMovieSuccess: {
            const { payload: movies } = action as Action<MovieItem[]>;
            console.log(action.payload);
            return {
                ...state,
                movies
            }
        }

        default: {
            return state;
        }
    }
};

export default reducer;
