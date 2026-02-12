import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:8080', // CHANGED: Gateway is on 8080, not 5000
    // REMOVED: 'Content-Type': 'application/json'
    // Why? Because for Registration we need 'multipart/form-data'. 
    // Letting Axios handle it automatically is safer.
});

// Add a request interceptor to attach the Token
api.interceptors.request.use(
    (config) => {
        // We will fix Login.jsx later to save 'token' specifically
        const token = localStorage.getItem('token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;