import { ConnectedRouter } from 'connected-react-router';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import Header from './components/header/header';
import MoviesList from './components/movies-list/movies-list';
import { appHistory } from './store/store';
import routes from './routes';
import { GlobalState } from './store/interfaces';
import { selectCurrentPath } from './store/router/selectors';

import './App.scss';

const App: FC = () => {
    const pathname = useSelector<GlobalState, string>(selectCurrentPath);
    const isCountries: boolean = !pathname.includes('countries');

    return (
        <div className='app column'>
            { isCountries && <Header pathname={ pathname }/> }
            <ConnectedRouter history={ appHistory }>{ routes }</ConnectedRouter>
            { isCountries && <MoviesList/> }
        </div>
    );
};

export default App;
