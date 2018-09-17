import React, {Component} from "react";
import {withRouter} from 'react-router-dom';

import * as actions from '../../store/actions'
import Aux from '../../hoc/Aux/Aux'
import ToolBar from '../../components/UI/ToolBar/ToolBar';
import SideDrawer from '../../components/UI/SideDrawer/SideDrawer';
import {connect} from "react-redux";
import {Avatar, MenuItem} from "material-ui";

import classes from './Layout.css'
import logo from '../../assets/Chef_book.svg'
import {axiosProfileInstance} from "../../axios/axios";


class Layout extends Component {
    state = {
        openSideDrawer: false
    };

    handleSideDrawerToggle = () => this.setState(prevState => (
            {openSideDrawer: !prevState.openSideDrawer}
        )
    );

    handleSideDrawerRequestChange = openSideDrawer => (
        this.setState(
            {openSideDrawer: openSideDrawer}
        )
    );

    onImgPropfileSelect = event => {
        const fd = new FormData();
        fd.append("userImage", event.target.files[0]);
        axiosProfileInstance.put('/', fd, {
            headers: {
                Authorization: "Bearer " + this.props.token
            }
        }).then(response => {
            this.props.reloadUserData()
        }).catch(err => {
        })
    };

    goHomePage = () => {
        this.props.history.push("/home");
        this.props.resetFilter();
        this.props.resetRecipes();
    };

    onSideDrawerLogoutAction = () => {
        this.props.onLogout();
        this.setState({openSideDrawer: false});
    };

    onSideDrawerAddRecipeHendler = () => {
        this.props.history.push("/recipes/create");
        this.setState({openSideDrawer: false});
    };

    onSideDrawerGoHomeHendler = () => {
        this.goHomePage();
        this.setState({openSideDrawer: false});
    };

    onSideDrawerMyRecipes = () => {
        this.props.history.push("/home");
        this.props.resetFilter();
        const user = {value: this.props.userId, label: "משתמש:" + this.props.userName};
        this.props.selectUser(user);
        this.props.resetRecipes();
        this.setState({openSideDrawer: false});
    };

    render() {
        return (
            <Aux>
                <header>
                    <ToolBar isAuth={this.props.isAuth} click={this.props.onLogout}
                             label="התנתק"
                             onTitleClick={this.goHomePage}
                             toggle_sidedrawer={this.handleSideDrawerToggle}/>
                    <SideDrawer open={this.state.openSideDrawer}
                                isAuth={this.props.isAuth}
                                requestChange={this.handleSideDrawerRequestChange}>
                        <div style={{height: "100%"}}>
                            <div className={classes.AvatarImg}>
                                <Avatar src={this.props.profileImg}
                                        onClick={() => this.userImgInput.click()}
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}/>
                                <input type="file" style={{display: "none"}}
                                       ref={userImgInput => this.userImgInput = userImgInput}
                                       onChange={this.onImgPropfileSelect}/>
                            </div>
                            <MenuItem dir={"rtl"} onClick={this.onSideDrawerMyRecipes}>מתכונים שלי</MenuItem>
                            <MenuItem dir={"rtl"} onClick={this.onSideDrawerAddRecipeHendler}>הוסף מתכון</MenuItem>
                            <MenuItem dir={"rtl"} onClick={this.onSideDrawerGoHomeHendler}>דף הבית</MenuItem>
                            <MenuItem dir={"rtl"} style={{color: "red"}} onClick={this.onSideDrawerLogoutAction}>התנתק</MenuItem>
                            <img src={logo} alt="LOGO" style={{width: "100%", position: "fixed", bottom: "20px"}}/>
                        </div>
                    </SideDrawer>
                </header>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    };
}

const mapStateToProps = (state) => (
    {
        id: state.user.id,
        isAuth: state.auth.token != null,
        token: state.auth.token,
        profileImg: state.user.image,
        userName: state.user.name,
        userId: state.user.id,
    }
);

const mapDispatchToProps = (dispatch) => (
    {
        onLogout: () => dispatch(actions.logout()),
        reloadUserData: () => dispatch(actions.fetchUserData()),
        resetFilter: () => dispatch(actions.resetFilter()),
        selectUser: (user) => dispatch(actions.setSelectedUsers([user])),
        resetRecipes: () => dispatch(actions.changeOffset(1)),
    }
);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));