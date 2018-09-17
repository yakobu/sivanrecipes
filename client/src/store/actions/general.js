import {changeOffset} from "./recipes";
import {setSelectedTags} from "./tags";
import {setSelectedUsers} from "./users";


export const selectFilter = values => dispatch => {
    const tags = values.filter(value => value.label.split(":")[0] === "תג");
    const users = values.filter(value => value.label.split(":")[0] === "משתמש");
    dispatch(setSelectedTags(tags));
    dispatch(setSelectedUsers(users));

    // This action change offset and fetch new recipes with the updated query
    dispatch(changeOffset(1));
};


export const resetFilter = () => dispatch => {
    dispatch(setSelectedTags([]));
    dispatch(setSelectedUsers([]));
};