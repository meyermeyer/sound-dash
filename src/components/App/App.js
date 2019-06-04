import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

// MaterialUI stuff
import Button from '@material-ui/core/Button'
import { createMuiTheme } from '@material-ui/core/styles' 
import { ThemeProvider } from '@material-ui/styles';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import Header from '../Header/Header'
import UserDashboard from '../UserDashboard/UserDashboard'
import ProjectEditor from '../ProjectEditor/ProjectEditor'
import CurrentUser from '../CurrentUser/CurrentUser';

import './App.css';



const theme = createMuiTheme({
  palette: {
    primary: {main: '#9c27b0'},
    secondary: {main: '#ffcc80'}
  }
})
class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  

  render() {
    return (
      <>
        <Router>
          <div>
            <Header />
            
            <Nav />
            {/* <CurrentUser /> */}
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />
              {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
              <Route
                exact
                path="/about"
                component={AboutPage}
              />
              {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
              <ProtectedRoute
                exact
                path="/home"
                component={UserPage}
              />
              {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
              <ProtectedRoute
                exact
                path="/info"
                component={InfoPage}
              />
              {/* route to user dashboard - will be protected after login works */}
              <ProtectedRoute
                exact
                path="/user-dashboard"
                component={UserDashboard}
              />
              <ProtectedRoute
                exact
                path="/project-editor/:id"
                component={ProjectEditor}
              />
              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
            <Footer />
          </div>
        </Router>
        {/* <ThemeProvider theme={theme}>
          <Button variant="contained" color="primary">test</Button>
        </ThemeProvider> */}
        
      </>
     
  )}
}

export default connect()(App);
