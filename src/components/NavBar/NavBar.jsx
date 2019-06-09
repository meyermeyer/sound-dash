import React from 'react';
import CurrentUser from '../CurrentUser/CurrentUser'
import Menu from '../Menu/Menu'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddCollaborators from '../AddCollaborators/AddCollaborators';


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

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <Button color="inherit"><CurrentUser /></Button> */}
          <Menu />
          <Typography variant="h6" className={classes.title}>
            SoundDash
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}