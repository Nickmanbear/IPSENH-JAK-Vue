import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: `http${process.env.VUE_APP_BACKEND_URL}`,
  baseURL: 'http://localhost:8080',
});

export default axiosInstance;
