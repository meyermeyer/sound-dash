import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Autocomplete from '../Autocomplete/Autocomplete'
import './AddCollaborators.css'

//Mui
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    search: {
        height: '24px',
        
    },
    
}); 



class AddCollaborators extends Component {
    
    render(){
        return(
            <div id="userSearch" className={this.props.classes.search}>
                <Autocomplete />
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default withStyles(styles)(connect(mapStateToProps)(AddCollaborators))