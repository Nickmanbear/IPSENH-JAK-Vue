<template>
  <div class="overview">
    <h1>Choose your board</h1>
    <div v-if="boards.length > 0">
      <BoardPreview
        v-for="board in boards" :key="board.id"
        v-bind:board="board"
        @deleted="removeBoardPreview()"/>
      <div id="createBoard">
        <h2 v-if="!editingNewBoard" @click="editingNewBoard = true">Add board</h2>
        <input v-else v-model="newBoardName" type="text"
               @keydown.enter="createBoard" @keydown.esc="editingNewBoard = false">
        <button v-if="editingNewBoard" @click="createBoard()">Add</button>
      </div>
    </div>
    <p v-else>Loading...</p>
  </div>
</template>

<script>
// @ is an alias to /src
import BoardPreview from '@/components/BoardPreview.vue';
import axios from '@/axiosInstance';

export default {
  name: 'Home',
  components: {
    BoardPreview,
  },
  data() {
    return {
      boards: [],
      editingNewBoard: false,
      newBoardName: '',
    };
  },
  mounted() {
    this.getBoards();
  },
  methods: {
    getBoards() {
      axios.get('/board')
        .then((response) => {
          this.boards = response.data;
        });
    },
    createBoard() {
      axios.post(
        '/board',
        {
          id: 0,
          userId: 1, // TODO: Make current user_id
          name: this.newBoardName,
        },
      ).then((response) => {
        this.boards.push(response.data);
        this.newBoardName = '';
      });
    },
    removeBoardPreview() {
      this.getBoards(); // TODO: Remove from array instead
    },
  },
};
</script>

<style lang="scss">
  .overview {
    padding: 0 10px;

    h1 {
      padding: 0;
      margin: 0 0 5px 10px;
    }

    #createBoard {
      background-color: #f8f8f8;
      border: 1px solid #f8f8f8;
      border-radius: 2px;
      padding: 0 8px;
      margin: 10px;
      display: inline-block;
      vertical-align: top;
      width: 250px;

      h2 {
        margin-left: 5px;
        cursor: pointer;
        color: #888;
      }

      input {
        border: none;
        background-color: #f9f9f9;
        font-family: Arial, serif;
        font-size: 1.5em;
        font-weight: bold;
        margin: 8px 5px 8px 0;
        width: 80%;
      }

      button {
        border: none;
        font-size: 0.8em;
        padding: 3px 5px;
        margin: 0;
      }
    }
  }
</style>
