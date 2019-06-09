import React, { Component } from 'react';
import { connect } from 'react-redux'
import LoginRegisterNavBar from '../LoginRegisterNavBar/LoginRegisterNavBar'


//Mui stuff
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';


// const theme = createMuiTheme({
//   palette: {
//     primary: { main: '#9c27b0' },
//     secondary: { main: '#ffcc80' }
//   }
// })

const styles = (theme) => ({
  root: {
    height: '100vh',
    backgroundColor: 'transparent'
  },
  image: {
    backgroundImage: 'url(images/multiple_cassettes_no_watermark.jpg)',
    backgroundRepeat: 'repeat',
    backgroundSize: '70%',
    backgroundPosition: 'center',
  },
  login:{
    backgroundImage: 'transparent'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    backgroundColor: 'transparent'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
    this.props.history.push('/user-dashboard')
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <LoginRegisterNavBar/>
        <Grid container component="main" className={this.props.classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={this.props.classes.image} />
          <Grid className={this.props.classes.login} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={this.props.classes.paper}>
              <Avatar className={this.props.classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
                        </Typography>
              <form className={this.props.classes.form} onSubmit={this.login} noValidate>
                <TextField
                  onChange={this.handleInputChangeFor('username')}
                  value={this.state.username}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  onChange={this.handleInputChangeFor('password')}
                  value={this.state.password}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={this.props.classes.submit}
                >
                  Sign In
                        </Button>
                <Grid container>

                  <Grid item>
                    <Link href="#" variant="body2" onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
      
    );
  }
};

export default connect()(withStyles(styles)(LoginPage))