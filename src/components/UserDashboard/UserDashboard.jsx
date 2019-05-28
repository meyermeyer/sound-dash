import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
            title: 'test',
            text: 'asdasd',
            confirmButtonText: 'cool'
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
                
                <ul>
                    <li>existing projects</li>
                </ul>
            </div>
            
        )
    }
}

export default connect()(UserDashboard)