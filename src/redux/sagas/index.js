import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import fetchProjectsSaga from './fetchProjectsSaga';
import deleteProjectSaga from './deleteProjectSaga'
import addProjectSaga from './addProjectSaga'
import updateProjectSaga from './updateProjectSaga'
import fetchFilesSaga from './fetchFilesSaga'
// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    fetchProjectsSaga(),
    deleteProjectSaga(),
    addProjectSaga(),
    updateProjectSaga(),
    fetchFilesSaga()
  ]);
}
