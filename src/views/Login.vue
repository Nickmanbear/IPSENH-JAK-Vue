<template>
  <div id="login">
    <h1>Login</h1>
    <input type="text" name="username" v-model="userData.firstName" placeholder="Username"/>
    <input type="password" name="password" v-model="userData.password" placeholder="Password"/>
    <button type="button" v-on:click="login()">Login</button>
  </div>
</template>

<script>

import axios from '@/axiosInstance';


// import { AxiosInstance as axios } from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      userData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {

    login() {
      this.$store.dispatch('login', {
        username: this.userData.firstName,
        password: this.userData.password,
      })
        .then(() => {
          this.$router.push('/');
        });
      axios.get('board')
        .then((response) => {
          console.log(response);
        });
    },
  },
};
</script>

<style scoped>
  #login {
    width: 500px;
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: 200px;
    padding: 20px;
  }
</style>
