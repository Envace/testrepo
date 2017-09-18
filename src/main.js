import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'

import MainRouter from 'components/MainRouter'
import BaseLayout from 'components/BaseLayout'

import store from 'store'

import './main.scss'

const renderApp = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <AppContainer>
                    <BaseLayout>
                        <Component />
                    </BaseLayout>
                </AppContainer>
            </Router>
        </Provider>,
        document.getElementById('root')
    )
}

renderApp(MainRouter)

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('components/MainRouter', () => renderApp(MainRouter))
}