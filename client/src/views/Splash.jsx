import React from 'react';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';

const Splash = ({ user }) => {
    if (user) {
        return <Redirect to={'/dash'} />
    } else {
        return (
            <>
                <Button component={Link} to="/login" variant="contained" color="primary">Login</Button>
                <Button component={Link} to="/signup" variant="contained" color="primary">Signup</Button>
            </>
        )
    }

}

export default Splash;