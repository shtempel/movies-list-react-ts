import { all } from 'redux-saga/effects';
import { moviesSagas } from './movies/sagas';

export default function* rootSaga() {
    yield all([...moviesSagas]);
}
