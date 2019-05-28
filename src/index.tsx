import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store/store';
import App from './App';
import { init } from './store/actions';
import { initTranslationService } from './services';
import { Loader } from './components';

import './index.scss';

const loader = <Loader/>;

store.dispatch(init());
initTranslationService().init({ lng: store.getState().language });

ReactDOM.render(
    <Provider store={ store }>
        <Suspense fallback={ loader }>
            <App/>
        </Suspense>
    </Provider>,
    document.getElementById('root'));
