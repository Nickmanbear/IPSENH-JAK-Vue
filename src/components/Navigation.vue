<template>
  <div id="nav">
    <img v-bind:src="`${this.publicPath}images/jak.png`" alt="logo">
    <div v-if="$store.getters.isLoggedIn">
      <router-link to="/">Board Overview</router-link>
      <a @click="logout">Logout</a>
    </div>
    <div v-else>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Navigation',
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
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
    background-color: rgba(255, 255, 255, 0.85);
    width: calc(100% - 16px);
    padding: 8px;

    img {
      width: 20px;
      height: 20px;
      padding: -5px;
      margin: -5px;
      margin-left: 5px;
    }

    div {
      display: inline;
      padding: 5px;
    }

    a {
      font-weight: bold;
      color: #2c3e50;
      margin: 16px;
      cursor: pointer;
      text-decoration: none;

      &.router-link-exact-active {
        color: #d37b33;
        text-decoration: underline;
      }
    }
  }
</style>
