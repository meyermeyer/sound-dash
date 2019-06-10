import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Autocomplete from '../Autocomplete/Autocomplete';

import {withStyles} from '@material-ui/core/styles'
import { Card, CardContent } from '@material-ui/core';

const styles = theme => ({
    root: {
        height: '100%'
    },
    card: {
        height: '100%'
    }
})


class AddCollaborators extends Component {
    
    render(){
        return(
            <div className={this.props.classes.root}>
                <Card className={this.props.classes.card}>
                    <CardContent className={this.props.classes.card}>
                        <Autocomplete />
                    </CardContent>
                </Card>
                
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default withStyles(styles)(connect(mapStateToProps)(AddCollaborators))