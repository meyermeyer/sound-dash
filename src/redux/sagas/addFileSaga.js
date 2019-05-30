import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//watcher Saga
function* watcherSaga() {
    yield takeEvery('ADD_FILE', addFileSaga)
}

function* addFileSaga(action) {
    try {
        let url = '/api/files/'+action.currentProject.project_id
        console.log('in addFileSaga', action.payload, action.currentProject.project_id, url);
        yield axios.post(url, action.payload);

    }
    catch (error) {
        console.log('error in POST addFileSaga', error);
    }
}

export default watcherSaga