import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import projects from './storeProjectsReducer'
import currentProject from './currentProjectReducer'
import files from './filesReducer'
import regions from './storeRegionsReducer'
import allUsers from './allUsersReducer'
import collaborators from './storeCollaboratorsReducer'


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  projects, // stores user's authorized projects
  currentProject, //stores currently selected project
  files, //stores current project's files
  regions, //stores current project's regions data
  allUsers, //stores all registered users
  collaborators //stores all users authorized to access current project
});

export default rootReducer;
