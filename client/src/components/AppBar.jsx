import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom'


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
    const { classes } = props;
    let buttons;
    if (props.user) {
        buttons = (
            <>
              <Button variant="contained" className={classes.menuButton} component={Link} to={'/dash'}  color="primary">Dashboard</Button>
              <Button variant="contained" className={classes.menuButton} component={Link} to={'/browse/mtn'}  color="primary">Browse mountains</Button>
              <Button variant="contained" className={classes.menuButton} component={Link} to={'/browse/rides'}  color="primary">Browse rides</Button>
              <Button variant="contained" className={classes.menuButton} component={Link} to={'/ride/new'}  color="primary">Get a ride</Button>
              <Button variant="contained" className={classes.menuButton} onClick={props.logout} color="primary" >Logout</Button>
            </>
        )
    } else {
        buttons = (
            <>
            <Button component={Link} to="/login" variant="contained" color="primary">Login</Button>
            <Button component={Link} to="/signup" variant="contained" color="primary">Signup</Button>
            </>
        )
    }


  return (
    <div className={classes.root}>
        <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
                RideShare
            </Typography>
            {buttons}
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);