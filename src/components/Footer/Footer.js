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
    // marginTop: 'auto',
    backgroundColor: theme.palette.common.white,
    // position: 'absolute',
    // bottom: 0,
    width: '100%',
    position: 'relative',
    marginTop: '-50px',
/* negative value of footer height */
    height: '50px',
    clear: 'both',
  },
  paper: {
    height: '100%',
    padding: '10px',
    backgroundColor: '#3f51b5',
    color: '#FFFFFF',
    borderRadius: 0,
    boxShadow: '0px 2px 4px - 1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
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
