<template>
  <div class="overview">
    <h1>Choose ur board</h1>
    <div v-if="boards.length > 0">
      <BoardPreview
        v-for="board in boards" :key="board.id"
        v-bind:board="board"
        @deleted="removeBoardPreview()"/>
      <div>
        <input v-model="newBoardName" type="text" placeholder="New board name">
        <button @click="createBoard(newBoardName)">Create new board</button>
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
        })
        .catch((error) => {
          // TODO: maak een foutmelding ofzo
          console.log(error);
        });
    },
    createBoard(newBoardName) {
      axios.post(
        '/board',
        {
          id: 0,
          userId: 1, // TODO: Make current user_id
          name: newBoardName,
        },
      ).then((response) => {
        this.boards.push(response.data);
      }).catch((error) => {
        // TODO: maak een foutmelding ofzo
        console.log(error);
      });
    },
    removeBoardPreview() {
      this.getBoards(); // TODO: Remove from array instead
    },
  },
};
</script>
