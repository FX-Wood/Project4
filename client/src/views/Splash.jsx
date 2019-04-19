import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const Splash = ({ user }) => {
    if (user) {
        return <Redirect to={'/dash'} />
    } else {
        return (
            <Grid container justify="center" alignItems="center" spacing={40} style={{minHeight: '100vh'}}>
                <Grid item >
                    <Button component={Link} to="/login" variant="contained" color="primary">Login</Button>
                </Grid>
                <Grid item >
                    <Button component={Link} to="/signup" variant="contained" color="primary">Signup</Button>
                </Grid>
            </Grid>
        )
    }

}

export default Splash;