import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// watcher Saga
function* regionSaga() {
    yield takeEvery('SEND_REGIONS', saveRegionSaga)

}

function* saveRegionSaga() {
    console.log('in saveRegionSaga')
}

export default regionSaga