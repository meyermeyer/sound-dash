import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CurrentUser.css'


//materialUI
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Button, Grid, Card, CardContent } from '@material-ui/core';
import { createMuiTheme, withStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';


const styles = theme => ({
    chip: {
        backgroundColor: "#FFFFFF",
        color: "#3f51b5",
        // fontSize: 20,
        // fontStretch: "expanded"
    },
    avatar: {
        color: "#3f51b5",
        fontWeight: "bold"
    }
});


class CurrentUser extends Component {
    render(){
        if (this.props.reduxState.user.username){
            return (
                <div className="CurrentUserChip">
                    <Chip
                        avatar={<Avatar className={this.props.classes.avatar}>{this.props.reduxState.user.username.charAt(0).toUpperCase()}</Avatar>}
                        label={<h3>{this.props.reduxState.user.username}</h3>}
                        className={this.props.classes.chip}
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

export default withStyles(styles)(connect(mapStateToProps)(CurrentUser))