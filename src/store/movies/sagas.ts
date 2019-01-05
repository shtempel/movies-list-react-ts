import { call, put, takeEvery } from 'redux-saga/effects';

import moviesService from './../../services/movies-service';
import {
    fetchMovieByIdFail,
    FetchMovieByIdPayload, fetchMovieByIdSuccess,
    fetchMoviesFail,
    FetchMoviesPayload,
    fetchMoviesSuccess,
    MoviesActions
} from './actions';
import { Action } from "../store";

export function* watchFetchMovies() {
    yield takeEvery(MoviesActions.FetchMovies, fetchMovies);
}

export function* fetchMovies(action: Action<FetchMoviesPayload>) {
    try {
        const fetchedMovies = yield call(
            [moviesService, moviesService.getMovies], action.payload.searchQuery, action.payload.searchBy);
        yield put(fetchMoviesSuccess(fetchedMovies));
    } catch (error) {
        yield put(fetchMoviesFail(error));
    }
}

export function* watchFetchMovieById() {
    yield takeEvery(MoviesActions.FetchMovieById, fetchMovieById);
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
