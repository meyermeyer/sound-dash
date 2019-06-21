import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

// MaterialUI stuff
import Footer from '../Footer/Footer';


import LoginPage from '../LoginPage/LoginPage'
import UserPage from '../UserPage/UserPage'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import UserDashboard from '../UserDashboard/UserDashboard'
import ProjectEditor from '../ProjectEditor/ProjectEditor'

import './App.css';




class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  

  render() {
    return (
        <Router>
          <div id="wrap">
            <div id="main">
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />
           
              <ProtectedRoute
                exact
                path="/home"
                component={UserPage}
              />
              {/* protected route to user dashboard*/}
              <ProtectedRoute
                exact
                path="/user-dashboard"
                component={UserDashboard}
              />
              {/* protected route to user projectEditor*/}
              <ProtectedRoute
                exact
                path="/project-editor/:id"
                component={ProjectEditor}
              />
              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
            </div>
          </div>
        <Footer />
        </Router>
  )}
}

export default connect()(App);
