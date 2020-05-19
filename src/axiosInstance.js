import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://backend-test.cherement.nl',
});

export default axiosInstance;
