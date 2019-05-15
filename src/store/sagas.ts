import { all, put, take } from 'redux-saga/effects';

import { moviesSagas } from './movies/sagas';
import { saveStateAppSagas } from './saved-state/sagas';
import { getType } from 'typesafe-actions';
import { init } from './actions';
import { rehydrateState, rehydrateStateDone } from './saved-state/actions';

/**
 * Rehydrate store
 */
export function* watchInit() {
    yield take(getType(init));

    yield put(rehydrateState());
}

/**
 * Act when store is initialized
 */
export function* watchInitDone() {
    yield take(getType(rehydrateStateDone));
}

export default function* rootSaga() {
    yield all([
        ...moviesSagas,
        ...saveStateAppSagas,
        watchInit(),
        watchInitDone()
    ]);
}
