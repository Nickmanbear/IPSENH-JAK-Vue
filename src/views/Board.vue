<template>
  <div class="board">
    <h1>{{ name }}</h1>
    <div id="columns">
      <Column v-for="column in columns" :key="column.id" v-bind:column="column"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Column from '@/components/Column.vue';
import axios from '@/axiosConfig';

export default {
  name: 'Home',
  components: {
    Column,
  },
  data() {
    return {
      // TODO board id en name is nu nog hardcoded
      boardId: 1,
      name: 'Board1',
      columns: [],
    };
  },
  mounted() {
    axios.get('/column')
      .then((response) => {
        response.data.forEach((column) => {
          if (column.boardId === this.boardId) {
            this.columns.push(column);
          }
        });
      })
      .catch((error) => {
        // TODO: maak een foutmelding ofzo
        console.log(error);
      });
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
