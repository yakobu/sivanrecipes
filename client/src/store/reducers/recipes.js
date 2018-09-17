import * as actionTypes from '../actions/actionTypes'

const initialState = {
    error: false,
    loading: false,
    recipes: [],
    offset: 1,
    fetchLimit: 10,
    recipesCount: 0
};

const recipesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_RECIPES_START:
            return {
                ...state,
                error: false,
                loading: true,
            };
        case actionTypes.FETCH_RECIPES_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                recipes: action.recipes,
                recipesCount: action.recipesCount
            };
        case actionTypes.FETCH_RECIPES_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case actionTypes.UPDATE_RECIPE_SUCCESS:
            const updatedRecipes =
                state.recipes.map(recipe => {
                    if (recipe.id === action.updatedRecipe.id) {
                        return action.updatedRecipe
                    }
                    return recipe
                });

            return {
                ...state,
                recipes: updatedRecipes
            };
        case actionTypes.SET_OFFSET:
            return {
                ...state,
                offset: action.offset
            };

        default:
            return state;
    }
};


export default recipesReducer;