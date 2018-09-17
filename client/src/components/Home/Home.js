import ReactDOM from 'react-dom';
import {connect} from "react-redux";
import React, {Component} from 'react'

import Aux from '../../hoc/Aux/Aux'
import Recipes from '../Recipes/Recipes'
import Spinner from '../UI/Spinner/Spinner'
import MultiSelector from '../UI/MultiSelector/MultiSelector'
import FloatingActionButton from '../UI/FloatingActionButton/FloatingActionButton'
import Paging from '../UI/Paging/Paging'
import * as actions from '../../store/actions'

import Classes from './Home.css'

class Home extends Component {

    componentDidMount() {
        const scrollerPosition = localStorage.getItem('homeScroller') || 0;
        this.setScrollerPosition(scrollerPosition);

        window.addEventListener("scroll", this.handleScroll, true)
    }

    setScrollerPosition(posotion) {
        const node = ReactDOM.findDOMNode(this);
        node.scrollTop = posotion;
    }

    componentWillUnmount(){
        window.removeEventListener("scroll", this.handleScroll, true)
    }

    handleScroll(event){
        localStorage.setItem('homeScroller', event.srcElement.scrollTop)
    };

    addRecipeHendler = () => {
        this.props.history.push("/recipes/create")
    };

    editRecipeHendler = (e, id) => {
        e.stopPropagation();
        this.props.history.push("/recipes/edit/" + id)
    };

    recipeClickHendler = (recipeId) => {
        this.props.history.push("/recipe/" + recipeId)
    };

    render() {
        let content = null;

        if (this.props.isLoading)
            content = <Spinner/>;
        else
            content = (
                <Aux>
                    <Recipes recipeClick={this.recipeClickHendler}
                             editClick={this.editRecipeHendler}
                             recipes={this.props.allRecipes}
                             email={this.props.email}
                             profileImage={this.props.profileImage}/>
                    <div className={Classes.Paging}>
                        <Paging currentPage={this.props.currentPage}
                                total={this.props.recipesCount}
                                mountPerPage={this.props.limit}
                                onChange={this.props.changePage}
                        />
                    </div>
                </Aux>

            );

        const users = this.props.allUsers.map(user => ({value: user.id, label: "משתמש:" + user.name}));
        const tags = this.props.allTags.map(tag => ({value: tag, label: "תג:" + tag}));
        const filter_options = tags.concat(users);

        const selected_filter = this.props.selectedTags.concat(this.props.selectedUsers);

        return (
            <Aux>
                <div className={Classes.Content}>
                    <div className={Classes.Selector}>
                        <MultiSelector
                            handleChange={this.props.changeSelectedFilter}
                            value={selected_filter}
                            placeholder="חפש לפי...">
                            {filter_options}
                        </MultiSelector>
                    </div>
                    {content}
                </div>
                <FloatingActionButton onClick={this.addRecipeHendler}/>
            </Aux>
        );
    }
}

const mapStateToProps = state => (
    {
        isLoading: state.recipes.loading,
        allRecipes: state.recipes.recipes,
        recipesCount: state.recipes.recipesCount,
        allTags: state.tags.tags_list,
        allUsers: state.users.users,
        email: state.user.email,
        profileImage: state.user.image,
        currentPage: state.recipes.offset,
        limit: state.recipes.fetchLimit,
        selectedTags: state.tags.selected_tags,
        selectedUsers: state.users.selected_users,
    }
);

const mapDisptchTopProps = dispatch => (
    {
        changePage: (page) => dispatch(actions.changeOffset(page)),
        changeSelectedFilter: (newTags)=> dispatch(actions.selectFilter(newTags))
    }
);

export default connect(mapStateToProps, mapDisptchTopProps)(Home);