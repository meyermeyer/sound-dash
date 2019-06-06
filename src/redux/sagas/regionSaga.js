import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


// watcher Saga
function* regionSaga() {
    yield takeEvery('FETCH_REGIONS', fetchRegionSaga)
    yield takeEvery('SEND_REGIONS', saveRegionSaga)
    yield takeEvery('UPDATE_REGIONS', updateRegionSaga)

}

//GET to server to fetch regions on page load
function* fetchRegionSaga(action) {
    console.log('in fetchRegionSaga');
    const url = `/api/region?project_id=${action.payload}`
    console.log(url)
    const allRegions = yield axios.get(url);
    
    // const allRegions = yield axios.get(`/api/region?project_id=${action.payload.project_id}&track_id=${action.payload.track_id}`)
    yield put({type:'STORE_REGIONS', payload: allRegions.data})
}

//POST to server to save new region
function* saveRegionSaga(action) {
    console.log('in saveRegionSaga', action.payload)
    try{
    const url = `/api/region?project_id=${action.payload.project_id.id}`
    yield axios.post(url, action.payload)
        // yield put({ type: 'FETCH_REGIONS', payload: action.payload.project_id})
    
    }
    catch (err){
        console.log('error in saveRegionSaga', err)
    }
}

//PUT to server to update regions
function* updateRegionSaga(action){
    console.log('in updateRegionSaga', action.payload)
}

export default regionSaga