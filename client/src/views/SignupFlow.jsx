import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SignUpInitialForm from '../components/SignUpInitialForm';
import SignUpProfileForm from '../components/SignUpProfileForm';


export default class SignupFlow extends Component {
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
            complicated: true,
            homeMountain: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.submitSignup = this.submitSignup.bind(this)
    }
    handleChange(e) {
        console.log('handling change', e.target, this)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submitSignup(e) {
        console.log('signing up...')
        e.preventDefault()
        axios.post('/auth/signup', this.state)
        .then( res => {
            console.log('res.data', res.data)
            if (res.data.type === 'error') {
                console.log('error', res.data)
                this.setState({
                    message: res.data.message
                })
            } else {
                console.log('res.data', res.data)
                console.log('token', res.data.token)
                localStorage.setItem('jwtToken', res.data.token)
                this.props.liftToken(res.data)
    
            }
        }).catch(err => {
            console.log(err, err.response, err.status)
            console.log('catching error')
            let message;
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                message = `${err.response.status}: ${err.response.data.message || err}`
            } else if (err.request) {
                // The request was made but no response was received
                console.log(err.request)
                message = '404: server not found'
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', err.message);
                message = 'Error' + err.message
            }
            console.log(err)
            if (err.status === '429') message = `${err.response.status}: too many requests`
            // this.setState({ message })
            this.props.liftMessage({ message })
        });
    }
    
    render() {
        console.log('rendering signupFlow @ stage', this.state.stage);
        const initialProps = {
            first: this.state.first,
            last: this.state.last,
            email: this.state.email,
            password: this.state.password,
            handleChange: this.handleChange
        }

        const profileProps = {
            profilePicture: this.state.profilePicture,
            skier: this.state.skier,
            snowboarder: this.state.snowboarder,
            complicated: this.state.complicated,
            homeMountain: this.state.homeMountain,
            handleChange: this.handleChange,
            submitSignup: this.submitSignup
        }
        
        return (
            <div className="signup">
                <Route exact path="/signup" render={() => <SignUpInitialForm {...initialProps} /> } />
                <Route path="/signup/profile" render={() => <SignUpProfileForm {...profileProps}  /> } />
            </div>
        )
    }
}