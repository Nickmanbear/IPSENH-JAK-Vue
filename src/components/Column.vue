<template>
  <div id="column">
    <h2>Title</h2>
    <div id="cards">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
    <p>+ Add card</p>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/CardPreview.vue';

export default {
  name: 'Home',
  components: {
    Card,
  },
};
</script>

<style lang="scss">
  #column {
    background-color: #eee;
    border: 1px solid #eee;
    border-radius: 3px;
    padding: 5px 10px;
    margin: 5px;
    display: inline-block;
    width: 240px;
    max-height: 80vh;
  }

  h2 {
    margin: 5px 0;
  }

  #cards {
    height: 70vh;
    overflow: scroll;
    -ms-overflow-style: none;
  }

  #cards::-webkit-scrollbar {
    display: none;
  }
</style>
