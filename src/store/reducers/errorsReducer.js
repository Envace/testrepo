const initialState = [{
    name: 'title',
    msg: 'wrong title'
}]

const errorsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'REMOVE_ERROR': {
            return state.filter(e => e.name != action.payload)
        }
    }
    return state
}

export default errorsReducer