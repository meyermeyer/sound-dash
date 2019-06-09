import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import DownshiftMultiple from '../DownshiftMultiple/DownshiftMultiple'

import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 24,
    },
    form:{
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        // height:24
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
        flexGrow: 1,
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    chip: {
        margin: theme.spacing(0.5, 0.25),
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    divider: {
        height: theme.spacing(2),
    }
});


class IntegrationDownshift extends Component {
    componentDidMount = () => {

        //get all users from database for autocomplete options
        this.props.dispatch({ type: 'FETCH_ALL_USERS'})
    }
    
    render(){
        // console.log('collaborators:', this.state.collaborators)
        return(
            // <div className={this.props.classes.root}>
                <DownshiftMultiple store={this.props.reduxState} project_id={this.props.match.params} classes={this.props.classes} dispatch={this.props.dispatch}/>
            // </div>
        )
            
            
        
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(IntegrationDownshift)));