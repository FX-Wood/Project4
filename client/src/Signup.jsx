import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField'

export default class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first: '',
            last: '',
            email: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e) {
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
        console.log('rendering signup')
        return (
            <div className="signup">
                <h3>Create a new account: </h3>
                <form onSubmit={this.handleSubmit} >
                    <input onChange={this.handleChange} value={this.state.first} type="text" name="name" placeholder="Enter your full name"/>
                    <input onChange={this.handleChange} value={this.state.last} type="text" name="name" placeholder="Enter your full name"/>
                    <input onChange={this.handleChange} value={this.state.email} type="email" name="email" placeholder="Enter your email address"/>
                    <input onChange={this.handleChange} value={this.state.password} type="password" name="password" placeholder="Choose a password..."/>
                    <input type="submit" value="Sign Up!"/>
                </form>
            </div>
        )
    }
}