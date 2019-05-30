import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


//watcher Saga
function* fileSaga() {
    yield takeEvery('ADD_FILE', addFileSaga)
    yield takeEvery('UPDATE_FILE', updateFileSaga)
    yield takeEvery('FETCH_FILES', fetchFilesSaga)
}

function* addFileSaga(action) {
    try {
        let url = '/api/files/'+action.currentProject.project_id
        console.log('in addFileSaga', action.payload, action.currentProject.project_id, url);
        yield axios.post(url, action.payload);
        yield put({ type: 'FETCH_FILES', payload: action.currentProject.project_id})

    }
    catch (error) {
        console.log('error in POST addFileSaga', error);
    }
}

function* fetchFilesSaga(action) {
    console.log('in fetchFilesSaga', action.payload)
    try {
        const url = '/api/files/' + action.payload.project_id
        console.log(url);
        const allFiles = yield axios.get(url);
        yield put({ type: 'STORE_FILES', payload: allFiles.data })
        console.log('in fetchFilesSaga', allFiles.data)
    }
    catch (error) {
        console.log('error in fetchFilesSaga', error);
    }
}

function* updateFileSaga(action) {
    try {
        console.log('in updateFileSaga', action.payload.trackName, action.id);
        const url = '/api/files/'+action.id+'/'+action.payload.project_id
        yield axios.put(url,action.payload)
        
    }
    catch(error){
        console.log('error in updateFileSaga', error)
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default fileSaga