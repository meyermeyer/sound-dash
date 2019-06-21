import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js'
import { connect } from 'react-redux'
import './Waveform.css'

import Loading from '../Loading/Loading'
//MUI stuff
import Fab from '@material-ui/core/Fab';
import {CardContent, Card } from '@material-ui/core'
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

    //annotation/regions functions
    loadRegions = () => {
        this.allowAnnotation();
        for (let region of this.props.reduxState.regions) {
            //load all the regions, check to see if file id matches each file and load appropriately
            if (region.file_id === this.props.file.id) {
                //assign a random color to each region
                region.color = this.randomColor(0.1);
                this.wavesurfer.addRegion(region)
            }
        }
    }

    //allows wavesurfer to accept click and drag regions
    allowAnnotation = () => {
        this.wavesurfer.enableDragSelection({
            color: this.randomColor(.3)
        });
    }


    handleUnmount = () =>{
        //spread regions object into new array, send to saga
        if(this.wavesurfer.regions.list!={}){
            let regionsArray = []
            for (let i in this.wavesurfer.regions.list) {
                regionsArray.push(this.wavesurfer.regions.list[i])
            }

            regionsArray.map(region=>{
                let regionToSend = {
                    id: region.id,
                    start: region.start,
                    end: region.end,
                    data: region.data,
                    file_id: this.props.file.id
                }
                this.props.dispatch({ type: 'SEND_REGIONS', payload: { region: regionToSend, project_id: this.props.match.params }})
            })
        }
    }

    loopRegion = (region) => {
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
        if (document.activeElement!=event.target){
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

    //function sends data to saga for file delete request
    handleDelete = () => {
        console.log('in handleDelete', this.props.file.id)
        
        this.props.dispatch({
            type: 'DELETE_FILE', payload: {
                track_id: this.props.file.id,
                project_id: this.props.match.params
            }
        })
        this.setState({
            trackName: this.props.file.track_name
        })
        this.wavesurfer.load(this.props.file.path, null, 'auto');
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
    componentWillUnmount(){
        this.handleUnmount()
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_REGIONS', payload: this.props.match.params.id})
        this.$el = ReactDOM.findDOMNode(this)
        this.$waveform = this.$el.querySelector('.wave')
        this.wavesurfer = WaveSurfer.create({
            container: this.$waveform,
            waveColor: 'violet',
            progressColor: 'purple',
            responsive: true,
            autoCenter: true,
            interact: true,
            backend: 'MediaElement',
            preload:true,
            minPxPerSec: 3,
            barHeight: .8,
            pixelRatio:1,
            plugins: [
                RegionsPlugin.create({}),
            ]
        })

        this.wavesurfer.load(this.props.file.path, null,'auto');
        this.wavesurfer.on('ready', this.loadRegions)




    }

    render() {

        return (
            <Card className={this.props.classes.card}>
                <CardContent className={this.props.classes.card}>                 
                    <div className={this.props.classes.waveform}>
                        <div className={this.props.classes.top}>
                            <h3 className={this.props.classes.title} onClick={this.editTrackName} onClickAway={this.clickAwayHandle}>
                                {this.checkNameIsClicked()}
                                <ThemeProvider theme={redTheme}>
                                    <Fab className={this.props.classes.delete} onClick={this.handleDelete} aria-label="delete track" style={{  }}>
                                        <i class="material-icons">
                                            delete
                                        </i>
                                    </Fab>
                                </ThemeProvider>
                            </h3>
                        </div>
                        
                        <Loading />
                        <div onClick={this.handleClick} className='wave'>
                        </div>
                        <ThemeProvider theme={theme}>
                            <Fab onClick={this.playAudio} aria-label="play audio" variant="contained" color="primary">
                                <i className="material-icons">
                                    play_circle_outline
                                </i>
                            </Fab>
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                            <Fab onClick={this.pauseAudio} aria-label="pause audio" variant="contained" color="primary">
                                <i class="material-icons">
                                    pause_circle_filled
                                </i>
                            </Fab>
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                            <Fab onClick={this.stopAudio} aria-label="stop audio" variant="contained" color="primary">
                                <i class="material-icons">
                                    stop
                                </i>
                            </Fab>
                        </ThemeProvider>  
                    </div>
                </CardContent>
            </Card>
        )
    }
}

Waveform.defaultProps = {
    src: ""
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default withRouter(withStyles(styles)(connect(mapStateToProps)(Waveform)));

