<template>
  <div class="board">
    <h1>Board title - (later maybe andere opties en dan eigen component maken?)</h1>
    <div id="columns">
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Column from '@/components/Column.vue';

export default {
  name: 'Home',
  components: {
    Column,
  },
};
</script>

<style lang="scss">
  #columns {
    overflow: auto;
    white-space: nowrap;
    -ms-overflow-style: none;
  }

  #columns::-webkit-scrollbar {
    display: none;
  }
</style>
