import { ConnectedRouter } from 'connected-react-router';
import React, { Component } from 'react';

import { Footer } from './components/index';
import { appHistory } from './store/store';
import routes from './routes';
import './App.scss';

class App extends Component {
    render() {
        return (
            <div className='app'>
                <ConnectedRouter history={ appHistory }>{ routes }</ConnectedRouter>
                <Footer/>
            </div>
        );
    }
}

export default App;
