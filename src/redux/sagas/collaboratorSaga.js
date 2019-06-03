import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* collaboratorSaga() {
    yield takeEvery ('ADD_COLLABORATORS', addCollaboratorSaga)
}

function* addCollaboratorSaga(action){
    
    let url = `/api/collaborators?project_id=${action.payload.project_id}`
    console.log('in addCollaboratorSaga', action.payload, url);
    yield action.payload.collaborators.map(collaborator=>{
        return(
             axios.post(url, {user_id: collaborator})
        )
    })
    // yield axios.post(url, action.payload.collaborators)
}

export default collaboratorSaga