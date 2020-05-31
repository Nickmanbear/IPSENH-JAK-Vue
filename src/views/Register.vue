<template>
  <div id="register">
    <div class="container">
      <form>
        <h1>Signup</h1>
        <hr>
        <div>
          <label for="username">First Name</label>
          <input type="text" id="username" v-model="userData.username">
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" v-model="userData.password">
        </div>
        <hr>
        <div class="row">
          <button @click.prevent="register">Submit!</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '@/axiosInstance';

export default {
  name: 'Register',
  data() {
    return {
      userData: {
        username: '',
        password: '',
      },
    };
  },

  methods: {
    register() {
      axios.post('/user/register', {
        username: this.userData.username,
        password: this.userData.password,
      })
        .then(() => this.$router.push('/'));
    },
  },
};
</script>
