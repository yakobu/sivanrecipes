import { combineReducers } from 'redux';

import auth from './reducers/auth'
import recipes from './reducers/recipes'
import tags from './reducers/tags'
import user from './reducers/user'
import users from './reducers/users'

export default combineReducers({
    auth,
    recipes,
    tags,
    user,
    users,
});