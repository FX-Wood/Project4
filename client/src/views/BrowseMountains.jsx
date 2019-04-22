import axios from 'axios';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import MountainCard from '../components/MountainCard';

import crystal from '../img/crystal.png';
import stevens from '../img/stevens-pass.png';
import summit from '../img/summit-at-snoqualmie-square.png';
import ReAuthorize from '../components/ReAuthorize';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';



const styles = theme => ({
    card: {
        maxWidth: '400px'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
    container: {
        padding: '10%',
        minHeight: '100vh'
    }
})

class BrowseMountains extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mountains: []
        }
    }
    getMountains = () => {
        console.log('getting mountains')
        axios.get('/api/mountains')
        .then(res => {
            console.log('got mountains back', res.data)
            this.setState({
                mountains: res.data.data
            })
        })
        .catch(err => {
            console.log('error getting mountains')
            console.log(err)
        })
    }

    componentDidMount() {
        this.getMountains()
    }
    render() {
        let content
        const { classes } = this.props
        if (this.props.user) {
            content = (
                <Grid container justify="center" alignContent="center" spacing={40} className={classes.container}>
                    {
                        this.state.mountains.map((mtn, i) => {
                            const { name, image, website, twitter, weather } = mtn
                            console.log(image)
                            return (
                                <Grid key={i} item xs={12} md={6} >
                                    <Card className={classes.card}>
                                    <CardContent>
                                        <CardHeader
                                            title={name}
                                        />
                                        <CardMedia 
                                            className={classes.media}
                                            src={image}

                                        />
                                        <CardActions>
                                            <IconButton component={ Link } to={website}>
                                                <ShareIcon />
                                            </IconButton>
                                            <IconButton onClick={() => this.props.addMountain(name)}>
                                                <FavoriteIcon />
                                            </IconButton>
                                        </CardActions>
                                    </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            )
        } else {
            content = <ReAuthorize login={this.props.login} />
        }
        return (
            <>
                {content}
            </>
        )
    }
}

export default withStyles(styles)(BrowseMountains)