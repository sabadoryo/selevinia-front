import axios from "axios";

const DEV = 'http://selevenia.test/';

/*
 @TODO change before deploying
*/
let instance = axios.create({
    baseURL : DEV
});

instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
instance.defaults.withCredentials = true;

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
})

instance.interceptors.request.use(function (config) {
    
})

export default instance;