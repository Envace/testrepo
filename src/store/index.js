import { combineReducers, createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import { combineEpics } from 'redux-observable'

// REDUCER
import appReducer from 'store/reducers/appReducer'
import translationsReducer from 'store/reducers/translationsReducer'
import userReducer from 'store/reducers/userReducer'
import errorsReducer from 'store/reducers/errorsReducer'

// EPICS
import translationsEpics from 'store/epics/translationsEpics'
import userEpics from 'store/epics/userEpics'


const combinedEpics = combineEpics(
    translationsEpics,
    userEpics,
)

const epicMiddleware = createEpicMiddleware(combinedEpics)

const reducers = combineReducers({
    translations: translationsReducer,
    app: appReducer,
    user: userReducer,
    errors: errorsReducer,
})

const store = createStore(
    reducers, 
    applyMiddleware(epicMiddleware, createLogger())
)

export default store