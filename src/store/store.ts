import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createHashHistory, History } from 'history';
import createSagaMiddleware from 'redux-saga';

import { MovieItem, MoviesState } from './movies/reducer';
import reducers from './reducers';
import rootSaga from './sagas';
import { RouterSavedState } from './router/types';

export interface Router {
    action: string;
    location: {
        hash: string;
        pathname: string;
        search: string;
        state: any;
    };
}

export interface AppSavedState {
    router?: RouterSavedState;
    favMovies?: MovieItem[];
    currentMovie?: MovieItem;
    movies?: MovieItem[];
    locale: string;
}

export interface GlobalState extends AppSavedState {
    moviesState: MoviesState;
    searchBy: string;
    sortBy: string;
    searchLimit: string;
    router: Router;
    locale: string;
}

export const appHistory = createHashHistory();

export const sagaMiddleware = createSagaMiddleware();

const middleware: any[] = [sagaMiddleware, routerMiddleware(appHistory)];

export const rootReducer = (history: History) =>
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
