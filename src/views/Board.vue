<template>
  <div class="board">
    <h1 v-if="!editingName">{{ board.name }}</h1>
    <input v-else v-model="board.name" @keydown.enter="editName" type="text">
    <button @click="editName">{{ editingName ? 'Save' : 'Edit' }}</button>
    <div id="columns">
      <Column v-for="column in columns" :key="column.id" v-bind:column="column"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Column from '@/components/Column.vue';
import axios from '@/axiosInstance';

export default {
  name: 'Home',
  components: {
    Column,
  },
  data() {
    return {
      board: {
        id: 0,
        userId: 0,
        name: 'board1',
      },
      columns: [],
      editingName: false,
    };
  },
  mounted() {
    this.getBoard();
    this.getColumns();
  },
  methods: {
    getColumns() {
      axios.get(`/column/board/${this.$route.params.id}`)
        .then((response) => {
          this.columns = [];
          this.columns = response.data;
        })
        .catch((error) => {
          // TODO: maak een foutmelding ofzo
          console.log(error);
        });
    },
    editName() {
      if (this.editingName) {
        axios.post(
          '/board',
          this.board,
        );
      }
      this.editingName = !this.editingName;
    },
    async getBoard() {
      this.board = await axios.get(`/board/${this.$route.params.id}`)
        .then((response) => response.data);
    },
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
