import React, { Component } from 'react';
import { withSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import MomentUtils from '@date-io/moment';
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, TimePicker, MuiPickersUtilsProvider, } from "material-ui-pickers";
import axios from 'axios';
import { withRouter } from 'react-router-dom';


class RideUpdate extends Component {
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
        this.props.updateRide(this.props.rideID, this.state)
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

    getExistingRide = () => {
        console.log('getting existing ride')
        const url = `/api/ride/${this.props.rideID}`
        axios.get(url)
        .then(res => {
            console.log('res', res)
            const { start, startFlex, end, endFlex, note } = res.data.data
            console.log('data', { start, startFlex, end, endFlex, note })
            this.setState({ start, startFlex, end, endFlex, note })
            this.props.enqueueSnackbar(`loaded ride number ${this.props.rideID}`, {variant: 'success'})
        })
        .catch(err => {
            console.log('err', err)
            this.props.enqueueSnackbar(JSON.stringify(err.response), {variant: 'error'})
        })
    }
    componentDidMount() {
        console.log('rideupdate didmount')
        this.getExistingRide()
    }

    render() {
        console.log('rideID', this.props.rideID)
        const title = 'Update your ride';
        const submit = this.handleSubmit;
        const buttonText = 'Update ride';
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <Grid container direction="column" alignItems="center" justify="center" spacing={24}>
                    <Button onClick={this.getExistingRide}>Get ride data</Button>
                    <Grid item>
                        <Typography variant="h3">{title}</Typography>
                    </Grid>
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
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>{buttonText}</Button>
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>
        )
    }
}

export default withRouter(withSnackbar(RideUpdate));