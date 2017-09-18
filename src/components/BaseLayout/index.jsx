import React from 'react'
import { MuiThemeProvider } from 'material-ui/styles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as a from 'store/actions'
import AppBar from 'components/AppBar'
import theme from 'muiTheme'


@withRouter
@connect(store => ({
    t: store.translations
}))
export default class BaseLayout extends React.Component {

    constructor(props) {
        super(props)
        props.dispatch(a.fetchTranslations())
    }

    render() {
        const { t } = this.props

        return (
            t ?
                <MuiThemeProvider  theme={ theme }>
                    <div className="app">
                        <AppBar />
                        { this.props.children }
                    </div>
                </MuiThemeProvider>
            :
                null
        )
    }
}