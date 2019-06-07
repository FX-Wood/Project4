import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SignupForm = ({login, logout, openSnackbar}) => {
    
    // form control values
    const [values, setValues] = useState({first: '', last: '', email: '', password: ''})
    
    // setter for form values
    const handleChange = (e) => {
        e.persist()
        setValues((previousValues) => ({...previousValues, [e.target.name]: e.target.value}) )
    }

    // focus on first input on first mount
    const firstInput = useRef()
    useEffect(() => { firstInput.current.focus() }, []) // no implicit return

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/auth/signup', values)
        .then( res => {
            if (res.data.type === 'error') {
                throw new Error(res.data)
            } else {
                localStorage.setItem('jwtToken', res.data.token)
                login(res.data)
            }
        }).catch(err => {
            let message;
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                message = `${err.response.status}: ${err.response.data.message || err}`
            } else if (err.request) {
                // The request was made but no response was received
                message = '404: server not found'
            } else {
                // Something happened in setting up the request that triggered an Error
                message = 'Error: ' + err
            }
            // handle too many 
            if (err.status === '429') {
                message = `${err.response.status}: too many requests`
            }
            openSnackbar(message, {variant: 'error'})
        });
    }


    return (
        <Grid container
            component='form'
            direction='column'
            alignItems='center'
            justify='center'
            spacing={24}
            style={{minHeight: '90vh'}}
            onSubmit={handleSubmit}
            >
            <Grid item >
                <TextField 
                    inputRef={firstInput}
                    value={values.first}
                    onChange={handleChange}
                    type="text"
                    name="first"
                    label="First Name"
                    placeholder="Enter your first name"
                    variant="outlined"
                    />
            </Grid>
            <Grid item >
                <TextField 
                    value={values.last}
                    onChange={handleChange}
                    type="text"
                    name="last"
                    label="Last Name"
                    placeholder="Enter your last name"
                    variant="outlined"
                    />
            </Grid>
            <Grid item >
                <TextField
                    onChange={handleChange}
                    value={values.email}
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Enter your email address"
                    variant="outlined"
                />
            </Grid>
            <Grid item>
                <TextField
                    onChange={handleChange}
                    value={values.password}
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Choose a password..."
                    variant="outlined"
                />
            </Grid>
            <Grid item>
                <Button type="submit" color="primary" variant="contained">Sign Up</Button>
            </Grid>
        </Grid>
    )
}

export default SignupForm