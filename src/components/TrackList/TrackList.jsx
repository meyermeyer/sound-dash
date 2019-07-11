
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Waveform from '../Waveform/Waveform'
import WaveformTest from '../WaveformTest/WaveformTest'


class TrackList extends Component {
    

    render() {
        console.log('track items', this.props.reduxState.files)
        
        return(
            <>
                {/* <WaveformTest/> */}
                {/* map over files in redux state, send file info as a prop to the waveform component */}
                {this.props.reduxState.files.map(((file,i)=>{
                    return(
                        <>
                            <Waveform key={i} file={file}/>
                            {/* <WaveformTest key={i} file={file}/> */}
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
export default connect(mapStateToProps)(TrackList)