import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import WaveSurfer from 'wavesurfer.js'
import dogBarking from '../../audio/Big_Dog_Barking.mp3'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js'
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js'
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import './Waveform.css'

import Loading from '../Loading/Loading'
//MUI stuff
import Fab from '@material-ui/core/Fab';
import { Button, icons, CardContent, Card } from '@material-ui/core'
import { createMuiTheme, withStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';
import SvgIcon from '@material-ui/core/SvgIcon'


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
        height: 'auto'
    },
    title: {
        margin: 0
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
    input: {

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
        for (let region of this.props.reduxState.regions) {
            // console.log('map regions:', region);

            if (region.file_id === this.props.file.id) {
                // console.log('map regions:', region);
                region.color = this.randomColor(0.1);
                this.wavesurfer.addRegion(region)
                // console.log('loading regions',this.wavesurfer.regions.list)
            }
        }
    }

    allowAnnotation = () => {
        console.log('in allowAnnotation');
        this.wavesurfer.enableDragSelection({
            color: this.randomColor(.1)
        });
    }

    labeRegion = () => {
        console.log('in labelRegion')
        // // sweet alert for labeling region
        // Swal.fire({
        //     title: 'New Region',
        //     text: 'Region',
        //     html: `<input id="regionTagInput" class="swal2-input" type="text" placeholder="Region Tag">` +
        //         '<input id="regionNotesInput" class="swal2-input" type="textarea" placeholder="Region Notes">',
        //     confirmButtonText: 'Create',
        //     showCancelButton: true,
        //     allowEnterKey: true,
        //     //capture input text
        //     preConfirm: () => {

        //         let regionTag = document.getElementById('regionTagInput').value;
        //         let regionNotes = document.getElementById('regionNotesInput').value;
        //         console.log('SWAL', regionTag, regionNotes);

        //         // update 'region' created by clicking to include user's data
        //         region.update({
        //             data: {
        //                 regionTag,
        //                 regionNotes
        //             }
        //         })

        //     }
        // })
    }
    handleHover = (region) => {
        console.log('hovering over', region.start, region.end);
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
        this.props.dispatch({ type: "SEND_REGIONS", payload: { region: newRegion, project_id: this.props.match.params } })
    }

    
    createRegion = (region) => {
        // console.log('region start', Object.keys(region),Object.values(region),region.start)
        console.log('created region');
        // console.log('color', region.color)
        
        // this.wavesurfer.on('region-update-end',console.log('update end'), ()=>this.addNewRegion())
        // region.on('update', console.log('updating', region))
        
    }
    saveRegions = (region) => {
        //sweet alert for labeling region
        // Swal.fire({
        //     title: 'New Region',
        //     text: 'Region',
        //     html: `<input id="regionTagInput" class="swal2-input" type="text" placeholder="Region Tag">` +
        //         '<input id="regionNotesInput" class="swal2-input" type="textarea" placeholder="Region Notes">',
        //     confirmButtonText: 'Create',
        //     showCancelButton: true,
        //     allowEnterKey: true,
        //     //capture input text
        //     preConfirm: () => {

        //         let regionTag = document.getElementById('regionTagInput').value;
        //         let regionNotes = document.getElementById('regionNotesInput').value;
        //         console.log('SWAL', regionTag, regionNotes);

        //         // update 'region' created by clicking to include user's data
        //         region.update({
        //             data: {
        //                 regionTag,
        //                 regionNotes
        //             }
        //         })

        //     }
        // })
        console.log('updated region', region);

        // console.log('this.wavesurfer.regions',this.wavesurfer.regions);

        //add regions.list objects to array
        let regionsArray = []
        // for (let i in this.wavesurfer.regions.list) {
        //     regionsArray.push(this.wavesurfer.regions.list[i])
        // }
        
        // console.log('in saveRegions', this.wavesurfer.regions.list);
        // console.log('regionsArray', regionsArray);

        this.wavesurfer.regions.list && this.setState({
            ...this.state,
            regionsArray: regionsArray
        })

        let newRegion = this.state.regionsArray[this.state.regionsArray.length - 1]
        this.setState({
            ...this.state,
            newRegion: {
                start: newRegion.start,
                end: newRegion.end,
                data: newRegion.data,
                file_id: this.props.file.id,
                region_id: newRegion.id
            }
        })

        
        // send newRegion to saga to save in database
        region.created = ()=>{
            console.log('new region crreated')
            
        }
        // this.wavesurfer.regions.list.map(region=>{
        //     if(region.id != this.state.newRegion.region_id)
        // })

        this.props.dispatch({ type: "SEND_REGIONS", payload: { region: this.state.newRegion, project_id: this.props.reduxState.currentProject.project_id } })
        
        

    }

    handleUnmount = () =>{
        // console.log('this.wavesurfer.list.length',this.wavesurfer.list.length)
        //spread regions object into new array, send to saga
        if(this.wavesurfer.regions.list!={}){
            console.log('in handleUnmount. wavesurfer.regions.list', this.wavesurfer.regions.list)
            let regionsArray = []
            for (let i in this.wavesurfer.regions.list) {
                regionsArray.push(this.wavesurfer.regions.list[i])
            }

            console.log('in handleUnmount', this.wavesurfer.regions.list);
            console.log('regionsArray', regionsArray);

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

        //send lyrics and notes to saga
            
            // let newRegion = {}
            // let updateRegion = {}
            // regionsArray.map(currentRegion=>{
            //     if(!this.props.reduxState.regions){
            //         console.log('no stored regions yet', currentRegion)
            //         newRegion = {
            //             id: currentRegion.id,
            //             start: currentRegion.start,
            //             end: currentRegion.end,
            //             data: currentRegion.data,
            //             file_id: this.props.file.id

            //         }

            //         // this.props.dispatch({ type: 'SEND_REGIONS', payload: { region: newRegion, project_id: this.props.match.params } })
            //     }
            //     else{
            //         this.props.reduxState.regions.map((loadedRegion, i) => {
            //             console.log('reduxState regions', loadedRegion, 'current region', currentRegion, i)

            //             // console.log('each currentRegion', currentRegion)
            //             if (loadedRegion.id == currentRegion.id) {
            //                 console.log('region already in database')
            //                 updateRegion = {
            //                     id: currentRegion.id,
            //                     start: currentRegion.start,
            //                     end: currentRegion.end,
            //                     data: currentRegion.data,
            //                     file_id: this.props.file.id
            //                 }
            //                 this.props.dispatch({ type: 'UPDATE_REGIONS', payload: { region: updateRegion, project_id: this.props.match.params } })
            //                 return 
            //             }
                        
            //         })
                    
            //             console.log('region is not in the database', currentRegion.id)
            //             newRegion = {
            //                 id: currentRegion.id,
            //                 start: currentRegion.start,
            //                 end: currentRegion.end,
            //                 data: currentRegion.data,
            //                 file_id: this.props.file.id

            //             }
            //             this.props.dispatch({ type: 'SEND_REGIONS', payload: { region: newRegion, project_id: this.props.match.params } })
                    
            //     }
            // }) 
                
            

            
        }
        

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
    componentWillUnmount(){
        console.log('unmounting')
        this.handleUnmount()
    }

    componentDidMount() {
        // console.log('this.wavesurfer.regions.list', this.wavesurfer.regions.list)
        this.props.dispatch({ type: 'FETCH_REGIONS', payload: this.props.match.params.id})
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
                // MicrophonePlugin.create({}),
                // TimelinePlugin.create({
                //     container: '.wave-timeline'
                // }),
            
            ]
        })
        // this.wavesurfer.on('region-click', this.handleLable)
        this.wavesurfer.load(this.props.file.path, null,'auto');
        // this.wavesurfer.load('http://www.archive.org/download/mshortworks_001_1202_librivox/msw001_03_rashomon_akutagawa_mt_64kb.mp3')
        // this.wavesurfer .load(dogBarking);
        // console.log(this.wavesurfer.regions);
        // this.wavesurfer.on('region-update-end', this.labelRegion);
        // this.wavesurfer.on('loading', this.handleLoading)
        this.wavesurfer.on('ready', this.loadRegions)
        // this.wavesurfer.on('region-created', this.createRegion)
        // this.wavesurfer.on('region-mouseenter', this.handleHover)
        // this.wavesurfer.on('region-dblclick', this.loopRegion)
        // this.wavesurfer.on('region-click', this.labelRegion)
        // this.wavesurfer.on('region-click', this.handleLable)




    }

    // componentDidUpdate() {
    //     this.wavesurfer.enableDragSelection({
    //         color: this.randomColor(0.1)
    //     });
    // }

    render() {
        
        // this.props.dispatch({ type: 'FETCH_REGIONS', payload: { project_id: this.props.reduxState.currentProject.project_id } })
        // console.log('currently selected', document.activeElement)
        // console.log('setting regions', this.state.regionsArray);
        // console.log('newFile', this.state.trackName);
        // console.log('this.state.newRegion', this.state.newRegion);
        // console.log('newest region:', this.state.regionsArray[this.state.regionsArray.length - 1])

        return (
            <Card>
                <CardContent>                 
                    <div className={this.props.classes.waveform}>
                        <div className={this.props.classes.top}>
                            <h3 className={this.props.classes.title} onClick={this.editTrackName} onClickAway={this.clickAwayHandle}>
                                {this.checkNameIsClicked()}
                                <ThemeProvider theme={redTheme}>
                                    <Fab className={this.props.classes.delete} onClick={this.handleDelete} aria-label="delete track" style={{  }}>
                                        {/* Delete */}
                                        <i class="material-icons">
                                            delete
                                        </i>
                                    </Fab>
                                </ThemeProvider>
                            </h3>
                        </div>
                        
                        <Loading />
                        <div onClick={this.handleClick} className='wave'>
                            {/* <div className="wave-timeline"></div> */}
                        </div>
                        <ThemeProvider theme={theme}>
                            <Fab onClick={this.playAudio} aria-label="play audio" variant="contained" color="primary">
                                {/* Play */}
                                <i className="material-icons">
                                    play_circle_outline
                                </i>
                            </Fab>
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                            <Fab onClick={this.pauseAudio} aria-label="pause audio" variant="contained" color="primary">
                                {/* Pause */}
                                <i class="material-icons">
                                    pause_circle_filled
                                </i>
                            </Fab>
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                            <Fab onClick={this.stopAudio} aria-label="stop audio" variant="contained" color="primary">
                                {/* Stop */}
                                <i class="material-icons">
                                    stop
                                </i>
                            </Fab>
                        </ThemeProvider>
                        {/* <ul> */}
                            {/* {this.state.regionsArray.map((region,i) => {
                                return (
                                    <li key={i}>{region.data.regionTag}</li>
                                )
                            })} */}
                            {/* {this.props.reduxState.regions.map((region, i) => {
                                if (region.file_id === this.props.file.id) {
                                    // console.log('map regions:', region);

                                    return (
                                        <li key={i}>{region.id}</li>
                                    )
                                } 

                             })} */}
                        {/* </ul> */}
                        
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

