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
        this.mountains = [
            {
                name: 'Crystal Mountain',
                image: crystal,
                website: 'www.crystalmountainresort.com',
                twitter: 'https://twitter.com/crystalmt?lang=en',
                weather: 'https://www.crystalmountainresort.com/the-mountain/mountain-report/weather-conditions/',
                sizzle: 'The Largest ski resort in Washington State with 2,600 acres and over 50 named runs. Skiers and Snowboarders from all around Washington, the Pacific Northwest and the world flock to Crystal Mountain for the incredible terrain, breathtaking views of Mt. Rainier and Washington’s only Gondola.'
            },
            {
                name: 'Stevens Pass',
                image: stevens,
                website: '',
                twitter: '',
                weather: '',
                sizzle: 'Skiing at Stevens Pass is truly a unique experience; a great way to wind down after work, or just get your turns in without worrying about crowds',
            },
            {
                name: 'The Summit at Snoqualmie',
                image: summit,
                website: '',
                twitter: '',
                weather: '',
                sizzle: "Seattle's Home Mountain! The Summit has four unique areas and the most night skiing in Washington, plus snow tubing and Nordic skiing. All just an hour from the city on I-90"
            }
        ]
    }
    render() {
        let content
        const { classes } = this.props
        if (this.props.user) {
            content = (
                <Grid container justify="center" alignContent="center" spacing={40} className={classes.container}>
                    {
                        this.mountains.map((mtn, i) => {
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