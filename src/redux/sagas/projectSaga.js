import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//watcher Saga
function* projectSaga() {
    yield takeEvery('FETCH_PROJECTS', fetchProjectsSaga);
    yield takeEvery('UPDATE_PROJECT', updateProjectSaga);
    yield takeEvery('ADD_PROJECT', addProjectSaga);
    yield takeEvery('DELETE_PROJECT', deleteProjectSaga);
    yield takeEvery('UPDATE_PROJECT_DATA', updateProjectDataSaga)

}

function* fetchProjectsSaga() {
    try {
        const allProjects = yield axios.get('/api/project');
        yield put({ type: 'STORE_PROJECTS', payload: allProjects.data })
        console.log('in fetchProjectsSaga', allProjects.data)
    }
    catch (error) {
        console.log('error in fetchProjectsSaga', error);
    }
}

function* updateProjectDataSaga(action) {
    try {
        console.log('in updateProjectDataSaga', action.payload.project_id)
        const url = `/api/project?project_id=${action.payload.project_id}`
        
        yield axios.put(url, action.payload)
        yield put({type:'FETCH_PROJECTS'})
    }
    catch (err) {

    }
}

function* updateProjectSaga(action) {
    try {
        console.log('in updateProjectSaga', action.payload);
        const url = '/api/project/' + action.payload.project_id
        yield axios.put(url, action.payload)
    }
    catch (err) {
        console.log('error in updateProjectSaga', err)
    }
}

function* addProjectSaga(action) {
    try {
        console.log('in addProjectSaga', action.payload);
        yield axios.post('/api/project', action.payload);
        yield axios.post('/api/project/users', action.payload);
        yield put({ type: 'FETCH_PROJECTS' })
    }
    catch (err) {
        console.log('error in addProjectSaga', err)
    }
}

function* deleteProjectSaga(action) {
    try {
        console.log('in deleteProjectSaga', action.payload)
        yield axios.delete('/api/project/' + action.payload.project_id)
        yield put({ type: 'FETCH_PROJECTS' })

    }
    catch (error) {
        console.log('error in deleteProjectSaga', error);
    }
}


export default projectSaga