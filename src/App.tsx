import { ConnectedRouter } from 'connected-react-router';
import React, { FunctionComponent } from 'react';

import { appHistory } from './store/store';
import routes from './routes';
import { Header } from './components';

import './App.scss';

const App: FunctionComponent = () => {
    return (
        <div className='app'>
            <Header />
            <ConnectedRouter history={ appHistory }>{ routes }</ConnectedRouter>
        </div>
    );
};

export default App;
