import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* watcherSaga() {
    yield takeEvery('UPDATE_PROJECT', updateProjectSaga)
}

function* updateProjectSaga(action) {
    try {
        console.log('in updateProjectSaga', action.payload);
        const url = '/api/project/'+action.payload.id
        yield axios.put(url, action.payload)
    }
    catch (err) {
        console.log('error in updateProjectSaga', err)
    }
}

export default watcherSaga