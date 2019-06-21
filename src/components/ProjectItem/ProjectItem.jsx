import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import React from "react";

import './ProjectItem.css'

import Swal from 'sweetalert2'

//MUI stuff
import Typography from '@material-ui/core/Typography';
import { Button, Grid} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const theme = createMuiTheme({
    palette: {
        primary: { main: '#9c27b0' },
        secondary: { main: '#ffcc80' },
        
    }
})

const redTheme = createMuiTheme({
    palette: {
        primary: { main: '#b00020' },
        secondary: { main: '#ffcc80' },

    }
})

const useStyles = makeStyles(theme => ({
    projects: {
        width: 'auto',
        position: 'relative',
        top: '10%',
        left: '10%',
        transform: 'translate(-10%, -10%)'
    },
    line: {
        backgroundColor:"#3a3a3a",
        width: 'auto',
        margin: 20,
        borderRadius: '3px'
    },
    panel: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        color: 'rgba(0, 0, 0, 0.75)',
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        width: '75%'
    }
}));

function ControlledExpansionPanels(props) {

    const handleDelete = (project) => {
        //Delete confirmation
        Swal.fire({
            title: 'Are you sure you want to delete this project and its associated files?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                props.dispatch({ type: 'DELETE_PROJECT', payload: project })
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }
    const classes = useStyles();
    //React hooks, this is the same as saying: state = {expanded:true}.  setExpanded sets this.state.expanded
    const [expanded, setExpanded] = React.useState(false);

    //closes expanded panel
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    //clicking open button takes user to project editor for that project
    const handleOpen = (project) => {
        console.log('in handleOpen', project)
        props.history.push(`/project-editor/${project.project_id}`)
    }

    return (
        <ThemeProvider theme={theme}>
                {props.reduxState.projects.map((project, i) => {
                    let sqlDateNewFormat = new Date(project.date_created); 
                    return (
                        <Grid className={classes.line} container spacing={4} alignItems='center' >
                            <Grid item xs={2}>
                                <Button className={classes.button} onClick={() => handleOpen(project)} variant="contained" color="primary">
                                    Open 
                                    <i class="material-icons">
                                        arrow_forward_ios
                                    </i>
                                </Button>
                            </Grid>
                            <Grid item xs={8} alignContent="stretch">
                                <ExpansionPanel className={classes.panel} expanded={expanded === 'panel' + i} onChange={handleChange('panel' + i)}>
                                    <ExpansionPanelSummary
                                        
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panelbh-content"
                                        id="panelbh-header"
                                    >
                                        <Typography className={classes.heading}>{project.name}</Typography>
                                        <Typography className={classes.secondaryHeading}>Created On:  {sqlDateNewFormat.toLocaleDateString()}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography >
                                            Notes:  {project.notes}
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                            
                            <Grid item xs={2}>
                                <ThemeProvider theme={redTheme}>
                                    <Button className={classes.button} onClick={() => { handleDelete(project) }} variant="contained" color="primary">
                                        <i class="material-icons">
                                            delete_forever
                                        </i>
                                    </Button>
                                </ThemeProvider>                                
                            </Grid>
                        </Grid>   
                    )
                })}  
        </ThemeProvider>
    );
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default withRouter(connect(mapStateToProps)(ControlledExpansionPanels));
