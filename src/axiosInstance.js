import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `http${process.env.VUE_APP_BACKEND_URL}`,
});

export default axiosInstance;
