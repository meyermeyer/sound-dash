import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Waveform from '../Waveform/Waveform'
import ReactWavesurfer from '../ReactWavesurfer/ReactWavesurfer';

class TrackItem extends Component {
    

    render() {
        console.log('track items', this.props.reduxState.files)
        
        return(
            <>
                {/* <ReactWavesurfer /> */}
                {this.props.reduxState.files.map(((file,i)=>{
                    return(
                        <>
                            {/* <p key={i}>{file.track_name}</p> */}
                            <Waveform file={file}/>
                        </>
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