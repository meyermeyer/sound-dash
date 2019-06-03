const storeCollaboratorsReducer = (state = [], action) => {
    switch (action.type) {
        case 'STORE_COLLABORATORS':
            console.log('in storeCollaboratorsReducer', action.payload)
            return action.payload;
        default:
            return state;
    }
}

export default storeCollaboratorsReducer;