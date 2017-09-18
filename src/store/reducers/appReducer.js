const initialState = {
    loginModalOpen: false,
    subMenu: {
        open: false,
        anchorEl: null
    },
    home: {
        tabIndex: 1,
    }
}

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN_MODAL_OPEN': {
            return {
                ...state,
                loginModalOpen: true,
            }
        }
        case 'LOGIN_MODAL_CLOSE': {
            return {
                ...state,
                loginModalOpen: false,
            }
        }
        case 'SUB_MENU_OPEN': {
            return {
                ...state,
                subMenu: {
                    open: true,
                    anchorEl: action.payload
                }
            }
        }
        case 'SUB_MENU_CLOSE': {
            return {
                ...state,
                subMenu: initialState.subMenu
            }
        }
        case 'HOME_SET_TAB_INDEX':
            return {
                ...state,
                home: {
                    ...state.home,
                    tabIndex: action.payload
                }
            }
    }
    return state
}

export default appReducer