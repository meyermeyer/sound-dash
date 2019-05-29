const currentProjectReducer = (state=[], action) => {
    switch(action.type) {
        case 'SELECT_PROJECT':
            console.log('in currentProjectReducer', action.payload)
            return action.payload;
            // return 8;
        default:
            return state;
    }
}

export default currentProjectReducer;