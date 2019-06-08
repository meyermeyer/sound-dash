import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import CurrentUser from '../CurrentUser/CurrentUser'

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

class UserMenu extends Component {
  state = {
    anchorEl: null
  }

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  handleClose = () => {
      this.setState({
        anchorEl: null
      });
  }

  handleSelect = () => {
    this.props.history.push('/user-dashboard')
  }

  render() {
    return(
      <div>
        <IconButton aria-haspopup="true" onClick={this.handleClick} edge="start" className={this.props.classes.menuButton} color="inherit" aria-label="Menu">
          <MenuIcon />
          <CurrentUser />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}
            onClick={this.handleSelect}>
              My Projects
          </MenuItem>
          <MenuItem onClick={this.handleClose}
            onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>
              Logout
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(connect()(UserMenu)))