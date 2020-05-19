<template>
  <div id="nav">
    <router-link to="/b">Board Overview</router-link> |
    <router-link to="/board">Board</router-link>
  </div>
</template>

<style lang="scss">
  #nav {
    background-color: #cccccc;
    height: 40px;
    margin: 0;
    width: 100%;
    text-align: center;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
