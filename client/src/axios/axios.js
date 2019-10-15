import axios from 'axios';

const ip = process.env.REACT_APP_BACKEND_URL;

const apiURL = ip + "api";

export const axiosUsersInstance = axios.create({
    baseURL: apiURL + "/users",
});

export const axiosAdminInstance = axios.create({
    baseURL: apiURL + "/admin",
});

export const axiosRecipesInstance = axios.create({
    baseURL: apiURL + "/recipes",
});

export const axiosTagsInstance = axios.create({
    baseURL: apiURL + "/tags",
});

export const axiosProfileInstance = axios.create({
    baseURL: apiURL + "/profile",
});
