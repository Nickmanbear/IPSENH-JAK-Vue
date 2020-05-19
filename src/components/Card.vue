<template>
  <div id="card">
    <p>{{ card.name }}</p>
    <p>{{ card.description }}</p>
    <p>Priority: {{ card.priority }}</p>
    <p>Points: {{ card.points}}</p>
    <p>Tag</p>
    <p>Task</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    card: Object,
  },
};
</script>

<style lang="scss">
  #card {
    position: fixed;
    z-index: 500;
    background-color: white;
    width: 40%;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 16px 35px;
    left: 30%;
    top: 20%;
    box-sizing: border-box;
    transition: all 0.3s ease-out;
    p {
      white-space: normal;
    }
  }
</style>
