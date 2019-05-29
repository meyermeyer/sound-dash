import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//watcher Saga
function* watcherSaga() {
    yield takeEvery('FETCH_FILES', fetchFilesSaga)
}

function* fetchFilesSaga(action) {
    console.log('in fetchFilesSaga', action.payload)
    try {
        const url = '/api/files/'+action.payload.project_id
        console.log(url);
        const allFiles = yield axios.get(url);
        yield put({ type: 'STORE_FILES', payload: allFiles.data })
        console.log('in fetchFilesSaga', allFiles.data)
    }
    catch (error) {
        console.log('error in fetchFilesSaga', error);
    }
}

export default watcherSaga