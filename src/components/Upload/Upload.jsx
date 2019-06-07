import React, { Component } from 'react';
import {connect} from 'react-redux'
import './Upload.css'
import LoadSpinner from '../LoadSpinner/LoadSpinner'
import {withRouter} from 'react-router'


class Upload extends Component {
    state = {
        selectedFile: null
    }

    onChangeHandler = (event) => {
        console.log(event.target.files[0])
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        })
    }

    handleUpload = () =>{
        // console.log('in handleUpload', this.state.selectedFile)
        let trackNumber = this.props.reduxState.files.length + 1
        let name = 'Track ' + trackNumber
        // data.append('file', this.state.selectedFile)
        this.props.dispatch({ type: 'SAVE_FILE', payload: {
                                                    file:this.state.selectedFile,
                                                    project_id: this.props.match.params.id,
                                                    track_name: name}})
    }

    render(){
        console.log('in handleUpload', this.state.selectedFile)
        return(
            
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <form >
                            <div className="form-group files">
                                <label>Upload Your File</label>
                                    <input type="file" name="file" onChange={this.onChangeHandler} />
                                {/* <button type="button" className="btn btn-success btn-block" onClick={this.handleUpload}>Upload</button> */}
                            </div>
                        </form>
                        
                    </div>
                </div>
                <LoadSpinner handleUpload={this.handleUpload}/>
            </div>
        )
    }
};
const mapStateToProps = reduxState => ({
    reduxState
});
export default withRouter(connect(mapStateToProps)(Upload))