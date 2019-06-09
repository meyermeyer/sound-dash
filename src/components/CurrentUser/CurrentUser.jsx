import React, { Component } from 'react';
import { connect } from 'react-redux';



//materialUI
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { createMuiTheme, withStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';



const theme = createMuiTheme({
    palette: {
        primary: { main: '#9c27b0' },
        secondary: { main: '#ffcc80' }
    }
})


class CurrentUser extends Component {
    handleClick = () => {
        console.log('you clicked it')
    }


    render(){
        if (this.props.reduxState.user.username){
            return (
                <ThemeProvider theme={theme}>
                    <div className="CurrentUserChip">
                        <Chip
                            avatar={<Avatar>{this.props.reduxState.user.username.charAt(0).toUpperCase()}</Avatar>}
                            label={this.props.reduxState.user.username}
                            onClick={this.handleClick}
                            color='primary'
                        />
                    </div>
                </ThemeProvider>
            )
        }
        else {
            return null
        }
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(CurrentUser)