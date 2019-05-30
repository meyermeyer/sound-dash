import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* watcherSaga() {
    yield takeEvery('ADD_PROJECT', addProjectSaga)
}

function* addProjectSaga(action) {
    try {
        console.log('in addProjectSaga', action.payload);
        yield axios.post('/api/project', action.payload);
        yield axios.post('/api/project/users', action.payload);
        yield put({type:'FETCH_PROJECTS'})
    }
    catch(err){
        console.log('error in addProjectSaga', err)
    }
}

export default watcherSaga