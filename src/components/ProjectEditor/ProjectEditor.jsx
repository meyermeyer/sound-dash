import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ProjectEditor extends Component {
    render() {
        return (
            <div>
                <h3>Add New Files</h3>
                <input aria-label="web url" type="text" placeholder="web url"></input>
                <ul>
                    <li>load waveforms here</li>
                </ul>
                <input aria-label="lyrics" type="text" placeholder="lyrics"></input>
                <input aria-label="notes" type="text" placeholder="notes"></input>
            </div>
        )
    }
}

export default connect()(ProjectEditor)