import {ERROR, itCreatesAction, itCreatesActionWithPayload, MOVIE_ID, SEARCH_QUERY} from '../../jest/test-helpers';
import * as actions from './actions';

describe('movies actions', () => {

    describe('load movies', () => {
        itCreatesAction('fetch', actions.fetchMovies);
        itCreatesActionWithPayload('fetch success', actions.fetchMoviesSuccess, []);
        itCreatesActionWithPayload('fetch fail', actions.fetchMoviesFail, ERROR);
    });

    describe('load movie by id', () => {
        itCreatesAction('fetch', actions.fetchMovieById);
        itCreatesActionWithPayload('fetch success', actions.fetchMovieByIdSuccess, {});
        itCreatesActionWithPayload('fetch fail', actions.fetchMovieByIdFail, ERROR);
    });

    describe('load favorite movie', () => {
        itCreatesAction('fetch', actions.fetchFavoriteMovie);
        itCreatesActionWithPayload('fetch success', actions.fetchFavoriteMovieSuccess, {});
        itCreatesActionWithPayload('fetch fail', actions.fetchFavoriteMovieFail, ERROR);
    });

    itCreatesActionWithPayload('set query string', actions.setQueryString, SEARCH_QUERY);

    itCreatesActionWithPayload('set current movie id', actions.setQueryString, MOVIE_ID);

    itCreatesActionWithPayload('remove movie from favorites', actions.removeMovieFromFavorites, MOVIE_ID);

    describe('sorting', () => {
        itCreatesAction('sort by rating', actions.sortByRating);
        itCreatesAction('sort by date', actions.sortByDate);
    });
});
