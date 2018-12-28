import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createHashHistory, History } from 'history';
import thunk from 'redux-thunk';

import reducers from './reducers';

export interface EmptyAction {
  type: string;
}

export interface Action<TPayload> extends EmptyAction {
  payload: TPayload;
}

export const appHistory = createHashHistory();

const middleware: any[] = [thunk, routerMiddleware(appHistory)];

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
