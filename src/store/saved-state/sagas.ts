import {
    call,
    put,
    select,
    takeEvery,
    throttle
} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {LOCATION_CHANGE, push} from 'connected-react-router';

import * as actions from './actions';
import {AppSavedState} from "../store";
import {localStorageService} from "../../services";
import {selectSavedState} from "./selectors";
import {
    fetchFavoriteMovieSuccess,
    fetchMovieByIdSuccess,
    fetchMovies,
    removeMovieFromFavorites
} from "../movies/actions";

export const saveStateActions: string[] = [
    LOCATION_CHANGE,
    getType(fetchMovieByIdSuccess),
    getType(fetchFavoriteMovieSuccess),
    getType(removeMovieFromFavorites),
    getType(fetchMovies)
];

const SAVE_STATE_THROTTLE = 500;
const STATE_KEY = 'MOVIES_state';

// Restore state

export function* watchRehydrateState() {
    yield takeEvery(getType(actions.rehydrateState), rehydrateState);
}

export function* rehydrateState() {
    const state: AppSavedState = yield call(fetchState);
    console.log('rehydrate');
    if (state) {
        if (state.router) {
            yield put(push(state.router.location.pathname))
        }
        yield put(actions.restoreSavedState(state));
    }

    yield put(actions.rehydrateStateDone());
}

const fetchState = () => localStorageService.getItem(STATE_KEY);

// Saving state

export function* watchSaveState() {
    yield throttle(SAVE_STATE_THROTTLE, saveStateActions, saveState);
}

export function* saveState() {
    const savedState = yield select(selectSavedState);

    yield call([localStorageService, localStorageService.setItem],
        STATE_KEY,
        savedState)
}

export const saveStateAppSagas = [
    watchSaveState(),
    watchRehydrateState()
];
