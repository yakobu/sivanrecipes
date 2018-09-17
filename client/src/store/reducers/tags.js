import * as actionTypes from '../actions/actionTypes'

const initialState = {
    error: false,
    loading: false,
    tags_list: [],
    selected_tags:[]
};

const tagsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TAGS_START:
            return {
                ...state,
                error: false,
                loading: true,
            };
        case actionTypes.FETCH_TAGS_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                tags_list: action.tags
            };
        case actionTypes.FETCH_TAGS_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case actionTypes.SET_SELECTED_TAGS:
            return {
                ...state,
                selected_tags: action.selected_tags
            };

        default:
            return state;
    }
};


export default tagsReducer;