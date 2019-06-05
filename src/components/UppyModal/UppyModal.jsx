import React, { Component } from "react";
import axios from 'axios'

import { DragDrop, XHRUpload, Dashboard, DashboardModal } from '@uppy/react';
import '@uppy/core/dist/style.css'
import '@uppy/drag-drop/dist/style.css'
import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import '@uppy/dashboard/dist/style.css'
import { Transloadit } from 'uppy'


class UppyModal extends Component {
    state = {
        modalOpen: false,
        uploads: []
    };
    handleClick = () => {
        let upload = {}
        console.log('in handleClick')
        axios.post('/test-upload',)
    }
    handleUploadModalOpen = () => 
        this.setState({ 
            ...this.state, 
            modalOpen: true 
        });

    handleUploadModalClose = () => 
        this.setState({ 
            ...this.state, 
            modalOpen: false 
        });

    handleUploadCompleted = (result) => 
        this.setState({ 
            ...this.state, 
            uploads: this.state.uploads.push(...result.successful) 
        })

    componentWillUnmount() {
        this.uppy.close();
    }

    render() {
        // const { handleUploadCompleted } = this.props;

        this.uppy = Uppy({
            meta: { type: "avatar" },
            autoProceed: true
        });

        // this.uppy.use(Tus, { endpoint: "https://master.tus.io/files/" });

        this.uppy.on("complete", result => {
            console.log("Completed upload, result:", result);
            console.log('handleComplete state:', this.state)
            const id = result.successful[0].id;
            const url = result.successful[0].uploadURL;
            console.log('id:', id, 'url:', url);

            this.handleUploadCompleted(result);
            console.log('this.state.uploads', this.state.uploads)
            
        });

        this.uppy.run();

        // const Dashboard = () => {
        //   return (
        //     <DashboardModal
        //       uppy={this.uppy}
        //       closeModalOnClickOutside
        //       open={this.state.modalOpen}
        //       onRequestClose={this.handleUploadModalClose}
        //     />
        //   );
        // };

        return (
            <div>
                {/*<Dashboard/>*/}
                <DashboardModal
                    uppy={this.uppy}
                    closeModalOnClickOutside
                    open={this.state.modalOpen}
                    onRequestClose={this.handleUploadModalClose}
                />
                <button onClick={this.handleUploadModalOpen}>add new files</button>
                <button onClick={this.handleClick}>AWS tester</button>
            </div>
        );
    }
}

export default UppyModal;
