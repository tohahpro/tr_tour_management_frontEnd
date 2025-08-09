import config from '@/config/index.config';
import axios from 'axios';


export const axiosInstance = axios.create({
  baseURL: config.baseURL,
//   timeout: 1000
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  }  
);

axiosInstance.interceptors.response.use(function onFulfilled(response) {
    return response;
  }, function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });