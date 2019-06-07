import React, { Component } from 'react';
import { connect } from 'react-redux';
import WaveSurfer from 'wavesurfer.js'
import ReactDOM from 'react-dom'
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js'
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js'

class Microphone extends Component {
    handleRecord = () => {
        console.log('in handleRecord')
        this.wavesurfer.microphone.start();
    }

    handleStop = () => {
        this.wavesurfer.microphone.stop();
    }
    componentDidMount(){
        this.$el = ReactDOM.findDOMNode(this)
        this.$waveform = this.$el.querySelector('#waveform')
        this.wavesurfer = WaveSurfer.create({
            container: this.$waveform,
            waveColor: 'black',
            interact: false,
            cursorWidth: 0,
            // audioContext: context || null,
            // audioScriptProcessor: processor || null,
            plugins: [MicrophonePlugin.create()]
        })
        this.wavesurfer.microphone.on('deviceReady', function () {
            console.info('Device ready!');
        })
        
    }
    render(){
        return(

            <div id="demo">
                <div id="waveform"></div>

                <div className="controls">
                    <button onClick={this.handleRecord} id="recordBtn" className="btn btn-primary" data-action="start">
                        Record
                    </button>
                    <button onClick={this.handleStop} id="stopBtn" >
                        Stop
                    </button>
                </div>
            </div>
            
        )
    }
}

export default connect()(Microphone)
