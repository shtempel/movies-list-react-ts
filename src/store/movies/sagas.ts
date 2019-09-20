import { call, put, select, throttle } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { getType } from 'typesafe-actions';

import * as actions from './actions';
import { selectSearchBy } from '../search-by/selectors';
import { selectCurrentMovieId, selectSearchQuery } from './selectors';
import { selectSearchLimit } from '../search-limit/selectors';
import { moviesService } from '../../services';

export function* watchFetchMovies() {
    yield throttle(1000, getType(actions.fetchMovies), fetchMovies);
}

export function* fetchMovies() {
    yield call(delay, 1000);
    try {
        const searchQuery = yield select(selectSearchQuery);
        const searchBy = yield select(selectSearchBy);
        const limit = yield select(selectSearchLimit);
        const fetchedMovies = yield call([ moviesService, moviesService.getMovies ], searchQuery, searchBy, limit);
        yield put(actions.fetchMoviesSuccess(fetchedMovies));
    } catch (error) {
        yield put(actions.fetchMoviesFail(error));
    }
}

export function* watchFetchMovieById() {
    yield throttle(1000, getType(actions.fetchMovieById), fetchMovieById);
}

export function* fetchMovieById() {
    try {
        const movieId = yield select(selectCurrentMovieId);
        const fetchedMovie = yield call([ moviesService, moviesService.getMovieById ], movieId);
        yield put(actions.fetchMovieByIdSuccess(fetchedMovie));
    } catch (error) {
        yield put(actions.fetchMovieByIdFail(error));
    }
}

export function* watchFetchFavMovie() {
    yield throttle(1000, getType(actions.fetchFavoriteMovie), fetchFavoriteMovie);
}

export function* fetchFavoriteMovie() {
    try {
        const movieId = yield select(selectCurrentMovieId);
        const fetchedMovie = yield call([ moviesService, moviesService.getMovieById ], movieId);
        yield put(actions.fetchFavoriteMovieSuccess(fetchedMovie));
    } catch (error) {
        yield put(actions.fetchFavoriteMovieFail(error));
    }
}

export const moviesSagas = [
    watchFetchMovies(),
    watchFetchMovieById(),
    watchFetchFavMovie()
];
