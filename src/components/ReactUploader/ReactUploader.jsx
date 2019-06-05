import React, { Component } from 'react';
import axios from 'axios';

class ReactUploader extends Component {
    constructor() {
        super();
        this.state = {
            file: null
        };
    }

    submitFile = (event) => {
        console.log('in submitFile event:', event)
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file[0]);
        axios.post(`/test-upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log('submitFile', response)
        }).catch(error => {
            console.log('submitFile error', error)
            // handle your error
        });
    }

    handleFileUpload = (event) => {
        console.log('handleFileUpload event:', event)
        this.setState({ file: event.target.files });
    }

    render() {
        return (
            <form>
                <input label='upload file' type='file' onChange={this.handleFileUpload} />
                <button onClick={this.submitFile} type='submit'>Send</button>
            </form>
        );
    }
}

export default ReactUploader;