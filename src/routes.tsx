import React from 'react';
import { Route, Switch } from 'react-router';

import { Home, DetailedInfo } from './pages';

const routes = (
    <div>
        <Switch>
            <Route exact path='/' component={ Home }/>
            <Route path='/search/:searchQuery' component={ Home }/>
            <Route path='/movie/:id' component={ DetailedInfo }/>
        </Switch>
    </div>
);

export default routes;
