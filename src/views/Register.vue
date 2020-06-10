<template>
  <div id="register">
    <div class="container">
      <form>
        <h1>Register</h1>
        <input type="text" id="username" v-model="userData.username"
               @keydown="usernameTaken = false" placeholder="Username">
        <p v-if="usernameTaken">This username is already taken</p>
        <input type="password" id="password" v-model="userData.password"
               @keydown.enter="register" placeholder="Password">
        <button @click.prevent="register">Sign up!</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Register',
  data() {
    return {
      userData: {
        username: '',
        password: '',
      },
      usernameTaken: false,
    };
  },

  methods: {
    register() {
      if (this.userData.username === '' || this.userData.password === '') {
        window.alert('Please enter your username and password.');
      }
      this.$store.dispatch('register', {
        username: this.userData.username,
        password: this.userData.password,
      })
        .then(() => {
          this.$router.push('/login');
        })
        .catch(() => {
          // TODO hij alert 2 keer idk whyy
          this.usernameTaken = true;
          this.userData.password = '';
        });
    },
  },
};
</script>

<style lang="scss">
  #register {
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
