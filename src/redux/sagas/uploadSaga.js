import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function *uploadSaga (){
    yield takeEvery('SAVE_FILE', saveFileSaga)
}

function* saveFileSaga(action) {
    try {
        console.log('in sageFileSaga', action.payload.file)
        const data = new FormData();
        data.append('file', action.payload.file);
        const url =`/upload?project_id=${action.payload.project_id}&track_name=${action.payload.track_name}`
        const response = yield axios.post(url, data, {
            headers: {
                'accept': 'application/json',
                'Accepted-Language': 'en-US,en;q=0.8',
                'Content-Type': action.payload.type
            }
        })
    }
    catch(error){
        console.log('error in saveFileSaga', error)
    }
    
    console.log('in saveFileSaga', action.payload)
    // try {
    //     yield axios.post('/test-upload', action.payload)
    // }
    // catch(error){
    //     console.log('error in saveFileSaga', error)
    // }
   
}

export default uploadSaga