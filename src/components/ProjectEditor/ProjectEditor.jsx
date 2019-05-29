import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TrackList from '../TrackList/TrackList'
import TextFields from '../TextFields/TextFields'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// const useStyles = makeStyles(theme => ({
//     container: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     textField: {
//         marginLeft: theme.spacing(1),
//         marginRight: theme.spacing(1),
//     },
//     dense: {
//         marginTop: theme.spacing(2),
//     },
//     menu: {
//         width: 200,
//     },
// }));

// const classes = useStyles();
// const [values, setValues] = React.useState({
//     name: 'Cat in the Hat',
//     age: '',
//     multiline: 'Controlled',
//     currency: 'EUR',
// });

class ProjectEditor extends Component {
   handleChange = (event) => {
       console.log('in handleChange', event.target.value)
   }
    render() {
        return (
            <div>
                <h3>Add New Files</h3>
                    <TextField
                        id="outlined-dense"
                        label="Audio URL"
                        margin="dense"
                        variant="outlined"
                        onChange={this.handleChange}
                    />
            
                {/* <input aria-label="web url" type="text" placeholder="web url"></input> */}
                <ul>
                    <TrackList />
                </ul>
                <input aria-label="lyrics" type="text" placeholder="lyrics"></input>
                <input aria-label="notes" type="text" placeholder="notes"></input>
            </div>
        )
    }
}

export default connect()(ProjectEditor)