import React, { Component } from 'react'; 
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button, Grid, Card, CardContent } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';




class CurrentCollaborators extends Component {
    handleDelete = (collaborator) =>{
        console.log('handleDelete', collaborator, this.props.match.params)
        this.props.dispatch({type:'DELETE_COLLABORATOR', payload:{collaborator: collaborator, project_id:this.props.match.params}})
    }

    render() {
        return (
            <div id="currentCollaborators">
                {/* <Card> */}
                    {/* <CardContent> */}
                        <h3>Shared with:</h3>
                        {this.props.reduxState.collaborators.map((collaborator, i) => {
                            if (collaborator.id != this.props.reduxState.user.id)
                                return (
                                    <Chip
                                        color="secondary"
                                        key={i}
                                        avatar={<Avatar>{collaborator.username.charAt(0).toUpperCase()}</Avatar>}
                                        label={collaborator.username}
                                        onDelete={()=>this.handleDelete(collaborator)}
                                    />
                                )
                        })}
                    {/* </CardContent> */}
                {/* </Card> */}

            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default withRouter(connect(mapStateToProps)(CurrentCollaborators))