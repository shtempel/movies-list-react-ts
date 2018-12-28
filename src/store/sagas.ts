import { call, takeEvery } from 'redux-saga/effects';

import moviesService from './../services/movies-service';
import { MoviesActions } from './movies/actions';

export function* watchFetchMovies() {
    yield takeEvery(MoviesActions.FetchMovies, fetchMovies);
}

export function* fetchMovies() {
    try {
        const fetchedMovies = yield call([moviesService, moviesService.getMovies]);

        // yield put(fetchCasesInfoSuccess(groupedCases));
    } catch (error) {
        // yield put(fetchCasesInfoFail(error));
    }
}
