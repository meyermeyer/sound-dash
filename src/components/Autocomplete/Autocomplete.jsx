import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

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
    console.log('inputProps',inputProps)

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
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getSuggestions(value,store,{ showEmpty = false } = {}) {
    console.log('getSuggestions', store.allUsers)
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0 && !showEmpty
        ? []
        : store.allUsers.filter(suggestion => {
            const keep =
                count < 5 && suggestion.username.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}


function DownshiftMultiple(props) {
    
    // const clearState = () => {
    //     setCollaborators([])
    // }
    //retrieve user inputs from DownshiftMultiple
    const captureInput = (newItemIds, newSelectedItem) => {
        // event.preventDefault();
        console.log('in captureInput', newItemIds)
        setCollaborators(newItemIds)
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('in handleSubmit', collaborators, props)
        const id = props.project_id
        collaborators.map(collaborator => {
            props.dispatch({
                type: 'ADD_COLLABORATORS',
                payload: {
                    collaborators: collaborator,
                    project_id: id
                }
            })
        })
        // clearState()
        setItemIds([])
        setSelectedItem([])
    }
    console.log('in DownShiftMultiple', props)
    const { classes } = props;
    const [inputValue, setInputValue] = React.useState('');
    const [selectedItem, setSelectedItem] = React.useState([]);
    const [collaborators, setCollaborators] = React.useState([]);
    const [itemIds, setItemIds] = React.useState([]);

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

       let newItemIds=[]
        if(newItemIds.indexOf(item.id)===-1){
            // newItemIds.push(item.id)
            newItemIds=[...itemIds, item.id]
        }
        console.log('newItemIds', newItemIds)
        setInputValue('');
        setSelectedItem(newSelectedItem);
        setItemIds(newItemIds);
        //send IDS of selected users to class component to send to SAGA 
        captureInput(newItemIds, newSelectedItem)
    }

    const handleDelete = item => () => {
        
        const newSelectedItem = [...selectedItem];
        const newItemIds = [...itemIds];
        console.log('in handleDelete', item, newSelectedItem, selectedItem, newSelectedItem.indexOf(item))
        newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
        newItemIds.splice(selectedItem.indexOf(item), 1);
        console.log('delete', item, newItemIds, selectedItem.indexOf(item))
        setSelectedItem(newSelectedItem);
        
        
        // newItemIds.splice(0,1)
        
    };

    return (
        <form onSubmit={handleSubmit}>
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
                                        color="primary"
                                        key={item}
                                        tabIndex={-1}
                                        label={item}
                                        className={classes.chip}
                                        onDelete={handleDelete(item)}
                                    />
                                )),
                                onChange: handleInputChange,
                                onKeyDown: handleKeyDown,
                                placeholder: `Search by Username`
                            }),
                                label: 'Add Collaborators',
                            })}
                            
                        {isOpen ? (
                            <Paper className={classes.paper} square>
                                {getSuggestions(inputValue2, props.store).map((suggestion, index) =>
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
            <div className={props.classes.divider} />
            <Button variant='contained' color='secondary' onClick={handleSubmit} type="submit">Add Collaborators</Button>
        </form>
    );
}

DownshiftMultiple.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        // height: 250,
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
    
    

    componentDidMount = () => {

        //get all users from database for autocomplete options
        this.props.dispatch({ type: 'FETCH_ALL_USERS'})
    }
    
    render(){
        // console.log('collaborators:', this.state.collaborators)
        return(
            <div className={this.props.classes.root}>
                <div className={this.props.classes.divider} />
                    {/* // <form onSubmit={this.handleSubmit}> */}
                        <DownshiftMultiple store={this.props.reduxState} project_id={this.props.match.params} classes={this.props.classes} dispatch={this.props.dispatch}/>
                    {/* //     <div className={this.props.classes.divider} />
                    //     <Button onClick={this.handleSubmit} type="submit">Add Collaborators</Button> 
                    // </form> */}
                   
                
                
            </div>
        )
            
            
        
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(IntegrationDownshift)));