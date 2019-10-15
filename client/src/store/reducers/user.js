import * as actionTypes from '../actions/actionTypes'

const initialState = {
    error: null,
    loading: false,
    image: null,
    email: null,
    name: null,
    is_admin: null,
    id: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_START:
            return {
                ...state,
                error: null,
                loading: true
            };
        case actionTypes.FETCH_USER_SUCCESS:
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                image: action.image,
                email: action.email,
                name: action.name,
                is_admin: action.is_admin,
                id: action.id,
                error: null,
                loading: false,
            };
        case actionTypes.FETCH_USER_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                error: null,
                loading: false,
                image: null,
                email: null,
                name: null,
                is_admin: null,
                id: null,
            };
        default:
            return state;
    }
};


export default userReducer;