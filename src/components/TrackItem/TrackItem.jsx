import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class TrackItem extends Component {
    componentDidMount(){
        console.log('get those tracks',this.props.reduxState.currentProject);
        this.props.dispatch({type:'FETCH_FILES', payload:this.props.reduxState.currentProject})
    }

    render() {
        console.log('track items', this.props.reduxState.files)
        return(
            <>
                {this.props.reduxState.files.map((file=>{
                    return(
                        <p>{file.track_name}</p>
                    )
                    
                }))}
            </>
            
        //     <li>Tracks Here</li>
        )
    }
}
const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(TrackItem)