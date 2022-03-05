import axios from "axios";
import store from "./store"

// const DEV = 'http://selevinia.test';
const REMOTE_DEV = 'https://sabadoryo.com';

/*
 @TODO change before deploying
*/
let instance = axios.create({
    baseURL : REMOTE_DEV,
    headers: {'Authorization': 'Bearer '+ localStorage.getItem('jwt') ?? ''}
});

// instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// instance.defaults.withCredentials = true;

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 422) {
      store.commit('triggerSnackbar', {color : "red", message: error.response.data.message})
    }

    return Promise.reject(error)
})

// eslint-disable-next-line no-unused-vars
instance.interceptors.request.use(function (config) {
    return config;
})

export default instance;