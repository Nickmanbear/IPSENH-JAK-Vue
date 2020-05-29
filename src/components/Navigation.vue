<template>
  <div id="nav">
    <router-link to="/">Board Overview</router-link>
    <router-link v-if="authenticated === true" to="/logout">Logout</router-link>
    <router-link v-if="authenticated === false" to="/login">Login</router-link>
    <router-link v-if="authenticated === false" to="/register">Register</router-link>


  </div>
</template>

<script>

export default {
  name: 'Navigation',
  data() {
    return {
      authenticated: false,
    };
  },
  mounted() {
    this.getAuthenticated();
  },
  methods: {
    getAuthenticated() {
      this.authenticated = this.$store.getters.isLoggedIn;
    },
  },

};
</script>

<style lang="scss">
  #nav {
    background-color: #cccccc;
    width: calc(100% - 16px);
    padding: 8px;

    a {
      font-weight: bold;
      color: #2c3e50;
      margin: 16px;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
