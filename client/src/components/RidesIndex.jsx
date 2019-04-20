import axios from 'axios';
import React, { Component } from 'react';
import { withSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import { Route, Link, withRouter } from 'react-router-dom';
import RideFlow from '../views/RideFlow';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
const styles = theme => ({
    root: {
        maxWidth: '80%',
        justifySelf: 'flexEnd',
    }
})

class RidesIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rides: []
        }
    }

    getRides = () => {
        axios.get('/ride')
        .then(res => {
            console.log('res', res)
            this.setState({
                rides: res.data.data
            })
            this.props.enqueueSnackbar(JSON.stringify(res.data.message), {variant: 'success'})
        })
        .catch(err => {
            console.log('err', err)
            this.props.enqueueSnackbar(JSON.stringify(err.response), {variant: 'error'})
        })
    }
    goToEditRide = (rideID) => {
        console.log('going to edit ride', rideID)
        this.props.history.push('/dash/ride/' + rideID)
    }
    updateRide = (rideID, formData) => {
        console.log('editRide', rideID, formData)
        const url = `/ride/${rideID}`
        axios.put(url)
        .then(res => {
            console.log('res', res)
            this.getRides()
            this.props.history.push('/dash')
            this.props.enqueueSnackbar(JSON.stringify(res.data.message), {variant: 'success'})
        })
        .catch(err => {
            console.log('err', err)
            this.props.enqueueSnackbar(JSON.stringify(err.response), {variant: 'error'})
        })
    }

    deleteRide = (rideID) => {
        console.log('deleteRide',rideID )
        const url = `/ride/${rideID}`
        axios.delete(url)
        .then(res => {
            console.log('res', res)
            this.getRides()
            this.props.enqueueSnackbar(JSON.stringify(res.data.message), {variant: 'success'})
        })
        .catch(err => {
            console.log('err', err)
            this.props.enqueueSnackbar(JSON.stringify(err.response), {variant: 'error'})
        })
    }

    componentDidMount() {
        console.log('rides index did mount')
        this.getRides()
    }

    render() {
        const { classes } = this.props

        const content = this.state.rides.map((ride, i) => {
            const browserUrl = `dash/ride/${ride.start}`
            const start = new Date(ride.start)
            const end = new Date(ride.end)
            console.log('start', start)
            console.log('end', end)

            return (
                <Grid item container key={i} className="ride"  >
                    <Grid item container direction="row" spacing={40} style={{margin: ""}}>
                        <Grid item>
                        <Typography variant="body1">Need a ride! {ride.note}</Typography>
                        </Grid>
                        <Grid item container spacing={40}>
                                <Grid item><Typography variant="h5">{}</Typography></Grid>
                                <Grid item><Typography variant="body2">Date: {start.toLocaleDateString()}</Typography></Grid>
                                <Grid item><Typography variant="body2">Start of day: {start.toLocaleTimeString()}</Typography></Grid>
                                <Grid item><Typography variant="body1">End of day: {end.getHours()} : {end.getMinutes()}</Typography></Grid>
                                <Grid item><Typography variant="body1">{ride.note}</Typography></Grid>
                                <Grid><Button onClick={() => this.goToEditRide(ride._id)}><EditIcon/></Button></Grid>
                                <Grid><Button onClick={() => this.deleteRide(ride._id)}><CloseIcon /></Button></Grid>
                        </Grid>
                    </Grid>
                </Grid>
                )
        })
        const routes = this.state.rides.map((ride, i) => {
            const url = `/dash/ride/${ride._id}`
            return (
                <Route path={url}
                    render={() => {
                        return (
                            <RideFlow rideID={ride._id} ride={ride} delete={this.deleteRide} updateRide={this.updateRide} />
                        )
                    }} 
                />
            )
        })

        return (
            <Grid container style={{padding: '80px'}} alignContent="center" justify="center" className={classes.root} spacing={40}>
                <Grid item>
                    {routes}
                </Grid>
                <Grid item>
                    {content}
                </Grid>
            </Grid>  
        )
    }
}


export default withRouter(withStyles(styles)(withSnackbar(RidesIndex)))