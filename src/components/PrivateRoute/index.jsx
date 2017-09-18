import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'

@withRouter
@connect(store => ({
    user: store.user
}))
export default class PrivateRoute extends React.Component {
    render() {
        const { user } = this.props
        
        return user.loggedIn ? <Route {...this.props} /> : <Redirect to="/" />
    }
}