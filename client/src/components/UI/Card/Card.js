import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Chip from "../Chip/Chip";


import {
    FacebookShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    EmailShareButton,
} from 'react-share'

import {
    WhatsappIcon,
    TwitterIcon,
    PinterestIcon,
    EmailIcon
} from 'react-share';

const styles = theme => ({
    card: {
        width: "100%",
        [theme.breakpoints.up(816)]:{
            width: 400,
        },
        margin: "auto",
        marginTop: "10px"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    avatar: {
        backgroundColor: red[500],
    },
    tags:{
        display: "flex"
    },
    share:{
        display: "flex",

    },
    content:{
        whiteSpace: "pre-line"
    }
});

const RecipeReviewCard = (props) => {
        const { classes } = props;
        const tags =
            props.tags?
                props.tags.map(tag =>
                    <Chip key={props.id + tag}>{tag}</Chip>) : null;

        return (
            <Card className={classes.card} key={props.id}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe"
                                className={classes.avatar} src={props.author.image}/>
                    }
                    action={props.editAble ?
                            <IconButton
                            onClick={(ev) => props.editClick(ev)}>
                                <EditIcon />
                            </IconButton> : null
                    }
                    title={props.title}
                    subheader={props.author.name}
                />
                <CardMedia
                    onClick={props.click}
                    className={classes.media}
                    image={props.img}
                />
                <CardContent>
                    <div className={classes.tags} dir="rtl">
                        {tags}
                    </div>
                    <div className={classes.tags}>
                        <EmailShareButton url={window.location.href}
                                          subject={props.title}
                                          body={props.children}>
                            <EmailIcon size={32} round={true}/>
                        </EmailShareButton>
                        <WhatsappShareButton url={window.location.href}
                                             title={props.title}>
                            <WhatsappIcon size={32} round={true}/>
                        </WhatsappShareButton>
                    </div>
                    <Typography component="div" dir="rtl" className={classes.content}>
                        {props.children}
                    </Typography>
                </CardContent>

            </Card>
        );
};

export default withStyles(styles)(RecipeReviewCard);
