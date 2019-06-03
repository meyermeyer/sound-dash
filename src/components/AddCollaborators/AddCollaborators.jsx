import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Autocomplete from '../Autocomplete/Autocomplete'
import Autocomplete2 from '../Autocomplete2/Autocomplete2'

import TextField from '@material-ui/core/TextField';


class AddCollaborators extends Component {
    
    render(){
        // const suggestions = [
        //     this.props.reduxState.users.map(user=>{
        //         label: user.username
        //     })
        // ]
        return(
            <>
            <Autocomplete />
            {/* <Autocomplete2 />    */}
            
             {/* <TextField
                id="outlined-search"
                label="Search field"
                type="search"
                // className={classes.textField}
                margin="normal"
                variant="outlined"
            /> */}
            
            
            </>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(AddCollaborators)