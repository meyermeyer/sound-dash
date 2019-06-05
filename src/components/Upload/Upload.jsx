import React, { Component } from 'react';
import {connect} from 'react-redux'
import './Upload.css'
import axios from 'axios';

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
        console.log('in handleUpload', this.state.selectedFile)
        const formData = {
            file: this.state.selectedFile
        }
        // data.append('file', this.state.selectedFile)
        this.props.dispatch({ type: 'SAVE_FILE', payload: formData})
    }

    render(){
        console.log('in handleUpload', this.state.selectedFile)
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <form method="post" action="#" id="#">
                            <div className="form-group files">
                                <label>Upload Your File</label>
                                <input type="file" name="file" onChange={this.onChangeHandler}/>
                                <button type="button" className="btn btn-success btn-block" onClick={this.handleUpload}>Upload</button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
            // <div>
            //     <label>Upload Your File</label>
            //     <input type="file"/>
            //     <button type="button">Upload</button>
            // </div>
        )
    }
};

export default connect()(Upload)