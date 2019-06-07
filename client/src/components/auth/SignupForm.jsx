import React, { useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const SignupForm = (props) => {
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    // focus on first input on first mount
    const firstInput = useRef()
    useEffect(() => {
        firstInput.current.focus()
    }, [])

    return (
        <Grid container
            component='form'
            spacing

            >
            <Grid item >
                <TextField 
                    ref={firstInput}
                    value={first}
                    onChange={setFirst}
                    type="text"
                    name="first"
                    label="First Name"
                    placeholder="Enter your first name"
                    variant="outlined"
                    />
            </Grid>
            <Grid item >
                <TextField 
                    value={last}
                    onChange={setLast}
                    type="text"
                    name="last"
                    label="Last Name"
                    placeholder="Enter your last name"
                    variant="outlined"
                    />
            </Grid>
            <Grid item >
                <TextField
                    onChange={setEmail}
                    value={email}
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Enter your email address"
                    variant="outlined"
                />
            </Grid>
            <Grid item>
                <TextField
                    onChange={setPassword}
                    value={password}
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Choose a password..."
                    variant="outlined"
                />
            </Grid>
        </Grid>
    )
}