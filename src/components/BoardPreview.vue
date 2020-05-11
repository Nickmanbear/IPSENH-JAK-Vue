<template>
  <router-link to="/board">
    <div id="boardprev">
      <h2>{{ board.name }}</h2>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'BoardPreview',
  props: {
    board: Object,
  },
};
</script>

<style lang="scss">
  #boardprev {
    background-color: #eee;
    border: 1px solid #eee;
    border-radius: 2px;
    padding: 0 20px;
    margin: 10px;
    display: inline-block;
    width: 200px;
    text-decoration: none;
    color: black;
  }
</style>
