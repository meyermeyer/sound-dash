import React, { Component } from 'react';

import { connect } from 'react-redux';
import NavBar from '../NavBar/NavBar'


import ProjectItem from '../ProjectItem/ProjectItem'


//Material-UI stuff
import { Button } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';


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
        this.props.dispatch({ type: 'ADD_PROJECT', payload: this.state.newProject })

    }

    nameProject = () => {
        console.log('in nameProject');
        Swal.fire({
            title: 'New Project',
            text: 'Please name your project.',
            html: `<input id="projectNameInput" class="swal2-input" type="text" placeholder="Project Name">`,
            confirmButtonText: 'Create',
            showCancelButton: true,
            //capture input text
            preConfirm: () => { this.handleInputs(document.getElementById('projectNameInput').value) }
        })
    }

    //launch fetchProjectsSaga on page load
    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_PROJECTS' })
    }

    render() {
        //log to test setting local state worked
        console.log('in handleInputs state:', this.state)
        return (
            <div>
                <NavBar />
                <h3>
                    <ThemeProvider theme={theme}>
                        <Button onClick={this.nameProject} aria-label="create new project" variant="contained" color="primary">Create New Project</Button>
                    </ThemeProvider>
                </h3>
                <ProjectItem />
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(UserDashboard)