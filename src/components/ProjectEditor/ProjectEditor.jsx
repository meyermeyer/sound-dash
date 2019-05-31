import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TrackList from '../TrackList/TrackList'

//materialUI
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { createMuiTheme, withStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
//     container: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     textField: {
//         marginLeft: theme.spacing(1),
//         marginRight: theme.spacing(1),
//         width: 200,
//         height: 400
//     },
//     dense: {
//         marginTop: 19,
//     },
//     menu: {
//         width: 200,
//     },
// }));

const theme = createMuiTheme({
    palette: {
        primary: { main: '#9c27b0' },
        secondary: { main: '#ffcc80' }
    }
})

const styles = (theme)=>{
    return{
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
            height: 400
        }
    }
};


class ProjectEditor extends Component {
    state = {
        newFile: {
            name: '',
            path: ''
        }
    }
    
   handleChange = (event) => {
       console.log('in handleChange', event.target.value);
       console.log('trackNumber:', trackNumber)
       let trackNumber = this.props.reduxState.files.length + 1
       this.setState({
           newFile: {
               name: 'Track ' + trackNumber,
               path: event.target.value}
       })
   }

   handleSubmit = ()=>{
       console.log('in handleSubmit')
       
       //dispatch action to trigger SAGA for POST to /api/files
    //    let trackNumber = this.props.reduxState.files.length+1
       
    //    this.setState({
    //        newFile: {
    //            ...this.state.newFile,
    //            name: 'Track '+trackNumber
    //        }
    //    })
       this.props.dispatch({type:'ADD_FILE', payload: this.state.newFile, currentProject:this.props.reduxState.currentProject})
   }

   componentDidMount = () => {
       this.props.dispatch({ type: 'FETCH_FILES', payload: this.props.reduxState.currentProject })
        
       
   }
    render() {
        console.log('ProjectEditor', this.state.newFile)
        
        
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
                        <Button  onClick={this.handleSubmit} variant="contained" color="secondary">Submit
                            <i class="material-icons">
                                library_add
                            </i>
                        </Button>
                    </ThemeProvider>
                    {/* <input aria-label="web url" type="text" placeholder="web url"></input> */}
                    <ul>
                            <TrackList />
                    </ul>
                    {/* <input aria-label="lyrics" type="text" placeholder="lyrics"></input>
                    <input aria-label="notes" type="text" placeholder="notes"></input> */}
                    <TextField
                        id="lyrics-textarea"
                        label="Lyrics"
                        placeholder="Lyrics Here"
                        multiline
                        className={this.props.classes.textField}
                        margin="normal"
                    />
                    <TextField
                        id="notes-textarea"
                        label="Notes"
                        placeholder="Notes Here"
                        multiline
                        className={this.props.classes.textField}
                        margin="normal"
                    />
                </div>
            </>
            
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

// export default withStyles(styles)connect(mapStateToProps)(ProjectEditor)
export default connect(mapStateToProps)(withStyles(styles)(ProjectEditor))