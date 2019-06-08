import React, {Component} from 'react';
import {connect} from 'react-redux'

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
          <MenuItem onClick={this.handleClose}>My Projects</MenuItem>
          <MenuItem onClick={this.handleClose}
            onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>
            Logout
                </MenuItem>
        </Menu>
      </div>
    )
  }
}

export default withStyles(styles)(connect()(UserMenu))

// export default function SimpleMenu(dispatch) {
//     const classes = useStyles();
//     const [anchorEl, setAnchorEl] = React.useState(null);
    

//     function handleClick(event) {
//         setAnchorEl(event.currentTarget);

//     }

//     function handleClose() {
//         setAnchorEl(null);
//     }

//     return (
//         <div>
//             <IconButton aria-haspopup="true" onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
//                 <MenuIcon />
//                 <CurrentUser />
//             </IconButton>
//             <Menu
//                 id="simple-menu"
//                 anchorEl={anchorEl}
//                 keepMounted
//                 open={Boolean(anchorEl)}
//                 onClose={handleClose}
//             >
//                 <MenuItem onClick={handleClose}>My Projects</MenuItem>
//                 <MenuItem onClick={handleClose} 
//                           onClick={() => dispatch({ type: 'LOGOUT' })}>
//                   Logout
//                 </MenuItem>
//             </Menu>
//         </div>
//     );
// }