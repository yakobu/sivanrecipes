import React, {Component} from 'react';
import {connect} from 'react-redux'

import ContactInfo from '../UI/ContactInfo/ContactInfo'
import * as actions from '../../store/actions'

import Classes from './Auth.css'
import Input from "../UI/Input/Input";
import {RaisedButton} from "material-ui";
import Spinner from '../UI/Spinner/Spinner'


class Login extends Component {
    state = {
        authForm:
            {

                email: {
                    elementType: "input",
                    elementConfig: {
                        style: {width: "70%", margin: "auto"},
                        hintText: "הכנס דואר אלקטרוני",
                        floatingLabelText: "דואר אלקטרוני",

                    },
                    value: "",
                },
                password: {
                    elementType: "input",
                    elementConfig: {
                        style: {width: "70%", margin: "auto"},
                        type: "password",
                        hintText: "הכנס סיסמה באנגלית",
                        floatingLabelText: ",סיסמה"

                    },
                    value: "",
                },
            },
        isLogin: true
    };

    inputChangedHandler = (event, inputId) => {
        const updatedAuthForm = {...this.state.authForm};
        const updatedFormElement = {...updatedAuthForm[inputId]};

        updatedFormElement.value = event.target.value;
        updatedAuthForm[inputId] = updatedFormElement;

        this.setState({
            authForm: updatedAuthForm
        });
    };

    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.isLogin)
            this.props.onLogin(this.state.authForm.email.value,
                this.state.authForm.password.value);
        else {
            this.props.onRegister(this.state.authForm.email.value,
                this.state.authForm.password.value,
                this.state.authForm.name.value)
        }
    };

    switchAuthModeHendler = () => {
        this.setState((prevState) => {
                const newIsLogin = !prevState.isLogin;
                const newAuthForm = {
                    ...prevState.authForm,
                    name: {
                        elementType: "input",
                        elementConfig: {
                            style: {width: "70%", margin: "auto"},
                            hintText: "הכנס שם פרטי",
                            floatingLabelText: "שם משתמש",
                        },
                        value: ""
                    }
                };

                let newState = {
                    isLogin: newIsLogin,
                    authForm: newAuthForm
                };

                if (newIsLogin) {
                    delete newState.authForm.name;
                    return newState
                }
                return newState
            }
        );
    };

    render() {
        const formElements = [];

        for (let key in this.state.authForm) {
            formElements.push({
                id: key,
                config: this.state.authForm[key],
            })
        }

        let form =
            <form onSubmit={this.submitHandler}>
                {formElements.map(formElement => (
                        <Input elementType={formElement.config.inputType}
                               elementConfig={formElement.config.elementConfig}
                               value={formElement.config.value}
                               key={formElement.id}
                               changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                    )
                )}
                <RaisedButton type="submit"
                              label={this.state.isLogin ? "התחבר" : "הרשם"}
                              primary={true}/>
            </form>;

        if (this.props.isLoading)
            form = <Spinner/>;


        return (
            <div className={Classes.Auth} dir="rtl">
                <div className={Classes.Content}>
                    <ContactInfo header={this.state.isLogin ? "התחברות לאתר טעים" : "הרשמות לאתר טעים"}/>
                    <div className={Classes.UserAuthDetails}>
                        {form}
                    </div>
                </div>
                <button className={Classes.SwitchStateButton}
                        onClick={this.switchAuthModeHendler}>
                    {this.state.isLogin ? "לך להירשם" : "אני כבר רשום"}
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        isLoading: state.auth.loading
    }
);

const mapDipatchToProps = dispatch => (
    {
        onLogin: (email, password) => dispatch(actions.login(email, password)),
        onRegister: (email, password, name) => dispatch(actions.register(email, password, name))
    }
);

export default connect(mapStateToProps, mapDipatchToProps)(Login);