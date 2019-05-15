import { ConnectedRouter } from 'connected-react-router';
import React from 'react';

import { Footer } from './components';
import { appHistory } from './store/store';
import routes from './routes';

import './App.scss';

const App = () => {

    return (
        <div className='app'>
            <ConnectedRouter history={ appHistory }>{ routes }</ConnectedRouter>
            <Footer/>
        </div>
    );
};

export default App;
