import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* collaboratorSaga() {
    yield takeEvery ('ADD_COLLABORATORS', addCollaboratorSaga)
    yield takeEvery ('FETCH_COLLABORATORS', fetchCollaboratorsSaga)
    yield takeEvery ('DELETE_COLLABORATOR', deleteCollaboratorSaga)
}

function* addCollaboratorSaga(action){
    console.log('addCollaborator project_id:',action.payload.project_id.id)
    let url = `/api/collaborators?project_id=${action.payload.project_id.id}`
    console.log('in addCollaboratorSaga', action.payload, url);
    yield axios.post(url, {user_id:action.payload.collaborators})
    yield put({type: 'FETCH_COLLABORATORS', payload: action.payload.project_id.id})
    
}

function* fetchCollaboratorsSaga(action) {
    console.log('in fetchCollaboratorsSaga', action.payload)
    let url = `/api/collaborators?project_id=${action.payload}`
    let allCollaborators = yield axios.get(url) 
    console.log('in fetchCollaboratorsSaga',allCollaborators)
    yield put({ type:'STORE_COLLABORATORS', payload: allCollaborators.data})
}

function* deleteCollaboratorSaga(action){
    console.log('in deleteCollaboratorSaga', action.payload)
    let url = `/api/collaborators?project_id=${action.payload.project_id.id}&user_id=${action.payload.collaborator.user_id}`
    yield axios.delete(url)
    yield put({ type: 'FETCH_COLLABORATORS', payload: action.payload.project_id.id })
}

export default collaboratorSaga