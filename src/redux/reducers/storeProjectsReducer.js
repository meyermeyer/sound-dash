const storeProjectsReducer = (state=[], action) => {
    switch(action.type) {
        case 'STORE_PROJECTS':
            console.log('in storeProjectsReducer', action.payload)
            return action.payload;
        default:
            return state;
    }
}

export default storeProjectsReducer;