import { call, put, takeEvery } from 'redux-saga/effects';

import moviesService from './../../services/movies-service';
import { fetchMoviesSuccess, MoviesActions } from './actions';

export function* watchFetchMovies() {
    yield takeEvery(MoviesActions.FetchMovies, fetchMovies);
}

export function* fetchMovies() {
    try {
        const fetchedMovies = yield call([moviesService, moviesService.getMovies]);

        yield put(fetchMoviesSuccess(fetchedMovies));
        console.log(fetchedMovies);
    } catch (error) {
        // yield put(fetchCasesInfoFail(error));
    }
}

// export default function getMoviesSagas() {
//     return [watchFetchMovies()];
// }

export const moviesSagas = [watchFetchMovies()];
