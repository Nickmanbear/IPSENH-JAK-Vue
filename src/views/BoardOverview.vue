<template>
  <div class="overview">
    <h1>Choose your board</h1>
    <p>this is a counter: {{ counter }}</p>
    <button v-on:click="counter++">+1</button>
    <div v-if="boards !== []">
      <BoardPreview v-for="board in boards" :key="board.id" v-bind:board="board"/>
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
      counter: 0,
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
  },
};
</script>
