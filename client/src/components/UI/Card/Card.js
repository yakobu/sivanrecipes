import React from 'react';

import Avatar from 'material-ui/Avatar';
import Chip from '../Chip/Chip';
import edit from '../../../assets/editIcon.svg'

import Classes from './Card.css';

const card = (props) => {
    const tags = props.tags.map(tag => <Chip key={props.id + tag} color="#80CBC4">{tag}</Chip>);

    return (
        <div onClick={props.click} className={Classes.Card} dir="rtl">
            <div className={Classes.ImgWrapper}>
                <img className={Classes.RecipeImg} style={props.ImageStyle} alt="" src={props.img}/>
                {props.editAble ?
                    <div className={Classes.ImgOverlay}>
                        <img className={Classes.ImgEdit}
                             src={edit}
                             alt={"edit"}
                             onClick={(ev) => props.editClick(ev)}/>
                    </div> : null}
            </div>
            <h1>{props.title}</h1>

            <div className={Classes.Author}>
                <Chip>
                    <Avatar src={props.editAble ? props.profileImage : props.author.image}/>
                    {props.author.name}
                </Chip>
            </div>
            <div className={Classes.Tags}>
                {tags}
            </div>
            <div className={Classes.Separator}/>
            <div className={Classes.Content}>
                {props.children}
            </div>
        </div>)
};


export default card;