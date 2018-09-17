import * as actionTypes from './actionTypes'

import {axiosUsersInstance} from '../../axios/axios'

export const fetchStart = () => (
    {
        type: actionTypes.FETCH_USERS_START
    }
);


export const fetchSuccess = (data) => (
    {
        type: actionTypes.FETCH_USERS_SUCCESS,
        ...data
    }
);

export const fetchFail = (error) => (
    {
        type: actionTypes.FETCH_USERS_FAIL,
        error
    }
);

export const fetchUsers = () => (dispatch, getStore) => {
    dispatch(fetchStart());
    axiosUsersInstance.get("/all", {
        headers: {
            Authorization: "Bearer " + getStore().auth.token
        },
    }).then(response => {
        dispatch(fetchSuccess(response.data));
    }).catch(err => {
        dispatch(fetchFail(err));
    })
};

export const setSelectedUsers = (selected_users) => (
    {
        type: actionTypes.SET_SELECTED_USERS,
        selected_users
    }
);
