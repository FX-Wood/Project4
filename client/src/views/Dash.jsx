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
        this.getProfile = this.getProfile.bind(this)
    }
    componentDidMount() {
        console.log('dash did mount')
        this.getProfile()
    }
    getProfile() {
        if (this.props.user) {
            console.log(axios.defaults.headers)
            axios.get('/user').then(res => {
                console.log('GET /user', res.data)
                this.setState(res.data)
            }).catch(err => {
                console.log(err)
                this.props.enqueueSnackbar(JSON.stringify(err), {variant: 'error'})
            })
        }
    }
    render() {
        let content;
        if (this.props.user) {
            const { first, last, snowboarder, skier, profilePicture } = this.props.user.profile
            console.log(profilePicture)
                content = (
                    <div className="dash">
                        <h1>Dashboard</h1>
                        <img src={ new File([profilePicture.buffer], 'profilePicture', {type: profilePicture.mimetype}) } alt="user avatar"/>
                        <Button onClick={this.props.logout} variant="contained" color="primary" >Logout</Button>
                    </div>
                )
        } else {
            content = <ReAuthorize login={this.props.login} />
        }
        return content
    }
}

export default withSnackbar(Dash);