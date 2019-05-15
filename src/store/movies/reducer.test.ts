import reducer, { initialState, MoviesState } from './reducer';
import { ERROR, MOVIE_ID, SEARCH_QUERY } from '../../jest/test-helpers';
import * as actions from './actions';
import {
    favMoviesStub,
    moviesStateStub,
    moviesStub,
    moviesStubSortedByDate,
    moviesStubSortedByRating
} from '../../jest/stubs';
import { restoreSavedState } from '../saved-state/actions';
import { AppSavedState } from '../store';

describe('movies state reducer', () => {
    test('returns the initial state', () => {
        expect(reducer(undefined, {} as any)).toEqual(initialState);
    });

    test('sets query string', () => {
        const expected: Partial<MoviesState> = { queryString: SEARCH_QUERY };
        const actual = reducer(initialState, actions.setQueryString(SEARCH_QUERY));

        expect(actual).toMatchObject(expected);
    });

    describe('sorting', () => {
        test('by rating', () => {
            const expected: Partial<MoviesState> = { movies: moviesStubSortedByRating };
            const actual = { movies: reducer(moviesStateStub, actions.sortByRating()).movies };

            expect(actual).toMatchObject(expected);
        });

        test('by date', () => {
            const expected: Partial<MoviesState> = { movies: moviesStubSortedByDate };
            const actual = { movies: reducer(moviesStateStub, actions.sortByDate()).movies };

            expect(actual).toMatchObject(expected);
        });
    });

    describe('loading flags', () => {
        test('fetching favorite movie flag', () => {
            const expected: Partial<MoviesState> = { isFavoriteLoading: true };
            const actual = reducer(initialState, actions.fetchFavoriteMovie());

            expect(actual).toMatchObject(expected);
        });

        test('fetching favorite movie fail flag', () => {
            const expected: Partial<MoviesState> = { isFavoriteLoading: false };
            const actual = reducer(initialState, actions.fetchFavoriteMovieFail(ERROR));

            expect(actual).toMatchObject(expected);
        });

        test('fetching movies flag', () => {
            const expected: Partial<MoviesState> = { isLoading: true };
            const actual = reducer(initialState, actions.fetchMovies());

            expect(actual).toMatchObject(expected);
        });

        test('fetching movies fail flag', () => {
            const expected: Partial<MoviesState> = { isLoading: false };
            const actual = reducer(initialState, actions.fetchMoviesFail(ERROR));

            expect(actual).toMatchObject(expected);
        });

        test('fetching movie by id flag', () => {
            const expected: Partial<MoviesState> = { isLoading: true };
            const actual = reducer(initialState, actions.fetchMovieById());

            expect(actual).toMatchObject(expected);
        });

        test('fetching movie by id fail flag', () => {
            const expected: Partial<MoviesState> = { isLoading: false };
            const actual = reducer(initialState, actions.fetchMovieByIdFail(ERROR));

            expect(actual).toMatchObject(expected);
        });
    });

    test('fetch movies success', () => {
        const expected: Partial<MoviesState> = { movies: moviesStub, isLoading: false };
        const actual = reducer(initialState, actions.fetchMoviesSuccess(moviesStub));

        expect(actual).toMatchObject(expected);
    });

    test('fetch movie by id success', () => {
        const expected: Partial<MoviesState> = { currentMovie: moviesStub[0], isLoading: false };
        const actual = reducer(initialState, actions.fetchMovieByIdSuccess(moviesStub[0]));

        expect(actual).toMatchObject(expected);
    });

    test('fetch favorite movie success', () => {
        const expected: Partial<MoviesState> = { favMovies: [favMoviesStub[0]], isFavoriteLoading: false };
        const actual = reducer(initialState, actions.fetchFavoriteMovieSuccess(favMoviesStub[0]));

        expect(actual).toMatchObject(expected);
    });

    test('restore saved state', () => {
        const savedState: AppSavedState = {
            favMovies: [favMoviesStub[0]],
            movies: moviesStub,
            currentMovie: moviesStub[0]
        };
        const expected: Partial<MoviesState> = {
            favMovies: [favMoviesStub[0]],
            movies: moviesStub,
            currentMovie: moviesStub[0]
        };
        const actual = reducer(initialState, restoreSavedState(savedState));

        expect(actual).toMatchObject(expected);
    });

    test('set current movie id', () => {
        const expected: Partial<MoviesState> = { currentMovieId: MOVIE_ID };
        const actual = reducer(initialState, actions.setCurrentMovieId(MOVIE_ID));

        expect(actual).toMatchObject(expected);
    });

    test('remove movie from favorites', () => {
        const expected: Partial<MoviesState> = { favMovies: [] };
        initialState.favMovies = [favMoviesStub[0]];
        const actual = reducer(initialState, actions.removeMovieFromFavorites('299534'));

        expect(actual).toMatchObject(expected);
    });
});
