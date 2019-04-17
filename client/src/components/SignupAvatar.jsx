import React from 'react';
import Person from '@material-ui/icons/Person';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: 100,
        height: 100
    }
})

const SignUpAvatar = (props) => {
    const { src, classes } = props
    if (!src) {
        return <Person className={classes.root} />
    } else {
        return <img src={src} alt="user avatar"/>
    }
}

export default withStyles(styles)(SignUpAvatar);