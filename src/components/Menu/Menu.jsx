import React from 'react';

import CurrentUser from '../CurrentUser/CurrentUser'

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function SimpleMenu() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);

    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <div>
            <IconButton aria-haspopup="true" onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
                <CurrentUser />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>My Projects</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    );
}