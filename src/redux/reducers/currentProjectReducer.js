const currentProjectReducer = (state=[], action) => {
    switch(action.type) {
        case 'SELECT_PROJECT':
            console.log('in currentProjectReducer', action.payload)
            return action.payload;
        default:
            return state;
    }
}

export default currentProjectReducer;