import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './CurrentUser.css'


//materialUI
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import TextField from '@material-ui/core/TextField';
import { Button, Grid, Card, CardContent } from '@material-ui/core';
import { createMuiTheme, withStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

class CurrentUser extends Component {
    handleClick = () => {
        console.log('you clicked it')
    }


    render(){
        if (this.props.reduxState.user.username){
            return (
                <div className="CurrentUserChip">

                    <Chip
                        avatar={<Avatar>{this.props.reduxState.user.username.charAt(0).toUpperCase()}</Avatar>}
                        label={this.props.reduxState.user.username}
                        onClick={this.handleClick}
                    // className={classes.chip}
                    />
                </div>
            )
        }
        else {
            return null
        }
        
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(CurrentUser)