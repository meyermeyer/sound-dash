import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* collaboratorSaga() {
    yield takeEvery ('ADD_COLLABORATORS', addCollaboratorSaga)
    yield takeEvery ('FETCH_COLLABORATORS', fetchCollaboratorsSaga)
}

function* addCollaboratorSaga(action){
    
    let url = `/api/collaborators?project_id=${action.payload.project_id}`
    console.log('in addCollaboratorSaga', action.payload, url);
    yield action.payload.collaborators.map(collaborator=>{
        return(
             axios.post(url, {user_id: collaborator})
        )
    })
    
}

function* fetchCollaboratorsSaga(action) {
    console.log('in fetchCollaboratorsSaga', action.payload)
    let url = `/api/collaborators?project_id=${action.payload.project_id}`
    let allCollaborators = yield axios.get(url) 
    console.log('in fetchCollaboratorsSaga',allCollaborators)
    yield put({ type:'STORE_COLLABORATORS', payload: allCollaborators.data})
}

export default collaboratorSaga