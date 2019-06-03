import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import projectSaga from './projectSaga';
import fileSaga from './fileSaga';
import regionSaga from './regionSaga';
import collaboratorSaga from './collaboratorSaga';


export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    projectSaga(),
    fileSaga(),
    regionSaga(),
    collaboratorSaga()

  ]);
}
