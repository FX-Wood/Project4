import React, { Component } from 'react';
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
            

        }
    }
    render() {
        console.log('rendering signupFlow @ stage', this.state.stage);
        return (
            <div className="signup">
                <Route exact path="/signup" render={() => <SignUpInitialForm {...this.props} /> } />
                <Route path="/signup/profile" render={() => <SignUpProfileForm {...this.props} /> } />
                <Button component={Link} to="/Splash" variant="contained" color="primary">Back</Button>
                <Button component={Link} variant="contained" color="primary">Back</Button>
            </div>
        )
    }
}