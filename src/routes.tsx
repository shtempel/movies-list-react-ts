import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { Home } from './pages';

const routes = (
    <div>
        <Switch>
            <Route exact path="/home" component={ Home }/>
            <Redirect to="/home"/>
        </Switch>
    </div>
);

export default routes;
