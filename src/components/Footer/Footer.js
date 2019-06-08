import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { CardContent, Card, Paper } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
  footer: {
    textAlign: 'center',
    // padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  paper: {
    height: '100%',
    padding: '10px'
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    
    
        <footer className={classes.footer}>
          <Paper className={classes.paper}>
            <Container maxWidth="sm">
              <CssBaseline />
              <Typography variant="body1">&copy; MeyerHMeyer</Typography>
            </Container>
          </Paper>
          

        </footer>
      
      
      
    
    

  );
}
