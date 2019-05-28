import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TrackItem from '../TrackItem/TrackItem'

class TrackList extends Component {
    render() {
        return(
            <ul>
                <TrackItem />
            </ul>
        )
    }
}

export default connect()(TrackList)