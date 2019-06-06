import { ReactMic } from 'react-mic';
import React from 'react';


class Example extends React.Component {

    state = {
        record: false,
        recording_data: []
    }



    startRecording = () => {
        this.setState({
            ...this.state,
            record: true
        });
    }

    stopRecording = () => {
        this.setState({
            record: false
        });

    }


    onData(recordedBlob) {
        console.log('chunk of real-time data is: ', recordedBlob);
    }

    onStop = (recordedBlob) => {
        console.log('recordedBlob is: ', recordedBlob);
        console.log(recordedBlob.blob);
        let myReader = new FileReader();
        myReader.readAsText(recordedBlob.blob);
        this.setState({
            ...this.state,
            recording_data: recordedBlob.Blob

        })
        console.log(FileReader.result);



    }

    render() {
        console.log(this.state.recording_data);

        return (
            <div>
                <ReactMic
                    record={this.state.record}
                    className="sound-wave"
                    onStop={this.onStop}
                    onData={this.onData}
                    strokeColor="#000000"
                    backgroundColor="#FF4081" />
                <button onClick={this.startRecording} type="button">Start</button>
                <button onClick={this.stopRecording} type="button">Stop</button>
            </div>
        );
    }
}

export default Example;