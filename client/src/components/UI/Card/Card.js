// import React from 'react';
//
// import Avatar from 'material-ui/Avatar';
// import Chip from '../Chip/Chip';
// import edit from '../../../assets/editIcon.svg'
//
// import Classes from './Card.css';
//
// const card = (props) => {
//     const tags = props.tags.map(tag => <Chip key={props.id + tag} color="#80CBC4">{tag}</Chip>);
//
//     return (
//         <div onClick={props.click} className={Classes.Card} dir="rtl">
//             <div className={Classes.ImgWrapper}>
//                 <img className={Classes.RecipeImg} style={props.ImageStyle} alt="" src={props.img}/>
//                 {props.editAble ?
//                     <div className={Classes.ImgOverlay}>
//                         <img className={Classes.ImgEdit}
//                              src={edit}
//                              alt={"edit"}
//                              onClick={(ev) => props.editClick(ev)}/>
//                     </div> : null}
//             </div>
//             <h1>{props.title}</h1>
//
//             <div className={Classes.Author}>
//                 <Chip>
//                     <Avatar src={props.editAble ? props.profileImage : props.author.image}/>
//                     {props.author.name}
//                 </Chip>
//             </div>
//             <div className={Classes.Tags}>
//                 {tags}
//             </div>
//             <div className={Classes.Separator}/>
//             <div className={Classes.Content}>
//                 {props.children}
//             </div>
//         </div>)
// };
//
//
// export default card;



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
                    subheader="September 14, 2016"
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
                    <Typography component="div" dir="rtl" className={classes.content}>
                        {props.children}
                    </Typography>
                </CardContent>
                {/*<CardActions className={classes.actions} disableActionSpacing>*/}
                    {/*<IconButton aria-label="Add to favorites">*/}
                        {/*<FavoriteIcon />*/}
                    {/*</IconButton>*/}
                    {/*<IconButton aria-label="Share">*/}
                        {/*<ShareIcon />*/}
                    {/*</IconButton>*/}
                {/*</CardActions>*/}
            </Card>
        );
};

export default withStyles(styles)(RecipeReviewCard);
