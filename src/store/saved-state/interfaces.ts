import { RouterSavedState } from '../router/types';
import { MovieItem } from '../movies/reducer';

export interface AppSavedState {
    router?: RouterSavedState;
    favMovies?: MovieItem[];
    currentMovie?: MovieItem;
    movies?: MovieItem[];
    language: string;
}
