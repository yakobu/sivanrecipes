import * as actionTypes from "./actionTypes";
import {axiosTagsInstance} from "../../axios/axios";

export const fetchTagsStart = () => (
    {
        type: actionTypes.FETCH_TAGS_START
    }
);

export const fetchTagsSuccess = (tags) => (
    {
        type: actionTypes.FETCH_TAGS_SUCCESS,
        tags
    }
);

export const fetchTagsFail = (error) => (
    {
        type: actionTypes.FETCH_TAGS_FAIL,
        error
    }
);

export const setSelectedTags = (selected_tags) => (
    {
        type: actionTypes.SET_SELECTED_TAGS,
        selected_tags
    }
);

export const fetchTags = () => dispatch => {
    const token = localStorage.getItem("token");
    dispatch(fetchTagsStart());
    axiosTagsInstance.get('/', {
        headers: {
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            dispatch(fetchTagsSuccess(response.data.tags));
        }).catch(err => {
        dispatch(fetchTagsFail(err));
    })
};
