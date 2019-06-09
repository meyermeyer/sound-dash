import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles(theme => ({
    footer: {
        padding: theme.spacing(2),
        marginTop: 'auto',
        backgroundColor: 'white',
    },
}));

export default function StickyFooter() {
    const classes = useStyles();

    return (
        
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <CssBaseline/>
                <Typography variant="body1">&copy; MeyerHMeyer</Typography>
                </Container>
            </footer>
        
    );
}
