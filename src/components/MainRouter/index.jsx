import React from 'react'
import { Switch, Route } from 'react-router'
import PrivateRoute from 'components/PrivateRoute'
import Home from 'views/Home'
import Profile from 'views/Profile'
import Settings from 'views/Settings'

export default class MainRouter extends React.Component {

    render() {
        return (
            <Switch>
                <Route path="/:path(mytables|new|)" component={Home} />
                <PrivateRoute path="/settings" component={Settings} />
                <PrivateRoute path="/profile" component={Profile} />
                <Route exact={true} path="*" render={() => <div>404</div>} />
            </Switch>
        )
    }
}