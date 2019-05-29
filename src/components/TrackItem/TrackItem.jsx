import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class TrackItem extends Component {
    

    render() {
        console.log('track items', this.props.reduxState.files)
        return(
            <>
                {this.props.reduxState.files.map(((file,i)=>{
                    return(
                        <p key={i}>{file.track_name}</p>
                    )
                    
                }))}
            </>
            
       
        )
    }
}
const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(TrackItem)