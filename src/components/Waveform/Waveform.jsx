import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import WaveSurfer from 'wavesurfer.js'
import dogBarking from '../../audio/Big_Dog_Barking.mp3'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js'
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js'
import { connect } from 'react-redux'
import redux from 'redux'
import './Waveform.css'

class Waveform extends React.Component {
    state = {
        regionsArray: [],
        trackName: '',
        randomColor: ''
    }

    // wavesurfer = WaveSurfer.create({
    //     container: this.$waveform,
    //     waveColor: 'violet',
    //     progressColor: 'purple',
    //     backend: 'MediaElement',
    //     plugins: [RegionsPlugin.create({})]
    // })
    // saveRegions = () => {
    //     console.log('in saveRegions');
    //     this.setState({
    //         regions: 
    //     })

    // }



    randomColor = (alpha) => {
        return (
            'rgba(' +
            [
                ~~(Math.random() * 255),
                ~~(Math.random() * 255),
                ~~(Math.random() * 255),
                alpha || 1
            ] +
            ')'
        );
    }

    allowAnnotation = () => {
        console.log('in allowAnnotation');
        this.wavesurfer.enableDragSelection({
            color: this.randomColor(.1)
        });
    }

    handleHover = (region) => {
        console.log('hovering over', region.data.regionTag);


    }

    editTrackName = () => {
        console.log('in editTrackName');
        this.setState({
            ...this.state,
            trackName:
                <form onSubmit={this.handleNameSubmit}>
                    <input onChange={this.handleNameInput}></input>
                </form>

        })

    }

    handleNameInput = (event) => {
        console.log('in handleNameInput', event.target.value);
        this.setState({
            ...this.state,
            trackNameInput: event.target.value
        })
    }

    handleNameSubmit = (event) => {
        event.preventDefault();
        console.log('in handleNameSubmit');
        this.setState({
            ...this.state,
            trackName: this.state.trackNameInput,
            trackNameInput: ''
        })


    }

    labelRegion = (region) => {

    }

    saveRegions = (region) => {
        // alert('you created a region');
        let regionTag = prompt("Tag")
        let regionNotes = prompt("Notes")
        console.log('region:', region);
        //update 'region' created by clicking to include user's data
        region.update({
            data: {
                regionTag,
                regionNotes
            }
        })
        console.log('updated region', region);
        console.log('prompt responses:', regionTag, regionNotes);
        console.log(this.wavesurfer.regions);

        //add regions.list objects to arrat
        let regionsArray = []
        for (let i in this.wavesurfer.regions.list) {
            regionsArray.push(this.wavesurfer.regions.list[i])
        }
        console.log('in saveRegions', this.wavesurfer.regions.list);
        console.log('regionsArray', regionsArray);

        this.wavesurfer.regions.list && this.setState({
            ...this.state,
            regionsArray: regionsArray
        })
        this.props.dispatch({ type: "SEND_REGIONS", payload: regionsArray, })
    }

    loopRegion = (region) => {
        console.log('in loopRegion');
        region.update({
            loop: true
        })
        region.playLoop();


    }

    playAudio = () => {
        this.wavesurfer.play();
    }

    pauseAudio = () => {
        this.wavesurfer.pause();
    }

    stopAudio = () => {
        this.wavesurfer.stop();
    }

    componentDidMount() {
        console.log('WaveSurfer object:', WaveSurfer);
        console.log('props', this.props.file);
        
        // update track name
        this.setState({
            trackName: this.props.file.track_name
        })
        this.$el = ReactDOM.findDOMNode(this)
        this.$waveform = this.$el.querySelector('.wave')
        this.wavesurfer = WaveSurfer.create({
            container: this.$waveform,
            waveColor: 'violet',
            progressColor: 'purple',
            backend: 'MediaElement',
            plugins: [RegionsPlugin.create({}), MicrophonePlugin.create({})]
        })
        // this.$waveform2 = this.$el.querySelector('.wave2')
        // this.wavesurfer2 = WaveSurfer.create({
        //     container: this.$waveform2,
        //     waveColor: 'violet',
        //     progressColor: 'purple',
        //     backend: 'MediaElement',
        //     plugins: [MicrophonePlugin.create({})]
        // })
        this.wavesurfer.load('https://reelcrafter-east.s3.amazonaws.com/aux/test.m4a');
        // this.wavesurfer.load('http://www.archive.org/download/mshortworks_001_1202_librivox/msw001_03_rashomon_akutagawa_mt_64kb.mp3')
        // this.wavesurfer .load(dogBarking);
        console.log(this.wavesurfer.regions);
        this.wavesurfer.on('region-update-end', this.saveRegions);
        this.wavesurfer.on('region-mouseenter', this.handleHover)
        this.wavesurfer.on('ready', this.allowAnnotation)
        this.wavesurfer.on('region-dblclick', this.loopRegion)
        // this.wavesurfer.on('region-click', this.labelRegion)


    }

    // componentDidUpdate() {
    //     this.wavesurfer.enableDragSelection({
    //         color: this.randomColor(0.1)
    //     });
    // }
    componentWillUnmount() {

    }
    render() {


        console.log('setting regions', this.state.regionsList);


        return (
            <div className='waveform'>
                <h3 onClick={this.editTrackName}>{this.state.trackName}</h3>
                <div onClick={this.handleClick} className='wave'>
                    {/* {this.state.regionsArray.map((region)=>{
                        return(
                            <p id='tag'>{region.data.regionTag}</p>
                        )
                        
                    })} */}
                </div>
                <div className='wave2'></div>
                <button onClick={this.playAudio}>Play</button>
                <button onClick={this.pauseAudio}>Pause</button>
                <button onClick={this.stopAudio}>Stop</button>
                {/* <button onClick={this.allowAnnotation}>Annotate</button> */}
                <ul>
                    {this.state.regionsArray.map((region) => {
                        return (
                            <li>{region.data.regionTag}</li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

Waveform.defaultProps = {
    src: ""
}

export default connect()(Waveform);

