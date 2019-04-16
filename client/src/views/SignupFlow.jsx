import React, { Component } from 'react';
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
            skier: false,
            snowboarder: false,
            complicated: true,
            homeMountain: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    render() {
        console.log('rendering signupFlow @ stage', this.state.stage);
        return (
            <div className="signup">
                <Route exact path="/signup" render={() => <SignUpInitialForm {...this.props} /> } />
                <Route path="/signup/profile" render={() => <SignUpProfileForm {...this.props} /> } />
            </div>
        )
    }
}