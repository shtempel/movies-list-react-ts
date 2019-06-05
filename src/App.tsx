import { ConnectedRouter, push } from 'connected-react-router';
import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { appHistory } from './store/store';
import routes from './routes';
import { Header, MoviesList } from './components';
import { GlobalState } from './store/interfaces';
import { selectCurrentPath } from './store/router/selectors';

import './App.scss';

interface AppProps {
    pathname: string;

    push(path: string): void;
}

const App: FunctionComponent<AppProps> = (props: AppProps) => {
    const isCountries: boolean = !props.pathname.includes('countries');

    return (
        <div className='app column'>
            { isCountries && <Header push={ props.push } pathname={ props.pathname }/> }
            <ConnectedRouter history={ appHistory }>{ routes }</ConnectedRouter>
            { isCountries && <MoviesList/> }
        </div>
    );
};

export default connect(
    (state: GlobalState) => ({ pathname: selectCurrentPath(state) }),
    { push }
)(App);
