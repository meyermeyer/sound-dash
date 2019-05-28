import { put, takeEvery, actionChannel } from 'redux-saga/effects';
import axios from 'axios';

//watcher Saga
function* watcherSaga() {
    yield takeEvery('DELETE_PROJECT', deleteProjectSaga)
}

function* deleteProjectSaga(action) {
    try {
        console.log('in deleteProjectSaga', action.payload)
        yield axios.delete('/api/project/'+action.payload.id)
        
    }
    catch (error) {
        console.log('error in deleteProjectSaga', error);
    }
}

export default watcherSaga