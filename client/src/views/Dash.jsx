import React from 'react';
import ReAuthorize from '../components/ReAuthorize';
import Button from '@material-ui/core/Button';

const Dash = (props) => {
    let content;
    if (props.user) {
        content = (
            <div className="dash">
                <h1>Dashboard</h1>
                <Button onClick={props.logout} variant="contained" color="primary" />
            </div>
        )
    } else {
        content = <ReAuthorize />
    }
    return content
}

export default Dash;