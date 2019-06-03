import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* collaboratorSaga() {
    yield takeEvery ('ADD_COLLABORATORS', addCollaboratorSaga)
}

function* addCollaboratorSaga(action){
    
    let url = `/api/collaborators?project_id=${action.payload.project_id}`
    console.log('in addCollaboratorSaga', action.payload, url);
}

export default collaboratorSaga