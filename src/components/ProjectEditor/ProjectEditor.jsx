import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TrackList from '../TrackList/TrackList'

//materialUI
import TextField from '@material-ui/core/TextField';
import { Button, Card, CardContent, CardActions } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';


const theme = createMuiTheme({
    palette: {
        primary: { main: '#9c27b0' },
        secondary: { main: '#ffcc80' }
    }
})


class ProjectEditor extends Component {
    state = {
        newFilePath: ''
    }
    
   handleChange = (event) => {
       console.log('in handleChange', event.target.value)
       this.setState({
           newFile: {
               name:'',
               path: event.target.value}
       })
   }

   handleSubmit = ()=>{
       console.log('in handleSubmit')
       //dispatch action to trigger SAGA for POST to /api/files
       let trackNumber = this.props.reduxState.files.length
       this.setState({
           newFile: {
               ...this.state.newFile,
               name: 'Track'+{trackNumber}
           }
       })
       this.props.dispatch({type:'ADD_FILE', payload: this.state.newFile, currentProject:this.props.reduxState.currentProject})
   }

   componentDidMount = () => {
       this.props.dispatch({ type: 'FETCH_FILES', payload: this.props.reduxState.currentProject })
        
       
   }
    render() {
        console.log('ProjectEditor', this.state.newFilePath)
        console.log('newFile',this.state.newFile);
        
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
                    <ThemeProvider theme={theme}>
                        <Button  onClick={this.handleSubmit} variant="contained" color="secondary">Submit</Button>
                    </ThemeProvider>
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