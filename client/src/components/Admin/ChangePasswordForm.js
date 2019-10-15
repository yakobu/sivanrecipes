import React, { Component } from 'react';
import { connect } from "react-redux";

import { axiosAdminInstance } from '../../axios/axios'

import Input from "../UI/Input/Input";
import Spinner from '../UI/Spinner/Spinner';
import MultiSelector from '../UI/MultiSelector/MultiSelector'


class ChangePasswordForm extends Component {
    state = {
        selectedUser: null,
        newPassword: '',
        isLoading: false
    }

    onNewPassword = (ev) => (
        this.setState({ newPassword: ev.target.value })
    )

    onSelectedUser = (users) => {
        return this.setState({ selectedUser: users })
    }

    setNewPassword = () => {
        this.setState({
            isLoading: true
        })

        const token = localStorage.getItem("token");
        axiosAdminInstance.post('/change_password', {
            users: this.state.selectedUser.map(selectedUser => selectedUser.value),
            newPassword: this.state.newPassword
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((response) => {
            console.log(response)
            this.setState({
                isLoading: false,
                selectedUser: null,
                newPassword: '',
            })
        }).catch(err => {
            console.error(err)
            this.setState({
                isLoading: false
            })
        })
    }

    render() {
        if (this.state.isLoading) return <Spinner />

        const options = this.props.allUsers.map(user => ({
            value: user.id,
            label: user.name
        }))

        return (
            <div dir="rtl">
                <div style={{ display: "flex", flexDirection: "column", margin: "auto", maxWidth: "500px" }}>
                    <h1>החלפת סיסמה למשתמש:</h1>
                    <MultiSelector
                        handleChange={this.onSelectedUser}
                        value={this.state.selectedUser}
                        placeholder="בחר משתמש">
                        {options}
                    </MultiSelector>
                    <Input elementConfig={{
                        id: "newPasswordID",
                        hintText: "הכנס סיסמה למשתמשים הנבחרים",
                        floatingLabelText: "סיסמה חדשה",
                        style: { width: "100%" }
                    }} value={this.state.newPassword} changed={this.onNewPassword} />
                    <button onClick={this.setNewPassword} style={{ width: "100%" }}>
                        UPDATE
                        </button>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => (
    {
        allUsers: state.users.users,
    }
);


export default connect(mapStateToProps)(ChangePasswordForm)
