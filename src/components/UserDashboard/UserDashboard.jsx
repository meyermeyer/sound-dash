import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TrackList from '../TrackList/TrackList'
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
    nameProject = () => {
        console.log('in nameProject');
        Swal.fire({
            title: 'New Project',
            text: 'Please name your project.',
            html: '<input id="projectNameInput" class="swal2-input" type="text" placeholder="Project Name">'+
                    '<input id="projecttagInput" class="swal2-input" type="textarea" placeholder="Project Tags">',
            input: 'textarea',
            inputPlaceholder: 'Enter project tags here...',
            confirmButtonText: 'Create',
            showCancelButton: true,
        })
        
        
    }
    render() {
        return(
            <div>
                <h3>
                    <ThemeProvider theme={theme}>
                        <Button onClick={this.nameProject}aria-label="create new project" variant="contained" color="primary">Create New Project</Button>
                    </ThemeProvider>
                </h3>
                <TrackList />
            </div>
            
        )
    }
}

export default connect()(UserDashboard)