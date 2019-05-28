import * as selectors from './selectors';
import { MoviesState } from './reducer';
import { getRootReducer, MOVIE_ID, SEARCH_QUERY } from '../../jest/test-helpers';
import { favMoviesStub, moviesStateStub, moviesStub } from '../../jest/stubs';
import { GlobalState } from '../interfaces';

describe('movies selectors', () => {
    const rootReducer = getRootReducer();
    let state: GlobalState;

    const mutateSliceState = (
        rootState: GlobalState,
        change: Partial<MoviesState>
    ): GlobalState => ({
        ...rootState,
        moviesState: {
            ...rootState.moviesState,
            ...change
        }
    });

    beforeEach(() => {
        state = rootReducer(undefined, {} as any);
    });

    test('selectIsLoading selects movies loading flag', () => {
        const testState = mutateSliceState(state, { isLoading: true });
        const actual = selectors.selectIsLoading(testState);

        expect(actual).toBe(true);
    });

    test('selectMovies selects movies', () => {
        const testState = mutateSliceState(state, moviesStateStub);
        const actual = selectors.selectMovies(testState);

        expect(actual).toEqual(moviesStub);
    });

    test('selectCurrentMovie selects current movie', () => {
        const currentMovie = moviesStub[0];
        const testState = mutateSliceState(state, { currentMovie: currentMovie });
        const actual = selectors.selectCurrentMovie(testState);

        expect(actual).toEqual(moviesStub[0]);
    });

    test('selectMoviesQuantity selects movies quantity', () => {
        const testState = mutateSliceState(state, moviesStateStub);
        const moviesQuantity = moviesStateStub.movies.length;
        const actual = selectors.selectMoviesQuantity(testState);

        expect(actual).toEqual(moviesQuantity);
    });

    test('selectSearchQuery selects search query', () => {
        const testState = mutateSliceState(state, { queryString: SEARCH_QUERY });
        const actual = selectors.selectSearchQuery(testState);

        expect(actual).toEqual(SEARCH_QUERY);
    });

    test('selectCurrentMovieId selects current movie id', () => {
        const testState = mutateSliceState(state, { currentMovieId: MOVIE_ID });
        const actual = selectors.selectCurrentMovieId(testState);

        expect(actual).toEqual(MOVIE_ID);
    });

    test('selectFavorites selects favorites movies', () => {
        const testState = mutateSliceState(state, { favMovies: favMoviesStub });
        const actual = selectors.selectFavorites(testState);

        expect(actual).toEqual(favMoviesStub);
    });
});
