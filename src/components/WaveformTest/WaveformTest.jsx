import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js'
import { connect } from 'react-redux'
// import './Waveform.css'

import Loading from '../Loading/Loading'

//MUI stuff
import Fab from '@material-ui/core/Fab';
import { CardContent, Card } from '@material-ui/core'
import { createMuiTheme, withStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#9c27b0' },
        secondary: { main: '#ffcc80' }
    }
})

const redTheme = createMuiTheme({
    palette: {
        primary: { main: '#c62828' },
        secondary: { main: '#ffcc80' }
    }
})

const styles = (theme, redTheme) => ({
    waveform: {
        height: 'auto',
        backgroundColor: '#3a3a3a'
    },
    title: {
        margin: 0,
        color: 'white'
    },
    top: {
        display: 'inline'
    },
    delete: {
        float: 'right',
        color: '#5a5959'

    },
    editor: {
        width: '70%',
        backgroundColor: 'pink'
    },
    card: {
        backgroundColor: '#3a3a3a',
        marginBottom: 5,
        paddingBottom: '0 !important'
    }

})

class Waveform extends React.Component {
    state = {
        regionsArray: [],
        randomColor: '',
        trackNameInput: '',
        trackNameIsClicked: false,
        newRegion: {
            start: '',
            end: '',
            data: {
                regionTag: '',
                regionNotes: ''
            },
            file_id: 0
        }
    }
    checkNameIsClicked = () => {
        if (this.state.trackNameIsClicked) {
            return (
                <>
                    <form className="editor" onSubmit={this.handleNameSubmit} >
                        <input className={this.props.classes.input} onChange={this.handleNameInput} placeholder={this.props.file.track_name} ></input>
                    </form>
                </>
            )
        }
        else {
            return (
                <>
                    <i class="material-icons">
                        edit
                    </i>
                    {this.props.file.track_name}
                </>
            )
        }
    }

    //function re-renders track header as input field on click for track title update
    editTrackName = (event) => {
        if (document.activeElement != event.target) {
            console.log('cool')
        }
        this.setState({
            ...this.state,
            trackNameIsClicked: true
        })
    }

    //function stores input value to local state
    handleNameInput = (event) => {
        this.setState({
            ...this.state,
            trackNameInput: event.target.value
        })

    }

    //function changes input back to static h3 on 'enter', sends input value to SAGA for PUT to server/database
    handleNameSubmit = (event) => {
        event.preventDefault();
        this.setState({
            ...this.state,
            trackNameIsClicked: false
        })
        this.props.dispatch({
            type: 'UPDATE_FILE',
            payload: {
                trackName: this.state.trackNameInput,
                track_id: this.props.file.id,
                project_id: this.props.match.params
            }
        })
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
        this.$el = ReactDOM.findDOMNode(this)
        this.$waveform = this.$el.querySelector('.wave')
        this.wavesurfer = WaveSurfer.create({
            container: this.$waveform,
            waveColor: 'violet',
            progressColor: 'purple',
            backend: 'MediaElement',
            plugins: [RegionsPlugin.create({})]
        })
        this.wavesurfer.load(this.props.file.path, null, 'auto');
        // this.wavesurfer.load(dogBarking);
        console.log(this.wavesurfer.regions);
        this.wavesurfer.on('region-update-end', this.saveRegions);
        this.wavesurfer.on('region-mouseenter', this.handleHover)
        this.wavesurfer.on('ready', this.allowAnnotation)
        this.wavesurfer.on()
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
                <div className={this.props.classes.top}>
                    <h3 className={this.props.classes.title} onClick={this.editTrackName} onClickAway={this.clickAwayHandle}>
                        {this.checkNameIsClicked()}
                        <ThemeProvider theme={redTheme}>
                            <Fab className={this.props.classes.delete} onClick={this.handleDelete} aria-label="delete track" style={{}}>
                                <i class="material-icons">
                                    delete
                                        </i>
                            </Fab>
                        </ThemeProvider>
                    </h3>
                </div> 
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
export default withStyles(styles)(connect(mapStateToProps)(Waveform));