import * as actionTypes from './actionTypes'

import {axiosUsersInstance} from '../../axios/axios'

export const fetchStart = () => (
    {
        type: actionTypes.FETCH_USER_START
    }
);


export const fetchSuccess = (authData) => (
    {
        type: actionTypes.FETCH_USER_SUCCESS,
        ...authData
    }
);

export const fetchFail = (error) => (
    {
        type: actionTypes.FETCH_USER_FAIL,
        error
    }
);

export const fetchUserData = () => dispatch => {
    const token = localStorage.getItem("token");
    dispatch(fetchStart());
    axiosUsersInstance.get("/", {
        headers: {
            Authorization: "Bearer " + token
        },
    }).then(response => {
        dispatch(fetchSuccess(response.data.user));
    }).catch(err => {
        dispatch(fetchFail(err));
    })
};
