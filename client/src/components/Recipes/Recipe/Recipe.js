import React, {Component} from 'react';

import Card from '../../UI/Card/Card';
import {connect} from "react-redux";
import Aux from "../../../hoc/Aux/Aux";
import CommentForm from '../../UI/Comments/CommentForm/CommentsForm'
import Comment from '../../UI/Comments/Commemt/Comment'
import Spinner from '../../UI/Spinner/Spinner'
import {axiosRecipesInstance} from '../../../axios/axios'
import input from "../../UI/Input/Input";

class Recipe extends Component {

    state = {
        loadComments: true,
        comments: [],
        recipe: null,
        loadRecipe: true,
        commentImage: null,
        commentContent: "",
        isSendComment: false
    };

    componentDidMount() {

        axiosRecipesInstance.get("/", {
            headers: {
                Authorization: "Bearer " + this.props.token
            },
            params: {
                limit: 1,
                id: this.props.match.params.id
            }
        }).then((res) => {
            this.setState(
            {
                loadRecipe: false,
                recipe: res.data.recipes[0],
            }
        )}).catch(e => console.log(e));


        axiosRecipesInstance.get("/" + this.props.match.params.id + "/comments", {
            headers: {
                Authorization: "Bearer " + this.props.token
            }
        }).then((res) => this.setState(
            {
                comments: res.data.comments,
                loadComments: false
            }
        ))
    }

    setCommentContent = (ev) => {
        this.setState({commentContent: ev.target.value})
    };

    commentAddImage = () => {
        this.imageInput.click()
    };

    setImageInput = (event) => {
        this.setState({commentImage: event.target.files})
    };

    createComment = (ev, input) => {
        ev.preventDefault();
        const body = this.state.commentContent;

        if (body.trim() === "") return;

        this.setState({isSendComment: true});

        const fd = new FormData();
        const commentImage = this.state.commentImage;
        fd.append("commentImage", commentImage ? commentImage[0] : "");
        fd.append("body", body);

        axiosRecipesInstance.post("/" + this.props.match.params.id + "/comments", fd, {
            headers: {
                Authorization: "Bearer " + this.props.token
            }
        }).then(res =>
            this.setState(prevState => {
                return {
                    ...prevState,
                    comments: prevState.comments.concat([res.data.comment]),
                    isSendComment: false
                }
            }, () => this.setState({commentContent: ""})))
            .catch(err => ({
                isSendComment: false
            }))
    };

    editRecipeHendler = (e, id) => {
        e.stopPropagation();
        this.props.history.replace("/recipes/edit/" + id)
    };

    render() {
        const recipe = this.state.recipe;
        const all_comments = !this.state.loadComments ?
            this.state.comments.map((comment) =>
                <Comment key={comment.id}
                         body={comment.body}
                         image={comment.image}
                         time={comment.createdAt}
                         userName={comment.author.name}
                         userImage={comment.author.image}/>) : null;

        const recipeCard = !this.state.loadRecipe ?
            (<Card img={recipe.image}
                   title={recipe.title}
                   key={recipe.id}
                   id={recipe.id}
                   tags={recipe.tags}
                   author={recipe.author}
                   body={recipe.body}
                   click={null}
                   editClick={(ev) => this.editRecipeHendler(ev, recipe.id)}
                   editAble={this.props.email === recipe.author.email}
                   profileImage={this.props.profileImage}
                   ImageStyle={{maxHeight: "550px", objectFit: "cover"}}>
                <h4>תקציר:</h4>
                <div>{recipe.description}</div>
                <h4>מתכון:</h4>
                <div>{recipe.body}</div>
            </Card>) : null;

        if (this.state.loadRecipe || this.state.loadComments) {
            return <Spinner/>
        }

        return (
            <Aux>
                {recipeCard}
                {all_comments}
                <input style={{display: "none"}}
                       type="file"
                       onChange={this.setImageInput}
                       ref={imageInput => this.imageInput = imageInput}/>
                <CommentForm isSending={this.state.isSendComment}
                             change={this.setCommentContent}
                             value={this.state.commentContent}
                             commentImage={this.state.commentImage}
                             addImageClick={this.commentAddImage}
                             clicked={(content, ev) => this.createComment(content, ev)}/>
            </Aux>
        )
    }
}

const mapStateToProps = state => (
    {
        token: state.auth.token,
        email: state.user.email,
        profileImage: state.user.image
    }
);

export default connect(mapStateToProps)(Recipe);