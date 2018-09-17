import * as actionTypes from './actionTypes'

import {axiosUsersInstance} from '../../axios/axios'
import {fetchUserData} from "./user";
import {fetchTags} from "./tags";
import {fetchRecipes} from "./recipes";
import {fetchUsers} from "./users";

export const authStart = () => (
    {
        type: actionTypes.AUTH_START
    }
);


export const authSuccess = (authData) => (
    {
        type: actionTypes.AUTH_SUCCESS,
        ...authData
    }
);

export const authFail = (error) => (
    {
        type: actionTypes.AUTH_FAIL,
        error
    }
);

export const checkAuthSuccess = (token) => (
    {
        type: actionTypes.CHECK_AUTH_SUCCESS,
        token
    }
);

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

function auth_success(response, dispatch) {
    const token = response.data.user.token;
    const expirationTime = response.data.user.expirationTime;
    const expiredDate = new Date(new Date().getTime() + expirationTime * 1000);

    dispatch(authSuccess(response.data.user));
    dispatch(checkAuthTimeOut(expirationTime, token));
    localStorage.setItem('expiresIn', expiredDate);
    localStorage.setItem('token', token);
    dispatch(fetchTags());
    dispatch(fetchRecipes());
    dispatch(fetchUsers());
}

export const login = (email, password) => dispatch => {
    dispatch(authStart());
    axiosUsersInstance.post('/login', {
        user: {
            email,
            password
        }
    }).then((response) => {
        auth_success(response, dispatch)
    }).catch(err => {
        dispatch(authFail(err))
    })
};

export const register = (email, password, name) => dispatch => {
    dispatch(authStart());
    axiosUsersInstance.post('/register', {
        user: {
            email,
            password,
            name
        }
    }).then((response) => {
        auth_success(response, dispatch);
    }).catch(err => {
        dispatch(authFail(err))
    })
};

export const checkAuth = () => dispatch => {
    const token = localStorage.getItem("token");
    dispatch(authStart());
    if (token) {
        const expiredDate = new Date(localStorage.getItem("expiresIn"));
        if (expiredDate > new Date()) {
            dispatch(checkAuthSuccess(token));
            dispatch(fetchUserData());
            dispatch(fetchTags());
            dispatch(fetchRecipes());
            dispatch(fetchUsers());
            dispatch(checkAuthTimeOut((expiredDate.getTime() - new Date().getTime()) / 1000, token));
            return
        }
    }
    dispatch(authFail());
};

export const checkAuthTimeOut = (expiresIn, token) => dispatch => {
    setTimeout(() => {
        const currentToken = localStorage.getItem("token");
        if (currentToken && token === currentToken) {
            dispatch(logout());
        }
    }, expiresIn * 1000)
};