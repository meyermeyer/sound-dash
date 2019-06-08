import React, {Component} from 'react';
import { connect } from 'react-redux'

//Mui stuff
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// const theme = createMuiTheme({
//     palette: {
//         primary: { main: '#9c27b0' },
//         secondary: { main: '#ffcc80' }
//     }
// })

const styles = (theme) => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
            
        },
    },
    paper: {
        backgroundColor: theme.palette.common.white,
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class SignUp extends Component {
    state = {
        username: '',
        password: '',
    };

    registerUser = (event) => {
        event.preventDefault();

        if (this.state.username && this.state.password) {
            this.props.dispatch({
                type: 'REGISTER',
                payload: {
                    username: this.state.username,
                    password: this.state.password,
                },
            });
        } else {
            this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
        }
    } // end registerUser

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    render(){
        return (
            <div className="container">
                {this.props.errors.registrationMessage && (
                    <h2
                        className="alert"
                        role="alert"
                    >
                        {this.props.errors.registrationMessage}
                    </h2>
                )}
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={this.props.classes.paper}>
                        <Avatar className={this.props.classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                    </Typography>
                        <form onSubmit={this.registerUser} className={this.props.classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={this.handleInputChangeFor('username')}
                                        value={this.state.username}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={this.handleInputChangeFor('password')}
                                        value={this.state.password}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={this.props.classes.submit}
                            >
                                Sign Up
                        </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="#" variant="body2" onClick={() => {
                                        this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' })
                                    }}>
                                        Already have an account? Sign in
                                 </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </div>
            
        );
    }   
}

const mapStateToProps = state => ({
    errors: state.errors,
});

export default withStyles(styles)(connect(mapStateToProps)(SignUp))