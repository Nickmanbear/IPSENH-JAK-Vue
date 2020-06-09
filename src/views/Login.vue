<template>
  <div id="login">
    <h1>Login</h1>
    <input type="text" name="username" v-model="userData.username" placeholder="Username"/>
    <input type="password" name="password" v-model="userData.password"
           @keydown.enter="login" placeholder="Password"/>
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
      // TODO make .catch
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
    opacity: 85%;

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
      background-color: #ddd;
      font-size: 1em;
      padding: 3px 5px;
      margin: 0;
      width: 300px;
      cursor: pointer;

      &:hover {
        background-color: #ccc;
      }
    }
  }
</style>
