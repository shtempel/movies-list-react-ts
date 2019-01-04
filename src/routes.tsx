import React from 'react';
import { Route, Switch } from 'react-router';

import { Home } from './pages';

const routes = (
    <div>
        <Switch>
            <Route path="/" component={ Home }/>
            <Route path="/search/:searchQuery" component={ Home }/>
        </Switch>
    </div>
);

export default routes;
