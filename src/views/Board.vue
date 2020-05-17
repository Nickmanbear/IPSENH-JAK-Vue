<template>
  <div class="board">
    <h1 v-if="!editingName" @click="editingName = true">{{ board.name }}</h1>
    <input v-else v-model="board.name" @keydown.enter="saveName" type="text">
    <button v-if="editingName" @click="saveName">save</button>
    <div id="columns">
      <Column v-for="column in columns" :key="column.id"
              v-bind:column="column"
              @deleted="removeColumn()"/>
      <div>
        <input v-model="newColumnName" type="text" placeholder="New column name">
        <button @click="createColumn(newColumnName)">Create new column</button>
      </div>
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
      newColumnName: '',
    };
  },
  async mounted() {
    await this.getBoard();
    this.getColumns(this.board.id);
  },
  methods: {
    getColumns(boardId) {
      axios.get('/column')
        .then((response) => {
          this.columns = [];
          response.data.forEach((column) => {
            if (column.boardId === boardId) {
              this.columns.push(column);
            }
          });
        })
        .catch((error) => {
          // TODO: maak een foutmelding ofzo
          console.log(error);
        });
    },
    saveName() {
      this.editingName = false;
      axios.post(
        '/board',
        this.board,
      );
    },
    async getBoard() {
      this.board = await axios.get(`/board/${this.$route.params.id}`)
        .then((response) => response.data);
    },
    createColumn(newColumnName) {
      axios.post(
        '/column',
        {
          id: 0,
          boardId: this.board.id,
          name: newColumnName,
        },
      ).then((response) => {
        this.columns.push(response.data);
      }).catch((error) => {
        // TODO: maak een foutmelding ofzo
        console.log(error);
      });
    },
    removeColumn() {
      this.getColumns(this.board.id); // TODO: Remove from array instead
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
