const storeRegionsReducer = (state = [], action) => {
    switch (action.type) {
        case 'STORE_REGIONS':
            console.log('in storeRegionsReducer', action.payload)
            return action.payload;
        default:
            return state;
    }
}

export default storeRegionsReducer;