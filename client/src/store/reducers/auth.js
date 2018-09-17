import * as actionTypes from '../actions/actionTypes'

const initialState = {
    token: null,
    error: null,
    loading: true,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                error: null,
                loading: false,
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: null,
                loading: false
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                token: null
            };
        case actionTypes.CHECK_AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                error: null,
                loading: false,
            };

        default:
            return state;
    }
};


export default authReducer;