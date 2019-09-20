import { AppSavedState } from './saved-state/interfaces';
import { MoviesState } from './movies/reducer';
import { Router } from './router/interfaces';

export interface GlobalState extends AppSavedState {
    moviesState: MoviesState;
    searchBy: string;
    sortBy: string;
    searchLimit: string;
    router: Router;
    language: string;
}

export enum Tabs {
    movies = 'movies',
    favorites = 'favMovies'
}
