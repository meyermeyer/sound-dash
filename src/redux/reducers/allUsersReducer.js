const allUsersReducer = (state = [], action) => {
    switch (action.type) {
        case 'STORE_ALL_USERS':
            console.log('in allUsersReducer', action.payload)
            return action.payload;
        default:
            return state;
    }
}

export default allUsersReducer;