import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import EditIcon from '@material-ui/icons/Edit';
import Chip from "../Chip/Chip";


import {
    WhatsappShareButton,
    EmailShareButton,
    WhatsappIcon,
    EmailIcon
} from 'react-share'

import {MobileView} from "react-device-detect"

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
    shareButton:{
      padding: "3px",
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
                    <MobileView>
                        <div className={classes.share}>
                            <div className={classes.shareButton}>
                                <EmailShareButton
                                    url={""}
                                    subject={props.title}
                                    body={props.body}>
                                    <EmailIcon size={32} round={true}/>
                                </EmailShareButton>
                            </div>
                            <div className={classes.shareButton}>
                                <WhatsappShareButton url={window.location.origin + "/recipe/" + props.id}>
                                    <WhatsappIcon size={32} round={true}/>
                                </WhatsappShareButton>
                            </div>
                        </div>
                    </MobileView>
                    <Typography component="div" dir="rtl" className={classes.content}>
                        {props.children}
                    </Typography>
                </CardContent>

            </Card>
        );
};

export default withStyles(styles)(RecipeReviewCard);
