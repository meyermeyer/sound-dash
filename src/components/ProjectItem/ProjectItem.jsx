import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ProjectItem extends Component {
    render() {
        console.log('ProjectItem', this.props.reduxState)
        return(
            <>
                {this.props.reduxState.projects.map((project, i) => {
                    return (
                        <li key={i}>{project.name}</li>
                    )
                })}

            </>

            // <li>Project Item Here</li>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(ProjectItem)