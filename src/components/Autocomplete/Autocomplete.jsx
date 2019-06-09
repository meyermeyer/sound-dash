import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import DownshiftMultiple from '../DownshiftMultiple/DownshiftMultiple'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 24,
    },
    form:{
        height:24
    },
    container: {
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
        width: 'auto',
        flexGrow: 1,
        backgroundColor: '#ffffff73',
        borderRadius: '3px'
    },
    divider: {
        height: theme.spacing(2),
    },
    search: {
        height: '24px'
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