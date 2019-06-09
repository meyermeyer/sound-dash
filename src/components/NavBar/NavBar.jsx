import React from 'react';
import CurrentUser from '../CurrentUser/CurrentUser'
import Menu from '../Menu/Menu'

import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const goldTheme = createMuiTheme({
  palette: {
    primary: { main: 'rgb(224,199,138)' },
    secondary: { main: '#272727' },
  }
})



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  bar: {
    // position: 'absolute',
    textAlign: 'center'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    position: 'relative',
    textAlign: 'center'
  },
  icon: {
    color: "#FFFFFF"
  }
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    // <ThemeProvider theme={goldTheme}>
      <div className={classes.root}>
        <AppBar position="static" color='primary' >
          <Toolbar className={classes.bar}>
            {/* <Button color="inherit"><CurrentUser /></Button> */}
            <Menu />
            <Typography variant="h6" className={classes.title}>
              SoundDash
          </Typography>
          </Toolbar>
        </AppBar>
      </div>
    // {/* </ThemeProvider> */}
    
  );
}