<template>
  <div id="login">
    <h1>Login</h1>
    <p v-if="loginFailed">Login failed: Wrong credentials</p>
    <input type="text" name="username" v-model="userData.username"
           @keydown="loginFailed = false" placeholder="Username"/>
    <input type="password" name="password" v-model="userData.password"
           @keydown.enter="login" @keydown="loginFailed = false" placeholder="Password"/>
    <button type="button" v-on:click="login">Login</button>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      userData: {
        username: '',
        password: '',
      },
      loginFailed: false,
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
        })
        .catch(() => {
          this.loginFailed = true;
          this.userData.password = '';
        });
    },
  },
};
</script>

<style lang="scss">
  #login {
    width: 300px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    margin: 200px auto auto;
    padding: 0 20px 20px 20px;
    opacity: 86%;

    input {
      border: none;
      background-color: #f4f4f4;
      font-family: Arial, serif;
      font-size: 1em;
      padding: 5px;
      margin: 0 0 15px 0;
      width: 290px;
      display: block;
    }

    button {
      border: none;
      color: white;
      background-color: #d37b33;
      font-size: 1em;
      padding: 3px 5px;
      margin: 0;
      width: 300px;
      cursor: pointer;

      &:hover {
        background-color: #aa5a25;
      }
    }

    p {
      color: red;
      font-size: 0.8em;
      margin-top: -10px;
    }
  }
</style>
