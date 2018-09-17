import React from 'react';
import Classes from './CommentsForm.css'

import commantLogo from '../../../../assets/Comment.svg'
import addImage from '../../../../assets/add_image.svg'
import Aux from "../../../../hoc/Aux/Aux";
import Spinner from "../../Spinner/Spinner";

const comment_form = (props) => {
    let content = props.isSending ? <Spinner/> : (
        <Aux>
            <div className={Classes.addCommentHeader}>
                <div className={Classes.leaveComment}>הוסף הערה</div>
                <img src={addImage} style={{width: "25px"}} alt="add-img"
                     onClick={props.addImageClick}/>
            </div>
            <div>
                {props.commentImage && props.commentImage.length > 0 ?
                    props.commentImage[0].name : null}
            </div>
            <form className="post-edit">
            <textarea className={Classes.CommentsFormErea}
                      placeholder="הכנס את הערה שלך פה"
                      ref={Input => this.Input = Input}
                      onChange={props.change}
                      value={props.value}
                      required/>
                <button
                    onClick={(ev) => props.clicked(ev)}
                    dir="ltr">
                    <img src={commantLogo} style={{height: "100%"}} alt="logo"/>
                </button>
            </form>
        </Aux>);

    return <div className={Classes.CommentsForm} dir="rtl">
        {content}
    </div>
};

export default comment_form;