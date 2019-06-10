import React, { Component } from 'react'; 
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Paper, Button, Grid, Card, CardContent } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    root: {
        height: '100%'
    },
    card: {
        height: '100%'
    },
    content: {
        height: '100%',
    },
    chip: {
        margin: '5px'
    }
})


class CurrentCollaborators extends Component {
    handleDelete = (collaborator) =>{
        console.log('handleDelete', collaborator, this.props.match.params)
        this.props.dispatch({type:'DELETE_COLLABORATOR', payload:{collaborator: collaborator, project_id:this.props.match.params}})
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <Card className={this.props.classes.card}>
                    <CardContent className={this.props.classes.content}>
                    {/* <Paper> */}
                        <h3>Shared with:</h3>
                        {this.props.reduxState.collaborators.map((collaborator, i) => {
                            if (collaborator.id != this.props.reduxState.user.id)
                                return (
                                    <Chip
                                        className={this.props.classes.chip}
                                        color="primary"
                                        key={i}
                                        avatar={<Avatar>{collaborator.username.charAt(0).toUpperCase()}</Avatar>}
                                        label={collaborator.username}
                                        onDelete={() => this.handleDelete(collaborator)}
                                    />
                                )
                        })}
                    {/* </Paper> */}
                        
                    </CardContent>
                </Card>

            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default withRouter(withStyles(styles)(connect(mapStateToProps)(CurrentCollaborators)))