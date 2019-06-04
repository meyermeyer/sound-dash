
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Waveform from '../Waveform/Waveform'


class TrackItem extends Component {
    

    render() {
        console.log('track items', this.props.reduxState.files)
        
        return(
            <>
                
                {this.props.reduxState.files.map(((file,i)=>{
                    return(
                        <>
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