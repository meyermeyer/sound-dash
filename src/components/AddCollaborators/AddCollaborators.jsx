import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Autocomplete from '../Autocomplete/Autocomplete'





class AddCollaborators extends Component {
    
    render(){
        return(
            <div id="userSearch">
                <Autocomplete />
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(AddCollaborators)