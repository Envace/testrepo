const initialState = null

const translationsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_TRANSLATIONS_FULFILLED': {
            return action.payload
        }
    }
    return state
}

export default translationsReducer