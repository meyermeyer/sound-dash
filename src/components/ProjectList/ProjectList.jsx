import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ProjectItem from '../ProjectItem/ProjectItem'

class ProjectList extends Component {
    render() {
        return(
            <div>
                <ProjectItem />
            </div>
                
            

            
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(ProjectList)