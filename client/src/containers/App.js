import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Route, Redirect, Switch, withRouter} from 'react-router-dom'

import Layout from './Layout/Layout'
import Home from "../components/Home/Home"
import Auth from '../components/Auth/Auth'
import RecipeForm from '../components/Recipes/RecipeForm/RecipeForm'
import Recipe from '../components/Recipes/Recipe/Recipe'
import {connect} from 'react-redux'

import * as actions from '../store/actions'
import Spinner from "../components/UI/Spinner/Spinner";

class App extends Component {

    componentDidMount() {
        // Try login
        this.props.onTryAutoLogin();

        // Remove previous home scroller
        localStorage.removeItem("homeScroller");
    }

    render() {
        let app = <Spinner/>;
        if (!this.props.isLoading){
            app = (
                <Switch>
                    <Route path={this.props.isAuth ? "/home" : "/auth"}
                           exact
                           component={this.props.isAuth ? Home : Auth}/>
                    {this.props.isAuth ?
                        <Route path="/recipes/create"
                               exact
                               component={RecipeForm}/>
                        : null}
                    {this.props.isAuth ?
                        <Route path="/recipes/edit/:id"
                               exact
                               component={(props)=> <RecipeForm editMode {...props}/>}/>
                        : null}
                    {this.props.isAuth ?
                        <Route path="/recipe/:id"
                               exact
                               component={Recipe}/>
                        : null}
                    <Redirect to={this.props.isAuth ? "/home" : "/auth"}/>}
                </Switch>
            );
        }
        return (
            <MuiThemeProvider>
                <Layout>
                    {app}
                </Layout>
            </MuiThemeProvider>
        );
    }
}


const mapStateToProps = state => (
    {
        isAuth: state.auth.token != null,
        isLoading: state.auth.loading
    }
);

const mapDipspatchToProps = dispatch => (
    {
        onTryAutoLogin: () => dispatch(actions.checkAuth()),
        fetchTags: () => dispatch(actions.fetchTags()),
        fetchRecipes: () => dispatch(actions.fetchRecipes()),
    }
);

// Need to wrap this component with withRouter cause this issue:
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md
export default withRouter(connect(mapStateToProps, mapDipspatchToProps)(App));