import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBar from '../NavBar/NavBar'
import Upload from '../Upload/Upload'
import TrackList from '../TrackList/TrackList.jsx'
import AddCollaborators from '../AddCollaborators/AddCollaborators';
import CurrentCollaborators from '../CurrentCollaborators/CurrentCollaborators'


//materialUI
import TextField from '@material-ui/core/TextField';
import { Grid, Card, CardContent } from '@material-ui/core';
import { createMuiTheme, withStyles } from '@material-ui/core/styles'


const styles = (theme) => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '94%',
        height: 400, 
        borderStyle: 'solid',
        borderColor: 'black',
        borderWeight: 2,
        backgroundColor: 'white',
        borderRadius: '3px'
    },
    '@global': {
        body: {
            height: '100%',
            width: '100%',
            backgroundColor: "#4a4a4a",
            
        },
    },
    root: {
        backgroundColor: "#4a4a4a",
        margin: '25px'
    },  
    input: {
        marginBottom: '5px',
        marginLeft: '5px',
        backgroundColor: "#3a3a3a",
        color: 'white'
    }
    
});

let currentProject={};

class ProjectEditor extends Component {
    

    defineCurrentProject=()=>{
        this.props.reduxState.projects.map((project, i) => {
            console.log('project', project.project_id, this.props.match.params.id)
            if (project.project_id == this.props.match.params.id) {
                currentProject = project
                console.log('defineCurrentProject', currentProject)
            }
        })
        console.log('in defineCurrentProject', currentProject)
    }
    
    state = {
        newFile: {
            name: '',
            path: ''
        },
        projectData: {
            lyrics: currentProject.lyrics,
            notes: ''
        },
        inputIsOpen: {
            lyrics: false,
            notes: false
        }
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

    
    componentWillUnmount = () => {
        console.log('in ProjectEditor componentWillUnmount')
        
            if(this.state.projectData.lyrics==='' && this.state.projectData.notes===''){
                console.log('no updates to lyrics or notes')
            }
            else if (this.state.projectData.lyrics==='' && this.state.projectData.notes!=''){
                console.log('update to notes')
                this.props.dispatch({
                    type: 'UPDATE_PROJECT_DATA',
                    payload: {
                        projectData: {...this.state.projectData,
                                        lyrics: currentProject.lyrics},
                        project_id: this.props.match.params
                    }
                })
            }
            else if (this.state.projectData.lyrics!='' && this.state.projectData.notes===''){
                console.log('update to lyrics')
                this.props.dispatch({
                    type: 'UPDATE_PROJECT_DATA',
                    payload: {
                        projectData: {
                            ...this.state.projectData,
                            notes: currentProject.notes
                        },
                        project_id: this.props.match.params
                    }
                })
            }
            else{
                console.log('update both')
                this.props.dispatch({
                    type: 'UPDATE_PROJECT_DATA',
                    payload: {
                        projectData: this.state.projectData,
                        project_id: this.props.match.params
                    }
                })
            }
            

        
    }

    componentDidMount = () => {
        
        const {id} = this.props.match.params
        console.log('ProjectEditor project_id', id)
        this.props.dispatch({ type: 'FETCH_PROJECTS' })
        this.props.dispatch({ type: 'FETCH_FILES', payload: id })
        this.props.dispatch({ type: 'FETCH_REGIONS', payload: id })
        this.props.dispatch({ type: 'FETCH_COLLABORATORS', payload: id})
        
        
    }
    render() {
        this.defineCurrentProject()
        console.log('lyrics', currentProject.lyrics)
        console.log('ProjectEditor new file', this.state.newFile)
        console.log('ProjectEditor project data', this.state.projectData);
        console.log('local state:', this.state.inputIsOpen)
        let lyrics = currentProject.lyrics
        console.log('lyrics', lyrics)
        return (
            <div>
                <NavBar currentProject={currentProject.name}/>
                <div className={this.props.classes.root}>
                    <Grid container spacing={4} layout={'row'}>
                        <Grid item xs={6}>
                            <CurrentCollaborators />
                        </Grid>
                        <Grid item xs={6} >
                            <AddCollaborators />
                        </Grid>
                    </Grid>
                    <Upload />
                    <div>
                        <Grid container>
                            <Grid item xs={8}>
                                <TrackList />
                            </Grid>
                            <Grid container xs={4} direction="column">
                                <Grid>
                                    <Card className={this.props.classes.input}>
                                        <CardContent className={this.props.classes.input}>
                                            <TextField
                                                id="lyrics-textarea"
                                                label="Lyrics"
                                                placeholder="Lyrics Here"
                                                multiline
                                                className={this.props.classes.textField}
                                                margin="normal"
                                                onChange={this.handleLyricsChange}
                                                defaultValue={currentProject.lyrics}
                                            />
                                        </CardContent>
                                    </Card>
                                    
                                </Grid>
                                <Grid>
                                    <Card className={this.props.classes.input}>
                                        <CardContent className={this.props.classes.input}>
                                            <TextField
                                                id="notes-textarea"
                                                label="Notes"
                                                placeholder="Notes Here"
                                                multiline
                                                className={this.props.classes.textField}
                                                margin="normal"
                                                onChange={this.handleNotesChange}
                                                defaultValue={currentProject.notes}
                                            />
                                        </CardContent>
                                    </Card>
                                    
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});


export default connect(mapStateToProps)(withStyles(styles)(ProjectEditor))