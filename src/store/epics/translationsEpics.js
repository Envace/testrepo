import Rx from 'rxjs'
import { combineEpics } from 'redux-observable'
import * as a from 'store/actions'

const fetchTranslationsEpic = (action$, store) => 
    action$.ofType('FETCH_TRANSLATIONS')
        .mergeMap(action => 
            Rx.Observable.ajax({
                method: 'GET',
                url: '/translations/' + action.payload + '.json'
            })
            .map(response => {
                if(response.responseType == "json") {
                    return a.fetchTranslationsFulfilled(response.response)
                }
                return a.fetchTranslations()
            })
            .catch(() => Observable.of(a.fetchTranslations()))
        )  

export default combineEpics(
    fetchTranslationsEpic,
)