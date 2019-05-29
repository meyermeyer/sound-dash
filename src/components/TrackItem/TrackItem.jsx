import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class TrackItem extends Component {
    componentDidMount(){
        this.props.dispatch({type:'FETCH_FILES'})
    }
    
    render() {
        return(
            <li>Tracks Here</li>
        )
    }
}

export default connect()(TrackItem)