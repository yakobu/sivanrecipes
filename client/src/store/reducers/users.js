import * as actionTypes from '../actions/actionTypes'

const initialState = {
    error: null,
    loading: false,
    users:[],
    selected_users: [],
    count: 0,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USERS_START:
            return {
                ...state,
                error: null,
                loading: true
            };
        case actionTypes.FETCH_USERS_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                users: action.users,
                count: action.userCount,
            };
        case actionTypes.FETCH_USERS_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case actionTypes.SET_SELECTED_USERS:
            return {
                ...state,
                selected_users: action.selected_users
            };
        default:
            return state;
    }
};


export default usersReducer;