import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function *uploadSaga (){
    yield takeEvery('SAVE_FILE', saveFileSaga)
}

function* saveFileSaga(action) {
    console.log('in saveFileSaga', action.payload)
    try {
        yield axios.post('/test-upload', action.payload)
    }
    catch(error){
        console.log('error in saveFileSaga', error)
    }
   
}

export default uploadSaga