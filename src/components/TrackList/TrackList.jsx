import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class TrackList extends Component {
    render() {
        return(
            <ul>
                <li>tracks here</li>
            </ul>
        )
    }
}

export default connect()(TrackList)