const filesReducer = (state = [], action) => {
    switch (action.type) {
        case 'STORE_FILES':
            console.log('in filesReducer', action.payload)
            // return action.payload;
            return action.payload;
        default:
            return state;
    }
}

export default filesReducer;