import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import Time from 'react-time'

import ProjectList from '../ProjectList/ProjectList'
//Material-UI stuff
import { Button, Card, CardContent, CardActions, Typography } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';
import Icon from '@material-ui/core/Icon'

//SweetAlert2
import Swal from 'sweetalert2'

const theme = createMuiTheme({
    palette: {
        primary: { main: '#9c27b0' },
        secondary: { main: '#ffcc80' }
    }
})

class UserDashboard extends Component {
    state = {
        newProject: {
            name: '',
            notes: '',
            dateCreated: ''
        }
    }
    //handle sweetAlert inputs for creating project
    handleInputs = (name, notes) => {
        console.log('in handleInput name:', name, 'notes:', notes, 'date:', new Date());
        this.setState({
            newProject: {
                name: name,
                notes: notes,
                dateCreated: new Date()
            }
        })

    }
    
    nameProject = () => {
        console.log('in nameProject');
        Swal.fire({
            title: 'New Project',
            text: 'Please name your project.',
            html: `<input id="projectNameInput" class="swal2-input" type="text" placeholder="Project Name">`+
                    '<input id="projectNotesInput" class="swal2-input" type="textarea" placeholder="Project Tags">',
            confirmButtonText: 'Create',
            showCancelButton: true,
            //capture input text
            preConfirm: ()=>{this.handleInputs(document.getElementById('projectNameInput').value,
                document.getElementById('projectNotesInput').value)}
        })
        
        
    }

    //launch fetchProjectsSaga on page load
    componentDidMount = () => {
        this.props.dispatch({type: 'FETCH_PROJECTS'})
    }
    render() {
        //log to test setting local state worked
        console.log('in handleInputs state:', this.state)
        return(
            <div>
                <h3>
                    <ThemeProvider theme={theme}>
                        <Button onClick={this.nameProject}aria-label="create new project" variant="contained" color="primary">Create New Project</Button>
                    </ThemeProvider>
                </h3>
                <ProjectList />
                
            </div>
            
        )
    }
}

export default connect()(UserDashboard)