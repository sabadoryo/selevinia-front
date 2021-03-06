import axios from "axios";
import store from "./store"

// const DEV = 'http://selevinia.test';
// const REMOTE_DEV = 'https://sabadoryo.com';
const PROD = 'https://backend.selevinia.kz';

/*
 @TODO change before deploying
*/
let instance = axios.create({
    baseURL : PROD,
    // headers: {'Authorization': 'Bearer '+ localStorage.getItem('jwt') ?? ''}
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
instance.interceptors.request.use(
    config => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error))

export default instance;