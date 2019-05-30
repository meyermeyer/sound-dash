import React, {Component} from 'react';
import { render } from 'react-dom';
// import { peaks } from './peaks.js';
import WaveSurfer from 'wavesurfer.js';

class ReactWavesurfer extends Component {
    componentDidMount(){
        const aud = document.querySelector('#song')

        this.wavesurfer=WaveSurfer.create({
            barWidth: 1,
            cursorWidth: 1,
            container: '#waveform',
            backend: 'MediaElement',
            height: 80,
            progressColor: '#4a74a5',
            responsive: true,
            waveColor: '#ccc',
            cursorColor: '#4a74a5', 
        })

        this.wavesurfer.load(aud);
    }

    playIt = () => {
        this.wavesurfer.playPause();
    }

    render() {
        return(
            <div>
                <button onClick={this.playIt}>Play</button>
                <div
                    style={{ border: '1px solid grey', width: 150, height: 80 }}
                    id="waveform"
                />
                <audio
                    id="song"
                    src="https://reelcrafter-east.s3.amazonaws.com/aux/test.m4a"
                />
            </div>
        )
    }
}

export default ReactWavesurfer;