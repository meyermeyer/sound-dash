import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TrackList from '../TrackList/TrackList'
import CurrentUser from '../CurrentUser/CurrentUser'
import AddCollaborators from '../AddCollaborators/AddCollaborators';
import Loading from '../Loading/Loading'

//materialUI
import TextField from '@material-ui/core/TextField';
import { Button, Grid, Card, CardContent } from '@material-ui/core';
import { createMuiTheme, withStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener'




const theme = createMuiTheme({
    palette: {
        primary: { main: '#9c27b0' },
        secondary: { main: '#ffcc80' }
    }
})

const styles = (theme) => {
    return {
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
            height: 400,
            borderStyle: 'solid',
            borderColor: 'black',
            borderWeight: 2

        }
    }
};


class ProjectEditor extends Component {
    state = {
        newFile: {
            name: '',
            path: ''
        },
        projectData: {
            lyrics: '',
            notes: ''
        }
    }
    //New Track Input functions
    handleChange = (event) => {
        console.log('in handleChange', event.target.value);
        console.log('trackNumber:', trackNumber)
        let trackNumber = this.props.reduxState.files.length + 1
        this.setState({
            newFile: {
                name: 'Track ' + trackNumber,
                path: event.target.value
            }
        })
    }

    handleSubmit = () => {
        console.log('in handleSubmit')

        //dispatch action to trigger SAGA for POST to /api/files
        this.props.dispatch({ type: 'ADD_FILE', payload: this.state.newFile, currentProject: this.props.reduxState.currentProject })
    }

    //Lyrics and Notes change functions
    handleLyricsChange = (event) => {
        // console.log('in handleLyricsChange')
        this.setState({
            projectData: {
                ...this.state.projectData,
                lyrics: event.target.value
            }
        })
    }

    handleNotesChange = (event) => {
        // console.log('in handleNotesChange')
        this.setState({
            projectData: {
                ...this.state.projectData,
                notes: event.target.value
            }
        })
    }

    handleLyricsSubmit = (event) => {
        event.preventDefault();
        // console.log('in handleLyricsSubmit')
        this.props.dispatch({
            type: 'UPDATE_PROJECT_DATA',
            payload: {
                projectData: this.state.projectData,
                project_id: this.props.reduxState.currentProject.project_id
            }
        })
    }

    handleNotesSubmit = (event) => {
        event.preventDefault();
        console.log('in handleNotesSubmit', this.props.reduxState);
        this.props.dispatch({
            type: 'UPDATE_PROJECT_DATA',
            payload: {
                projectData: this.state.projectData,
                project_id: this.props.reduxState.currentProject.project_id
            }
        })
    }

    componentDidMount = () => {
        this.props.reduxState.currentProject && this.props.dispatch({ type: 'FETCH_FILES', payload: this.props.reduxState.currentProject })
        this.props.reduxState.currentProject && this.props.dispatch({ type: 'FETCH_REGIONS', payload: this.props.reduxState.currentProject })
        this.props.reduxState.currentProject && this.props.dispatch({ type: 'FETCH_COLLABORATORS', payload: this.props.reduxState.currentProject})
    }
    render() {
        console.log('ProjectEditor new file', this.state.newFile)
        console.log('ProjectEditor project data', this.state.projectData);


        return (
            <>
                <h2>{this.props.reduxState.currentProject.name}</h2>
                <div>
                    <CurrentUser />
                        <div id="currentCollaborators">
                            <h3>Shared with:</h3>
                            {this.props.reduxState.collaborators.map((collaborator,i)=>{
                                return (
                                    <p key={i}>{collaborator.username}</p>
                                )
                            })}
                                
                            
                        </div>
                    
                    <AddCollaborators/>

                    <h3>Add New Files</h3>
                    <TextField
                        id="outlined-dense"
                        label="Audio URL"
                        margin="dense"
                        variant="outlined"
                        onChange={this.handleChange}
                    />
                    
                    <ThemeProvider theme={theme}>
                        <Button onClick={this.handleSubmit} variant="contained" color="secondary">Submit
                            <i class="material-icons">
                                library_add
                            </i>
                        </Button>
                    </ThemeProvider>
                    {/* <input aria-label="web url" type="text" placeholder="web url"></input> */}
                    <Grid container>
                        <Loading/>
                        <Grid item xs={8}>
                            <ul>
                                <TrackList />
                            </ul>
                        </Grid>
                        <Grid container xs={4} direction="column">

                            <Grid item xs={6}>

                                <ClickAwayListener onClickAway={this.handleLyricsSubmit}>
                                    <TextField
                                        id="lyrics-textarea"
                                        label="Lyrics"
                                        placeholder="Lyrics Here"
                                        multiline
                                        className={this.props.classes.textField}
                                        margin="normal"
                                        onChange={this.handleLyricsChange}
                                        // onSubmit={this.handleLyricsSubmit}
                                        // value={this.props.reduxState.currentProject.lyrics}
                                    />
                                </ClickAwayListener>

                            </Grid>

                            <Grid item sm={6} >
                                <ClickAwayListener onClickAway={this.handleNotesSubmit}>
                                    <TextField
                                        id="notes-textarea"
                                        label="Notes"
                                        placeholder="Notes Here"
                                        multiline
                                        className={this.props.classes.textField}
                                        margin="normal"
                                        onChange={this.handleNotesChange}
                                        // onSubmit={this.handleNotesSubmit}
                                        // value={this.props.reduxState.currentProject.notes}
                                    />
                                </ClickAwayListener>

                            </Grid>



                        </Grid>


                    </Grid>


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