const initialState = {
    loggingIn: false,
    loggedIn: false,
    user: null,
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'USER_LOGIN': {
            return {
                ...state,
                loggingIn: true,
            }
        }
        case 'USER_LOGIN_FULFILLED': {
            return {
                ...state,
                logginIn: false,
                loggedIn: true,
                user: action.payload
            }
        }
        case 'USER_LOGOUT': {
            return initialState
        }
    }
    return state
}

export default userReducer