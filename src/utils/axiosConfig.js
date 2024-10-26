// src/utils/axiosConfig.js

import axios from 'axios';

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: 'https://rule-backend.onrender.com/api/v1/',
  timeout: 500000, 
  headers: {
    'Content-Type': 'application/json',
  },
});


export default axiosInstance;
