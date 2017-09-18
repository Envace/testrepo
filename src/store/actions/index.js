///////////////////
// TRANSLATIONS //
/////////////////
export const fetchTranslations = (locale = 'default') => ({
    type: 'FETCH_TRANSLATIONS', 
    payload: locale,
})
export const fetchTranslationsFulfilled = translations => ({
    type: 'FETCH_TRANSLATIONS_FULFILLED', 
    payload: translations,
})

//////////
// APP //
////////
export const homeSetTabIndex = index => ({
    type: 'HOME_SET_TAB_INDEX',
    payload: index,
})
export const loginModalOpen = () => ({
    type: 'LOGIN_MODAL_OPEN'
})
export const loginModalClose = () => ({
    type: 'LOGIN_MODAL_CLOSE'
})
export const subMenuOpen = el => ({
    type: 'SUB_MENU_OPEN',
    payload: el,
})
export const subMenuClose = () => ({
    type: 'SUB_MENU_CLOSE'
})

///////////
// USER //
/////////
export const userLogin = (name='default', password='123') => ({
    type: 'USER_LOGIN',
    payload: {name, password},
})
export const userLoginFulfilled = user => ({
    type: 'USER_LOGIN_FULFILLED',
    payload: user,
})
export const userLogout = () => ({
    type: 'USER_LOGOUT'
})

/////////////
// ERRORS //
///////////
export const removeError = name => ({
    type: 'REMOVE_ERROR',
    payload: name
})