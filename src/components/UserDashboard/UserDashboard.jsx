import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'


import ProjectItem from '../ProjectItem/ProjectItem'


//Material-UI stuff
import { Button } from '@material-ui/core';
import { createMuiTheme, withStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';


//SweetAlert2
import Swal from 'sweetalert2'


const styles = theme => ({
    '@global': {
        body: {
            height: '100vh !important',
            width: '100%',
            backgroundColor: "#4a4a4a",
        },
    },
    root: {
        height: '100vh',
        width: '100%',
        backgroundColor: "#4a4a4a",
        marginBottom: '25px'
    },
    createNew: {
        textAlign: "center"
    },
    button: {
        // height: 70,
        display: 'inline-block'
    }
})


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
            <div className={this.props.classes.root}>
                <NavBar />
                <h3 className={this.props.classes.createNew}>
                    <ThemeProvider theme={theme}>
                        <Button className={this.props.classes.button} onClick={this.nameProject} aria-label="create new project" variant="contained" color="primary">
                            <p>
                                <i class="material-icons">
                                add
                                </i>
                            </p>
                            <p>Create New Project</p>
                        </Button>
                    </ThemeProvider>
                </h3>
                <ProjectItem elevation={6} square/>
                {/* <Footer/> */}
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default withStyles(styles)(connect(mapStateToProps)(UserDashboard))