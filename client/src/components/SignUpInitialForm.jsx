import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const SignUpInitialForm = ({ handleChange, first, last, email, password, history }) => {
    const done = (e) => {
        console.log('done')
        e.preventDefault()
        console.log('history', history)
        history.push('/signup/profile')
    }
    return (
        <div className="signup-initial-form">
            <h3>Create a new account: </h3>
            <form onSubmit={done} >
                <TextField  onChange={handleChange} value={first} type="text" name="first" placeholder="Enter your first name" variant="outlined"/>
                <TextField  onChange={handleChange} value={last} type="text" name="last" placeholder="Enter your last name" variant="outlined"/>
                <TextField  onChange={handleChange} value={email} type="email" name="email" placeholder="Enter your email address" variant="outlined"/>
                <TextField  onChange={handleChange} value={password} type="password" name="password" placeholder="Choose a password..." variant="outlined"/>
            </form>
            <Button component={Link} to="/" variant="contained" color="primary">Back</Button>
            <Button component={Link} to="/signup/profile" variant="contained" color="primary">Forward</Button>
        </div>
    )
}

export default SignUpInitialForm