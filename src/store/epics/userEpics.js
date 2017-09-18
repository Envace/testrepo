import Rx from 'rxjs'
import { combineEpics } from 'redux-observable'
import * as a from 'store/actions'

const userLoginEpic = (action$, store) => 
    action$.ofType('USER_LOGIN')
        .delay(1500)
        .mapTo(a.userLoginFulfilled({name: 'Basti'}))

export default combineEpics(
    userLoginEpic,
)