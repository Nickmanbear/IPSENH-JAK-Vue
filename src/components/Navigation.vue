<template>
  <div id="nav">
    <router-link to="/">Board Overview</router-link>
  </div>
</template>

<style lang="scss">
  #nav {
    background-color: #cccccc;
    width: 100%;
    padding: 8px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
