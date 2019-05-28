import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TrackList from '../TrackList/TrackList'

class ProjectEditor extends Component {
    render() {
        return (
            <div>
                <h3>Add New Files</h3>
                <input aria-label="web url" type="text" placeholder="web url"></input>
                <ul>
                    <TrackList />
                </ul>
                <input aria-label="lyrics" type="text" placeholder="lyrics"></input>
                <input aria-label="notes" type="text" placeholder="notes"></input>
            </div>
        )
    }
}

export default connect()(ProjectEditor)