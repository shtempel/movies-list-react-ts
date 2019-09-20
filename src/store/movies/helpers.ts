import { MovieItem, MoviesState } from './reducer';

export const sortBy = (state: MoviesState, tab: string, sortBy: string): MoviesState => {
    return sortBy === 'date'
        ? tab === 'movies'
            ? {
                ...state,
                movies: state.movies.sort((a: MovieItem, b: MovieItem) => {
                    return parseInt(b.releaseDate!) - parseInt(a.releaseDate!);
                })
            }
            : {
                ...state,
                favMovies: state.favMovies.sort((a: MovieItem, b: MovieItem) => {
                    return parseInt(b.releaseDate!) - parseInt(a.releaseDate!);
                })
            }
        : tab === 'movies'
            ? {
                ...state,
                movies: state.movies.sort((a: MovieItem, b: MovieItem) => {
                    return b.voteAverage! - a.voteAverage!;
                })
            }
            : {
                ...state,
                favMovies: state.favMovies.sort((a: MovieItem, b: MovieItem) => {
                    return b.voteAverage! - a.voteAverage!;
                })
            }
};
