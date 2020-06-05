<template>
  <div id="login">
    <h1>Login</h1>
    <input type="text" name="username" v-model="userData.username" placeholder="Username"/>
    <input type="password" name="password" v-model="userData.password" placeholder="Password"/>
    <button type="button" v-on:click="login()">Login</button>
    <burndown/>
  </div>
</template>

<script>

import Burndown from '@/components/Burndown.vue';

export default {
  name: 'Login',
  components: { Burndown },
  data() {
    return {
      userData: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        username: this.userData.username,
        password: this.userData.password,
      })
        .then(() => {
          this.$router.push('/');
        });
    },
  },
};
</script>

<style scoped>
  #login {
    width: 100%;
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: 200px;
    padding: 20px;
  }
</style>
