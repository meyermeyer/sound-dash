import React from 'react';
import { connect } from 'react-redux'

import './ProjectItem.css'

//MUI stuff
import Typography from '@material-ui/core/Typography';
import { Button, Card, CardContent, CardActions } from '@material-ui/core';
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
        secondary: { main: '#ffcc80' }
    }
})

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

function ControlledExpansionPanels(props) {
    const handleDelete = (project) => {
        console.log('in handleDelete')
        props.dispatch({ type: 'DELETE_PROJECT', payload: project })
    }
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    console.log('in ControlledExpansionPanels', props.reduxState.projects)
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleEdit = (project) => {
        console.log('in handleEdit')
        props.dispatch({type: 'UPDATE_PROJECT', payload: project})
    }

    return (
        <div className={classes.root}>
            {props.reduxState.projects.map((project, i) => {
                return (
                    <li className="projectList">
                        <ThemeProvider theme={theme}>
                            <Button onClick={handleEdit} variant="contained" color="primary">Edit</Button>
                        </ThemeProvider>
                        <ExpansionPanel expanded={expanded === 'panel' + i} onChange={handleChange('panel' + i)}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panelbh-content"
                                id="panelbh-header"
                            >
                                <Typography className={classes.heading}>{project.name}</Typography>
                                <Typography className={classes.secondaryHeading}>Last Updated:  {project.date_last_edit}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    <p>Created On:  {project.date_created}</p>
                                    <p>Notes:  {project.notes}</p>

                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ThemeProvider theme={theme}>
                            <Button onClick={() => { handleDelete(project) }} variant="contained" color="secondary">Delete</Button>
                        </ThemeProvider>

                    </li>
                )
            })}


        </div>





    );
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(ControlledExpansionPanels);