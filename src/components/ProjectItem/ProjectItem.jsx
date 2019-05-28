import React from 'react';
import {connect} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    console.log('in ControlledExpansionPanels', props.reduxState.projects)
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        
           
                
                    <div  className={classes.root}>
                        
                            {props.reduxState.projects.map((project,i)=> {
                                return(
                                    <ExpansionPanel expanded={expanded === 'panel'+i} onChange={handleChange('panel'+i)}>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panelbh-content"
                                            id="panelbh-header"
                                        >
                                            <Typography className={classes.heading}>{project.name}</Typography>
                                            <Typography className={classes.secondaryHeading}>{project.date_created}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Typography>
                                                {project.date_created}
                                                {project.notes}
                                            </Typography>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                )
                            })}
                            
                        
                    </div>
               
        
            
            
        
    );
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(ControlledExpansionPanels);