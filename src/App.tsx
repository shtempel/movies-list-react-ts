import { ConnectedRouter } from 'connected-react-router';
import React, { FunctionComponent } from 'react';

import { appHistory } from './store/store';
import routes from './routes';
import { Header, MoviesList } from './components';

import './App.scss';

const App: FunctionComponent = () => {
    return (
        <div className='app column'>
            <Header/>
            <ConnectedRouter history={ appHistory }>{ routes }</ConnectedRouter>
            <MoviesList />
        </div>
    );
};

export default App;
