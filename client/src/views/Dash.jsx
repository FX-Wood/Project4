import React, { Component } from 'react';
import ReAuthorize from '../components/ReAuthorize';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { withSnackbar } from 'notistack';

class Dash extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            first: '',
            last: '',
            profilePicture: null,
            skier: false,
            snowboarder: false,
            complicated: false,
            homeMountain: ''
        }
    }
    componentDidMount() {
        console.log(axios.defaults.headers)
        axios.get('/user').then(res => {
            console.log(res.data)
            this.setState(res.data)
        }).catch(err => {
            console.log(err)
            this.props.enqueueSnackbar(err, {variant: 'error'})
        })
    }
    render() {
        const { first, last, snowboarder, skier, profilePicture } = this.state
        let content;
        if (this.props.user) {
            content = (
                <div className="dash">
                    <h1>Dashboard</h1>
                    <img src={profilePicture.buffer} alt=""/>
                    <Button onClick={this.props.logout} variant="contained" color="primary" />
                </div>
            )
        } else {
            content = <ReAuthorize />
        }
        return content
    }
}

export default withSnackbar(Dash);