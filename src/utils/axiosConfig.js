// src/utils/axiosConfig.js

import axios from 'axios';

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});


export default axiosInstance;
