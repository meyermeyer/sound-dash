import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import WaveSurfer from 'wavesurfer.js'
import dogBarking from '../../audio/Big_Dog_Barking.mp3'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js'
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import './Waveform.css'

//MUI stuff
import {Button} from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#9c27b0' },
        secondary: { main: '#ffcc80' }
    }
})


class Waveform extends React.Component {
    state = {
        regionsArray: [],
        trackName: '',
        randomColor: '',
        trackNameInput:''
    }

    

//annotation/regions functions
    allowAnnotation = () => {
        console.log('in allowAnnotation');
        this.wavesurfer.enableDragSelection({
            color: this.randomColor(.1)
        });
    }

    handleHover = (region) => {
        console.log('hovering over', region.data.regionTag);
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

//file functions
    //function re-renders track header as input field on click for track title update
    editTrackName = () => {
        console.log('in editTrackName');
        this.setState({
            ...this.state,
            trackName:
                <form className="form" onSubmit={this.handleNameSubmit} >
                    <input onChange={this.handleNameInput} placeholder={this.props.file.track_name} ></input>
                </form>
        })
    }

    //function stores input value to local state
    handleNameInput = (event) => {
        console.log('in handleNameInput', event.target.value);
        this.setState({
            ...this.state,
            trackNameInput: event.target.value
        })
        
    }

    //function changes input back to static h3 on 'enter', sends input value to SAGA for PUT to server/database
    handleNameSubmit = (event) => {
        event.preventDefault();
        console.log('in handleNameSubmit');
        this.setState({
            ...this.state,
            trackName: this.state.trackNameInput
        })
        this.props.dispatch({ type: 'UPDATE_FILE', 
                                payload: { trackName: this.state.trackNameInput,
                                           track_id: this.props.file.id,
                                           project_id: this.props.reduxState.currentProject.project_id}
        })
    }

    //function sends data to saga for file delete request
    handleDelete = () => {
        console.log('in handleDelete', this.props.file.id)
        this.props.dispatch({type: 'DELETE_FILE', payload: {track_id:this.props.file.id, 
                                                            project_id: this.props.reduxState.currentProject.project_id}})
    }

    
//file play functions
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
        // console.log('WaveSurfer object:', WaveSurfer);
        // console.log('props', this.props.file);
        
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
        console.log('newFile', this.state.trackName);

        return (
            <div className='waveform'>
                <h3 onClick={this.editTrackName}>{this.state.trackName}</h3>
                <ThemeProvider theme={theme}>
                    <Button onClick={this.handleDelete} aria-label="create new project" variant="contained" color="primary">Delete</Button>
                </ThemeProvider>
                <div onClick={this.handleClick} className='wave'>
                    {/* {this.state.regionsArray.map((region)=>{
                        return(
                            <p id='tag'>{region.data.regionTag}</p>
                        )
                        
                    })} */}
                </div>
                <div className='wave2'></div>
                <ThemeProvider theme={theme}>
                    <Button onClick={this.playAudio} aria-label="create new project" variant="contained" color="primary">Play</Button>
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                    <Button onClick={this.pauseAudio} aria-label="create new project" variant="contained" color="primary">Pause</Button>
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                    <Button onClick={this.stopAudio} aria-label="create new project" variant="contained" color="primary">Stop</Button>
                </ThemeProvider>
                {/* <button onClick={this.playAudio}>Play</button>
                <button onClick={this.pauseAudio}>Pause</button>
                <button onClick={this.stopAudio}>Stop</button> */}
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

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(Waveform);

