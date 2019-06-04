import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import WaveSurfer from 'wavesurfer.js'
import dogBarking from '../../audio/Big_Dog_Barking.mp3'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js'
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js'
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import './Waveform.css'

//MUI stuff
import { Button, icons, CardContent, Card } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';
import SvgIcon from '@material-ui/core/SvgIcon'


const theme = createMuiTheme({
    palette: {
        primary: { main: '#9c27b0' },
        secondary: { main: '#ffcc80' }
    }
})


class Waveform extends React.Component {
    state = {
        regionsArray: [],
        // trackName: '',
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
        console.log('in loadRegions', this.props.reduxState.regions);
        this.allowAnnotation();
        // this.wavesurfer.addRegion()
        // for (let region of this.props.reduxState.regions) {
        //     console.log('map regions:', region);

        //     if (region.file_id === this.props.file.id) {
        //         console.log('map regions:', region);
        //         region.color = this.randomColor(0.1);
        //         this.wavesurfer.addRegion(region)
        //     }
        // }
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

    addNewRegion = (region) => {
        console.log(`in addNewRegion:{start:${region.start} id:${region.id}}`, region, region.start)
        let regionsArray = [];
        regionsArray.push(region);
        // for (let i in this.wavesurfer.regions.list) {
        //     regionsArray.push(this.wavesurfer.regions.list[i])
        // }

        // this.wavesurfer.regions.list && this.setState({
        //     ...this.state,
        //     regionsArray: [...this.state.regionsArray, region]
        // })

        console.log('in createRegion', this.wavesurfer.regions.list);
        console.log('regionsArray', regionsArray);



        // let newRegion = this.state.regionsArray[this.state.regionsArray.length - 1]
        // console.log('newRegion = ', newRegion);

        // this.setState({
        //     ...this.state,
        //     newRegion: {
        //         start: newRegion.start,
        //         end: newRegion.end,
        //         data: newRegion.data,
        //         file_id: this.props.file.id,
        //         region_id: newRegion.id
        //     }
        // })
        // let newRegionIndex = this.state.regionsArray.length-1
        let newRegion = {
            color: region.color,
            data: region.data,
            start: region.start,
            end: region.end,
            region_id: region.id,
            file_id: this.props.file.id
        }
        console.log('newRegion in addRegion', newRegion);
        
        //send newRegion to saga to save in database
        this.props.dispatch({ type: "SEND_REGIONS", payload: { region: newRegion, project_id: this.props.reduxState.currentProject.project_id } })
    }

    
    createRegion = (region) => {
        console.log('created region', region);
        
        this.wavesurfer.on('region-update-complete',this.addNewRegion)
    //     r
    // }
    // saveRegions = (region) => {
    //     //sweet alert for labeling region
    //     // Swal.fire({
    //     //     title: 'New Region',
    //     //     text: 'Region',
    //     //     html: `<input id="regionTagInput" class="swal2-input" type="text" placeholder="Region Tag">` +
    //     //         '<input id="regionNotesInput" class="swal2-input" type="textarea" placeholder="Region Notes">',
    //     //     confirmButtonText: 'Create',
    //     //     showCancelButton: true,
    //     //     allowEnterKey: true,
    //     //     //capture input text
    //     //     preConfirm: () => {

    //     //         let regionTag = document.getElementById('regionTagInput').value;
    //     //         let regionNotes = document.getElementById('regionNotesInput').value;
    //     //         console.log('SWAL', regionTag, regionNotes);

    //     //         // update 'region' created by clicking to include user's data
    //     //         region.update({
    //     //             data: {
    //     //                 regionTag,
    //     //                 regionNotes
    //     //             }
    //     //         })

    //     //     }
    //     // })
    //     console.log('updated region', region);

    //     // console.log('this.wavesurfer.regions',this.wavesurfer.regions);

    //     //add regions.list objects to array
    //     let regionsArray = []
    //     for (let i in this.wavesurfer.regions.list) {
    //         regionsArray.push(this.wavesurfer.regions.list[i])
    //     }
        
    //     console.log('in saveRegions', this.wavesurfer.regions.list);
    //     console.log('regionsArray', regionsArray);

    //     this.wavesurfer.regions.list && this.setState({
    //         ...this.state,
    //         regionsArray: regionsArray
    //     })

    //     let newRegion = this.state.regionsArray[this.state.regionsArray.length - 1]
    //     this.setState({
    //         ...this.state,
    //         newRegion: {
    //             start: newRegion.start,
    //             end: newRegion.end,
    //             data: newRegion.data,
    //             file_id: this.props.file.id,
    //             region_id: newRegion.id
    //         }
    //     })

        
        //send newRegion to saga to save in database
        // region.created = ()=>{
        //     console.log('new region crreated')
            
        // }
        // this.wavesurfer.regions.list.map(region=>{
        //     if(region.id != this.state.newRegion.region_id)
        // })
        // this.props.dispatch({ type: "SEND_REGIONS", payload: { region: this.state.newRegion, project_id: this.props.reduxState.currentProject.project_id } })
        
        

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

    checkNameIsClicked = () => {
        console.log('in checkNameIsClicked')
        if (this.state.trackNameIsClicked) {
            return (
                <form className="form" onSubmit={this.handleNameSubmit} >
                    <input onChange={this.handleNameInput} placeholder={this.props.file.track_name} ></input>
                </form>
            )
        }
        else {
            return (
                this.props.file.track_name
            )
        }
    }
    //function re-renders track header as input field on click for track title update
    editTrackName = () => {
        console.log('in editTrackName', this.state.trackNameIsClicked);
        // this.setState({
        //     ...this.state,
        //     trackName:
        //         <form className="form" onSubmit={this.handleNameSubmit} >
        //             <input onChange={this.handleNameInput} placeholder={this.props.file.track_name} ></input>
        //         </form>
        // })
        this.setState({
            ...this.state,
            trackNameIsClicked: true
        })

        // if (this.state.trackNameIsClicked){
        //     return(
        //         <form className="form" onSubmit={this.handleNameSubmit} >
        //             <input onChange={this.handleNameInput} placeholder={this.props.file.track_name} ></input>
        //         </form>
        //     )
        // }
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
        // this.setState({
        //     ...this.state,
        //     trackName: this.state.trackNameInput
        // })
        this.setState({
            ...this.state,
            trackNameIsClicked: false
        })
        this.props.dispatch({
            type: 'UPDATE_FILE',
            payload: {
                trackName: this.state.trackNameInput,
                track_id: this.props.file.id,
                project_id: this.props.reduxState.currentProject.project_id
            }
        })
    }

    //function sends data to saga for file delete request
    handleDelete = () => {
        console.log('in handleDelete', this.props.file.id)
        this.props.dispatch({
            type: 'DELETE_FILE', payload: {
                track_id: this.props.file.id,
                project_id: this.props.reduxState.currentProject.project_id
            }
        })
        this.setState({
            trackName: this.props.file.track_name
        })
    }


    //file play functions

    handleLoading = () =>{
        console.log('loading waveform')
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
        this.$el = ReactDOM.findDOMNode(this)
        this.$waveform = this.$el.querySelector('.wave')
        this.wavesurfer = WaveSurfer.create({
            container: this.$waveform,
            waveColor: 'violet',
            progressColor: 'purple',
            backend: 'MediaElement',
            preload:true,
            minPxPerSec: 3,
            pixelRatio:1,
            plugins: [
                RegionsPlugin.create({}),
                MicrophonePlugin.create({}),
                TimelinePlugin.create({
                    container: '.wave-timeline'
                }),
            
            ]
        })
        // this.$waveform2 = this.$el.querySelector('.wave2')
        // this.wavesurfer2 = WaveSurfer.create({
        //     container: this.$waveform2,
        //     waveColor: 'violet',
        //     progressColor: 'purple',
        //     backend: 'MediaElement',
        //     plugins: [MicrophonePlugin.create({})]
        // })
        // this.wavesurfer.load('https://sound-dash.s3.us-east-2.amazonaws.com/dunn.mp3', null,'auto');
        this.wavesurfer.load(this.props.file.path, null,'auto');
        // this.wavesurfer.load('http://www.archive.org/download/mshortworks_001_1202_librivox/msw001_03_rashomon_akutagawa_mt_64kb.mp3')
        // this.wavesurfer .load(dogBarking);
        console.log(this.wavesurfer.regions);
        // this.wavesurfer.on('region-update-end', this.saveRegions);
        this.wavesurfer.on('loading', this.handleLoading)
        this.wavesurfer.on('ready', this.loadRegions)
        this.wavesurfer.on('region-created', this.createRegion)
        this.wavesurfer.on('region-mouseenter', this.handleHover)
        this.wavesurfer.on('region-dblclick', this.loopRegion)
        // this.wavesurfer.on('region-click', this.labelRegion)




    }

    // componentDidUpdate() {
    //     this.wavesurfer.enableDragSelection({
    //         color: this.randomColor(0.1)
    //     });
    // }

    render() {
        // this.props.dispatch({ type: 'FETCH_REGIONS', payload: { project_id: this.props.reduxState.currentProject.project_id } })
        console.log('setting regions', this.state.regionsArray);
        console.log('newFile', this.state.trackName);
        console.log('this.state.newRegion', this.state.newRegion);
        console.log('newest region:', this.state.regionsArray[this.state.regionsArray.length - 1])

        return (
            <Card>
                <CardContent>
                    <div className="wave-timeline"></div>
                    <div className="waveform">
                        <h3 onClick={this.editTrackName}>{this.checkNameIsClicked()}</h3>

                        <div onClick={this.handleClick} className='wave'>
                        </div>
                        <div className='wave2'></div>
                        <ThemeProvider theme={theme}>
                            <Button onClick={this.playAudio} aria-label="play audio" variant="contained" color="primary">Play
                        <i className="material-icons">
                                    play_circle_outline
                        </i>
                            </Button>
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                            <Button onClick={this.pauseAudio} aria-label="pause audio" variant="contained" color="primary">Pause
                        <i class="material-icons">
                                    pause_circle_filled
                        </i>
                            </Button>
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                            <Button onClick={this.stopAudio} aria-label="stop audio" variant="contained" color="primary">Stop
                        <i class="material-icons">
                                    stop
                        </i>
                            </Button>
                        </ThemeProvider>
                        <ul>
                            {/* {this.state.regionsArray.map((region,i) => {
                                return (
                                    <li key={i}>{region.data.regionTag}</li>
                                )
                            })} */}
                            {this.props.reduxState.regions.map((region, i) => {
                                if (region.file_id === this.props.file.id) {
                                    // console.log('map regions:', region);

                                    return (
                                        <li key={i}>{region.start}</li>
                                    )
                                }

                            })}
                        </ul>
                        <ThemeProvider theme={theme}>
                            <Button onClick={this.handleDelete} aria-label="delete track" variant="contained" color="primary">Delete
                        <i class="material-icons">
                                    delete
                        </i>
                            </Button>
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

export default connect(mapStateToProps)(Waveform);

