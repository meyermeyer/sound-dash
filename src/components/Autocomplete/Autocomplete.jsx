import React, {Component} from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';

import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput,
                },
                ...InputProps,
            }}
            {...other}
        />
    );
}

function renderSuggestion(suggestionProps) {
    const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.username) > -1;
    
    return (
        <MenuItem
            {...itemProps}
            key={suggestion.id}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            {suggestion.username}
        </MenuItem>
    );
}
renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    selectedItemId: PropTypes.array,
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getSuggestions(value,props,{ showEmpty = false } = {}) {
    console.log('getSuggestions', props.props.allUsers)
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0 && !showEmpty
        ? []
        : props.props.allUsers.filter(suggestion => {
            const keep =
                count < 5 && suggestion.username.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

let newItemIds = [];
function DownshiftMultiple(props) {
    console.log('in DownShiftMultiple', props)
    const { classes } = props;
    const [inputValue, setInputValue] = React.useState('');
    const [selectedItem, setSelectedItem, selectedItemId] = React.useState([]);

    function handleKeyDown(event) {
        if (selectedItem.length && !inputValue.length && event.key === 'Backspace') {
            setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
        }
    }

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }
    
    function handleChange(item) {
        let newSelectedItem = [...selectedItem];
        if (newSelectedItem.indexOf(item.username) === -1) {
            newSelectedItem = [...newSelectedItem, item.username];
        }

       
        if(newItemIds.indexOf(item.id)===-1){
            newItemIds.push(item.id)
        }
        console.log('newItemIds', newItemIds)
        setInputValue('');
        setSelectedItem(newSelectedItem);
        //send IDS of selected users to class component to send to SAGA 
        props.captureInput(newItemIds)
    }

    const handleDelete = item => () => {
        const newSelectedItem = [...selectedItem];
        newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
        setSelectedItem(newSelectedItem);
    };

    return (
        <Downshift
            id="downshift-multiple"
            inputValue={inputValue}
            onChange={handleChange}
            selectedItem={selectedItem}
            
        >
            {({
                getInputProps,
                getItemProps,
                isOpen,
                inputValue: inputValue2,
                selectedItem: selectedItem2,
                highlightedIndex,
            }) => (
                    <div className={classes.container}>
                        {renderInput({
                            fullWidth: true,
                            classes,
                            InputProps: getInputProps({
                                startAdornment: selectedItem.map(item => (
                                    <Chip
                                        key={item}
                                        tabIndex={-1}
                                        label={item}
                                        className={classes.chip}
                                        onDelete={handleDelete(item)}
                                    />
                                )),
                                onChange: handleInputChange,
                                onKeyDown: handleKeyDown,
                                placeholder: 'Add Collaborators',
                            }),
                            label: 'Username',
                        })}

                        {isOpen ? (
                            <Paper className={classes.paper} square>
                                {getSuggestions(inputValue2, props).map((suggestion, index) =>
                                    renderSuggestion({
                                        suggestion,
                                        index,
                                        itemProps: getItemProps({ item: { username: suggestion.username, id: suggestion.id}}),
                                        highlightedIndex,
                                        selectedItem: selectedItem2,
                                    }),
                                )}
                            </Paper>
                        ) : null}
                    </div>
                )}
        </Downshift>
    );
}

DownshiftMultiple.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    chip: {
        margin: theme.spacing(0.5, 0.25),
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1,
    },
    divider: {
        height: theme.spacing(2),
    },
});


class IntegrationDownshift extends Component {
    state = {
        collaborators: []
    }

    //retrieve user inputs from DownshiftMultiple
    captureInput = (value) => {
        // event.preventDefault();
        console.log('in captureInput', value)
        this.setState({
            collaborators:value
        })
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        console.log('in handleSubmit', this.state.collaborators)
        this.props.dispatch({ type: 'ADD_COLLABORATORS', 
                            payload: {
                                collaborators: this.state.collaborators,
                                project_id: this.props.reduxState.currentProject.project_id}
                            })
    }

    componentDidMount = () => {

        //get all users from database for autocomplete options
        this.props.dispatch({ type: 'FETCH_ALL_USERS'})
    }
    
    render(){
        console.log('collaborators:', this.state.collaborators)
        return(
            <div className={this.props.classes.root}>
                <div className={this.props.classes.divider} />
                    <form onSubmit={this.handleSubmit}>
                        <DownshiftMultiple props={this.props.reduxState} captureInput={this.captureInput} classes={this.props.classes} />
                        <div className={this.props.classes.divider} />
                        <Button onClick={this.handleSubmit} type="submit">Add Collaborators</Button>
                    </form>
                   
                
                
            </div>
        )
            
            
        
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(IntegrationDownshift));