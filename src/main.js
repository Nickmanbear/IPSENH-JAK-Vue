import Vue from 'vue';

import App from './App.vue';
import store from './store';
import router from './router';
import axiosInstance from './axiosInstance';


const token = localStorage.getItem('token');

if (token) {
  axiosInstance.defaults.headers.Authorization = token;
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
