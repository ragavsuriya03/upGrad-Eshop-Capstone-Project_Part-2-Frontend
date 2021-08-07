import axios from 'axios';
import { toast } from 'react-toastify';

const setToken = (token) => {
    axios.defaults.headers.common['x-auth-header'] = token;
}

// declare a response interceptor
axios.interceptors.response.use((response) => {
    // do something with the response data
    //console.log('Response was received');
    return response;
  }, error => {
    toast.error(error.message);
    // handle the response error
    return Promise.reject(error);
  });


export default {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete,
    setToken: setToken
}