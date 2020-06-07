<template>
  <div id="nav">
    <div v-if="$store.getters.isLoggedIn">
      <router-link to="/">Board Overview</router-link>
      <a @click="logout">Logout</a>
    </div>
    <div v-else>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link></div>


  </div>
</template>

<script>

export default {
  name: 'Navigation',
  methods: {
    logout(e) {
      e.preventDefault();
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login');
      });
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
      cursor: pointer;
      text-decoration: underline;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
