import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ProjectItem extends Component {
    render() {
        return(
            <li>Project Item Here</li>
        )
    }
}

export default connect()(ProjectItem)