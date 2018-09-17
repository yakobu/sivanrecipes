import * as actionTypes from './actionTypes'

import {axiosRecipesInstance} from '../../axios/axios'

export const fetchRecipesStart = () => (
    {
        type: actionTypes.FETCH_RECIPES_START
    }
);

export const fetchRecipesSuccess = (recipes, recipesCount) => (
    {
        type: actionTypes.FETCH_RECIPES_SUCCESS,
        recipes,
        recipesCount
    }
);

export const fetchRecipesFail = (error) => (
    {
        type: actionTypes.FETCH_RECIPES_FAIL,
        error
    }
);

export const setOffset = (offset) => (
    {
        type: actionTypes.SET_OFFSET,
        offset
    }
);

export const updateRecipesSuccess = (updatedRecipe) => (
    {
        type: actionTypes.UPDATE_RECIPE_SUCCESS,
        updatedRecipe
    }
);

export const fetchRecipes = () => (dispatch, getState) => {
    dispatch(fetchRecipesStart());
    axiosRecipesInstance.get("/", {
        headers: {
            Authorization: "Bearer " + getState().auth.token
        },
        params: {
            author_ids: getState().users.selected_users.map(userObj => userObj.value),
            required_tags: getState().tags.selected_tags.map(tagObj => tagObj.value),
            limit: getState().recipes.fetchLimit,
            offset: getState().recipes.offset,
        }
    }).then(response => {
        dispatch(fetchRecipesSuccess(response.data.recipes, response.data.recipesCount));
    }).catch(err => {
        dispatch(fetchRecipesFail(err));
    })
};


export const addRecipe = (data) => (dispatch, getState) => {
    return axiosRecipesInstance.post('/', data, {
        headers: {
            Authorization: "Bearer " + getState().auth.token
        }
    }).then(response => {
        dispatch(changeOffset(1));
        return Promise.resolve(response)
    }).catch(err => {
        return Promise.reject(err)
    })
};

export const updateRecipe = (id, newData) => (dispatch, getState) => {
    return axiosRecipesInstance.put('/' + id, newData, {
        headers: {
            Authorization: "Bearer " + getState().auth.token
        }
    }).then(response => {
        dispatch(updateRecipesSuccess(response.data.recipe));
        return Promise.resolve(response)
    }).catch(err => {
        return Promise.reject(err)
    })
};


export const changeOffset = (newOffset) => (dispatch) => {
    dispatch(setOffset(newOffset));
    dispatch(fetchRecipes())
};