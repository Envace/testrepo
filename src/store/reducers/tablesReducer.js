const initialState = [
    {
        title: "Test Table 1",
        description: "This is the test description of the first created Table ever!",
        start: ""
    }
]

const tablesReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_TABLE':
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

export default tablesReducer