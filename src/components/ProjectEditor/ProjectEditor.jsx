import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TrackList from '../TrackList/TrackList'
import TextField from '@material-ui/core/TextField';


class ProjectEditor extends Component {
    state = {
        
    }
    
   handleChange = (event) => {
       console.log('in handleChange', event.target.value)
   }

   componentDidMount = () => {
       this.props.dispatch({ type: 'FETCH_FILES', payload: this.props.reduxState.currentProject })
        
       
   }
    render() {
        console.log('ProjectEditor', this.state.currentProject)
        return (
            <>
                <h2>{this.props.reduxState.currentProject.name}</h2>
                <div>
                    <h3>Add New Files</h3>
                    <TextField
                        id="outlined-dense"
                        label="Audio URL"
                        margin="dense"
                        variant="outlined"
                        onChange={this.handleChange}
                    />

                    {/* <input aria-label="web url" type="text" placeholder="web url"></input> */}
                    <ul>
                        <TrackList />
                    </ul>
                    <input aria-label="lyrics" type="text" placeholder="lyrics"></input>
                    <input aria-label="notes" type="text" placeholder="notes"></input>
                </div>
            </>
            
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(ProjectEditor)