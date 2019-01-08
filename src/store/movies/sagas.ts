import { call, put, throttle } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import moviesService from './../../services/movies-service';
import {
    fetchMovieByIdFail,
    FetchMovieByIdPayload, fetchMovieByIdSuccess,
    fetchMoviesFail,
    FetchMoviesPayload,
    fetchMoviesSuccess,
    MoviesActions
} from './actions';
import { Action } from '../store';

export function* watchFetchMovies() {
    yield throttle(1000, MoviesActions.FetchMovies, fetchMovies);
}

export function* fetchMovies(action: Action<FetchMoviesPayload>) {
    yield call(delay, 1000);
    try {
        const fetchedMovies = yield call(
            [moviesService, moviesService.getMovies], action.payload.searchQuery, action.payload.searchBy);
        yield put(fetchMoviesSuccess(fetchedMovies));
    } catch (error) {
        yield put(fetchMoviesFail(error));
    }
}

export function* watchFetchMovieById() {
    yield throttle(1000, MoviesActions.FetchMovieById, fetchMovieById);
}

export function* fetchMovieById(action: Action<FetchMovieByIdPayload>) {
    try {
        const fetchedMovie = yield call([moviesService, moviesService.getMovieById], action.payload.id);
        yield put(fetchMovieByIdSuccess(fetchedMovie));
    } catch (error) {
        yield put(fetchMovieByIdFail(error));
    }
}


export const moviesSagas = [watchFetchMovies(), watchFetchMovieById()];
