import axios from 'axios'
import React, { Component } from 'react';
import ReAuthorize from '../components/ReAuthorize';
import { withSnackbar } from 'notistack';

// material ui
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
                    <Grid container direction='column' justify="center" alignItems="center" spacing={24} style={{minHeight: '100vh'}}>
                        <Grid item>
                            <Typography variant="h3">Dashboard</Typography>
                        </Grid>
                        <Grid item>
                            <img src={ URL.createObjectURL(new File([profilePicture.buffer], 'profilePicture', {type: profilePicture.mimetype}))} alt="user avatar"/>
                        </Grid>
                        <Grid item>
                            <Button onClick={this.props.logout} variant="contained" color="primary" >Logout</Button>
                        </Grid>
                    </Grid>
                )
        } else {
            content = <ReAuthorize login={this.props.login} />
        }
        return content
    }
}

export default withSnackbar(Dash);