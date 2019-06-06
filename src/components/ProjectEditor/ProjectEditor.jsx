import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Upload from '../Upload/Upload'
import UppyModal from '../UppyModal/UppyModal'
import TrackList from '../TrackList/TrackList.jsx'
import CurrentUser from '../CurrentUser/CurrentUser'
import AddCollaborators from '../AddCollaborators/AddCollaborators';
import Loading from '../Loading/Loading'
import LoadSpinner from '../LoadSpinner/LoadSpinner'
import Microphone from '../Microphone/Microphone'
import ReactMicrophone from '../ReactMicrophone/ReactMicrophone'
import './ProjectEditor.css'

//materialUI
import TextField from '@material-ui/core/TextField';
import { Button, Grid, Card, CardContent } from '@material-ui/core';
import { createMuiTheme, withStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';


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
        },
        inputIsOpen: {
            lyrics: false,
            notes: false
        }
    }


    // New Track Input functions
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
        this.props.dispatch({ type: 'ADD_FILE', payload: this.state.newFile, currentProject: this.props.match.params })
    }

    //Lyrics and Notes change functions
    setLyricsInput = () => {
        console.log('in setLyricsInput')
        if(!this.state.inputIsOpen.lyrics){
            this.setState({
            ...this.state,
            inputIsOpen: {
                ...this.state.inputIsOpen,
                lyrics: true
            }
        })
        } 
    }

    setNotesInput = () => {
        if (!this.state.inputIsOpen.notes) {
            console.log('in setNotesInput, switching')
            this.setState({
                ...this.state,
                inputIsOpen: {
                    ...this.state.inputIsOpen,
                    notes: true
                }
            })
        } 
    }

    handleLyricsChange = (event) => {
        console.log('in handleLyricsChange', event.target.value)
        
        this.setState({
            projectData: {
                ...this.state.projectData,
                lyrics: event.target.value
            }
        })
    }

    handleNotesChange = (event) => {
        console.log('in handleNotesChange', event.target.value)
        this.setState({
            projectData: {
                ...this.state.projectData,
                notes: event.target.value
            }
        })
    }

    handleLyricsSubmit = () => {
        // event.preventDefault();
        console.log('in handleLyricsSubmit')
        if (this.state.inputIsOpen.lyrics){
            console.log('in handleLyricsSubmit')
            this.props.dispatch({
                type: 'UPDATE_PROJECT_DATA',
                payload: {
                    projectData: this.state.projectData,
                    project_id: this.props.match.params
                }
            })
            this.setState({
                ...this.state,
                inputIsOpen: {
                    ...this.state.inputIsOpen,
                    lyrics: false
                }
            })
        }
        
    }

    handleNotesSubmit = () => {
        // event.preventDefault();
        console.log('in handleNotesSubmit', this.props.reduxState);
        if (this.state.inputIsOpen.notes){
            console.log('in handleNotesSubmit', this.state.inputIsOpen)
            this.props.dispatch({
                type: 'UPDATE_PROJECT_DATA',
                payload: {
                    projectData: this.state.projectData,
                    project_id: this.props.match.params
                }
            })
            this.setState({
                ...this.state,
                inputIsOpen: {
                    ...this.state.inputIsOpen,
                    notes: false
                }
            })
        }
        
    }

    componentDidMount = () => {
        const {id} = this.props.match.params
        console.log('ProjectEditor project_id', id)
        this.props.dispatch({ type: 'FETCH_FILES', payload: id })
        this.props.dispatch({ type: 'FETCH_REGIONS', payload: id })
        this.props.dispatch({ type: 'FETCH_COLLABORATORS', payload: id})
    }
    render() {
        console.log('ProjectEditor new file', this.state.newFile)
        console.log('ProjectEditor project data', this.state.projectData);
        console.log('local state:', this.state.inputIsOpen)
        


        return (
            <>
                <Upload/>
                <Microphone/>
                <ReactMicrophone/>
                {/* <UppyModal/> */}
                {this.props.reduxState.projects.map((project,i)=>{
                    console.log('project', project.project_id, this.props.match.params)
                    if(project.project_id == this.props.match.params.id){
                        return(
                            <h2 key={i}>{project.name}</h2>
                        )
                    }
                })}
                
                <div>
                    <CurrentUser />
                    <div id="currentCollaborators">
                        <Card>
                            <CardContent>
                                <h3>Shared with:</h3>
                                {this.props.reduxState.collaborators.map((collaborator, i) => {
                                    if(collaborator.id!=this.props.reduxState.user.id)
                                    return (
                                        <Chip
                                            key={i}
                                            avatar={<Avatar>{collaborator.username.charAt(0).toUpperCase()}</Avatar>}
                                            label={collaborator.username}
                                        />
                                    )
                                })}
                            </CardContent>
                        </Card>
                        
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
                    </ThemeProvider> */}
                    <input aria-label="web url" type="text" placeholder="web url"></input>
                    <Grid container>
                        <Loading/>
                        <Grid item xs={8}>
                            <ul>
                                <TrackList />
                            </ul>
                        </Grid>
                        <Grid container xs={4} direction="column">

                            <Grid item xs={6}>

                                 {/* <ClickAwayListener onClickAway={this.handleLyricsSubmit}> */}
                                    <TextField
                                        id="lyrics-textarea"
                                        label="Lyrics"
                                        placeholder="Lyrics Here"
                                        multiline
                                        className={this.props.classes.textField}
                                        margin="normal"
                                        onChange={this.handleLyricsChange}
                                        onClick={this.setLyricsInput}
                                        onSubmit={this.handleLyricsSubmit}
                                        // value={this.props.reduxState.currentProject.lyrics}
                                    />
                                {/* </ClickAwayListener> */}

                            </Grid>

                            <Grid item sm={6} >
                                {/* <ClickAwayListener onClickAway={this.handleNotesSubmit}> */}
                                    <TextField
                                        id="notes-textarea"
                                        label="Notes"
                                        placeholder="Notes Here"
                                        multiline
                                        className={this.props.classes.textField}
                                        margin="normal"
                                        onChange={this.handleNotesChange}
                                        onClick={this.setNotesInput}
                                        onSubmit={this.handleNotesSubmit}
                                        // value={this.props.reduxState.currentProject.notes}
                                    />
                                {/* </ClickAwayListener> */}

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


export default connect(mapStateToProps)(withStyles(styles)(ProjectEditor))