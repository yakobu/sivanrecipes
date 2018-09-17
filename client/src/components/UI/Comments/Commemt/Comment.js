import React from 'react'

import Classes from './Comment.css'
import {Avatar} from "material-ui";


const commant = (props) => (
    <div className={Classes.UserComments} dir="rtl">
        <div className={Classes.commentUser}>
            <Avatar src={props.userImage}/>
            <div>
                <div className={Classes.commentUsername}>
                    {props.userName}
                </div>
                <time style={{whiteSpace: "nowrap"}}>
                    {new Date(props.time).toDateString()}
                </time>
            </div>
        </div>
        {props.image ?
            <div className={Classes.commentImage}>
                <img src={props.image} style={{width: "100%"}} alt={""}/>
            </div> : null}
        <div className={Classes.commentText}>
            <p>{props.body}</p>
        </div>
    </div>
);

export default commant;