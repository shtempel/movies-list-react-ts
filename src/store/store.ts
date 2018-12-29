import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createHashHistory, History } from 'history';
import createSagaMiddleware from 'redux-saga';

import { MoviesState } from './movies/reducer';
import reducers from './reducers';
import rootSaga from './sagas';

export interface GlobalState {
    movies: MoviesState;
}

export interface EmptyAction {
    type: string;
}

export interface Action<TPayload> extends EmptyAction {
    payload: TPayload;
}

export const appHistory = createHashHistory();
export const sagaMiddleware = createSagaMiddleware();

const middleware: any[] = [sagaMiddleware, routerMiddleware(appHistory)];

const rootReducer = (history: History) =>
    combineReducers({
        ...reducers,
        router: connectRouter(history)
    });

const composeEnhancer: typeof compose =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer(appHistory),
    composeEnhancer(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);
