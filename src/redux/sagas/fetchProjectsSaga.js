import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//watcher Saga
function* watcherSaga() {
    yield takeEvery('FETCH_PROJECTS', fetchProjectsSaga)
}

function* fetchProjectsSaga() {
    try {
        
        const allProjects = yield axios.get('/api/project');
        yield put({type: 'STORE_PROJECTS', payload: allProjects.data})
        console.log('in fetchProjectsSaga', allProjects.data)
    }
    catch(error){
        console.log('error in fetchProjectsSaga', error);
    }
}

export default watcherSaga