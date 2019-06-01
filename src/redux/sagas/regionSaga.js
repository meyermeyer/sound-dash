import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// watcher Saga
function* regionSaga() {
    yield takeEvery('SEND_REGIONS', saveRegionSaga)

}

//POST to server to save new region
function* saveRegionSaga(action) {
    console.log('in saveRegionSaga', action.payload)
    try{
    const url = `/api/region?project_id=${action.payload.project_id}`
    yield axios.post(url, action.payload)
    // yield axios.post(url)
    }
    catch (err){
        console.log('error in saveRegionSaga', err)
    }
}
    

export default regionSaga