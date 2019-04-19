import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import MomentUtils from '@date-io/moment';
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, TimePicker, MuiPickersUtilsProvider, } from "material-ui-pickers";
import axios from 'axios';

// Table Ride {
//     id [pk]
//     user int [ref: - User.id]
//     day date
//     depart time
//     arrive time
//     note varchar
//   }

class RideFlow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            start: null,
            startFlex: false,
            end: null,
            endFlex: false,
            note: '',
            offer: 0,
        }
    }

    handleSubmit = e => {
        console.log('submitting', this.state)
        const data = this.state
        axios.post('/ride', data)
        .then(res => {
            console.log('res', res)
        })
        .catch(err => {
            console.log('err', err)
        })
    }

    changeStart = date => {
        console.log('changeStart')
        this.setState({ start: date })
    }
    changeLeave = date => {
        console.log('changeleavedate')
        this.setState({ end: date })
    }

    handleCheckbox = e => {
        this.setState({
            [e.target.name]: e.target.checked
        })
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <Paper style={{minWidth: '400px', minHeight: '400px'}}></Paper>
                <Grid container direction="column" alignItems="center" justify="center" spacing={24} style={{minHeight: '100vh'}}>
                    <Grid item >
                            <FormControlLabel 
                                control={
                                    <Checkbox 
                                        name="startFlex"
                                        checked={this.state.startFlex} 
                                        onChange={this.handleCheckbox} 
                                    />
                                }
                                label="flexible"
                            />
                            <DatePicker
                                label="Pick the day"
                                value={this.state.start}
                                onChange={this.changeStart}
                                variant="outlined"
                                />
                            <TimePicker
                                label="pick time to leave"
                                value={this.state.start}
                                onChange={this.changeStart}
                                variant="outlined"
                                />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControlLabel 
                            control={
                                <Checkbox 
                                    name="endFlex"
                                    checked={this.state.endFlex} 
                                    onChange={this.handleCheckbox} 
                                />
                            }
                            label="flexible"
                        />
                        <TimePicker
                            label="pick end of day"
                            value={this.state.end}
                            onChange={this.changeLeave}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            onChange={this.handleInput}
                            value={this.state.note}
                            type="text"
                            name="note"
                            label="note"
                            placeholder="Write a quick note about the day"
                            variant="outlined"
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>Post ride request</Button>
                    </Grid>
                    {/* <Grid item xs={12} md={6}>
                        <TextField
                            onChange
                            value
                            type="text"
                            name=""
                            label=""
                            placeholder=""
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            onChange
                            value
                            type="text"
                            name=""
                            label=""
                            placeholder=""
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            onChange
                            value
                            type="text"
                            name=""
                            label=""
                            placeholder=""
                            variant="outlined"
                        />
                    </Grid> */}
                </Grid>
            </MuiPickersUtilsProvider>
        )
    }
}

export default RideFlow