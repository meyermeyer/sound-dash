import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import React, { useState, useEffect } from "react";

import './ProjectItem.css'

import Swal from 'sweetalert2'
//MUI stuff
import Typography from '@material-ui/core/Typography';
import { Button, Grid, Red} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import red from '@material-ui/core/colors/red'

const theme = createMuiTheme({
    palette: {
        primary: { main: '#9c27b0' },
        secondary: { main: '#ffcc80' },
    }
})

const redTheme = createMuiTheme({
    palette: {
        primary: { main: '#C62828'}
    }
})

const useStyles = makeStyles(theme => ({
    container: {
        margin: '30px',
        
    },
    button:{
        width: '50%',
        
        flexBasis: 0,
    },

    openButton:{
        flexBasis: 'auto',
        alignItems: 'center',
        
    },
    panel: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        color: 'rgba(0, 0, 0, 0.75)',
        // fontWeight: 'bold',
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
    // const [initialized, setInitialized] = useState(false);
    // useEffect(()=>{
    //     if (!initialized){
    //         props.dispatch({ type: 'FETCH_PROJECTS' })
    //         setInitialized(true);
    //     }
    // })
    
    const handleDelete = (project) => {
        console.log('in handleDelete', project)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                console.log('in SWAL delete confirmed', project)
                props.dispatch({ type: 'DELETE_PROJECT', payload: project })
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
            else {
                console.log('in SWAL delete, cancel', project)
            }
        })
    }
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    console.log('in ControlledExpansionPanels', props.reduxState.projects)
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleOpen = (project) => {
        console.log('in handleOpen', project)
        props.history.push(`/project-editor/${project.project_id}`)
    }
    // const handleEdit = (project) => {
    //     console.log('in handleEdit')
    //     Swal.fire({
    //         title: 'Rename Project',
    //         text: 'Edit Name',
    //         input: 'text',
    //         // inputValue: inputValue,
    //         showCancelButton: true,
    //         inputValidator: (value) => {
    //             console.log(value);
    //             project = {
    //                 ...project,
    //                 name: value
    //             }
    //             console.log(project);
                
                
    //             if(!value) {
    //                 return 'Enter text or select Cancel'
    //             }
    //         }
    //     })
    //         props.dispatch({ type: 'UPDATE_PROJECT', payload: project })
    
        
    // }
    

    return (
        <ThemeProvider theme={theme}>
            {/* <ul className={classes.root}> */}
                {props.reduxState.projects.map((project, i) => {
                    return (
                        <Grid container spacing={4} className={classes.container} justify="center"
                            alignItems="stretch">
                            {/* <li key={i} className="projectList"> */}
                                {/* <Button onClick={()=>handleEdit(project)} variant="contained" color="primary">Rename</Button> */}
                            <Grid item xs={2} className={classes.openButton} alignItems="stretch">
                                <Button className={classes.button} onClick={() => handleOpen(project)} variant="contained" color="primary">
                                    <Typography>
                                        Open
                                        <i class="material-icons">
                                                open_in_new
                                        </i>
                                        {/* <img className={classes.icon} src='/images/folder-open-outline.png'/> */}
                                    </Typography>
                                    
                                    
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
                                            <Typography className={classes.secondaryHeading}>Created On:  {project.date_last_edit}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Typography >
                                                Notes:  {project.notes}
                                            </Typography>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </Grid>
                            <Grid item xs={2} alignContent='center'>
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
// withRouter(connect(mapReduxStateToProps)(Review))