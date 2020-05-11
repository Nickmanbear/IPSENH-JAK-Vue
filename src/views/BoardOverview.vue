<template>
  <div class="overview">
    <h1>Choose ur board</h1>
    <div v-if="boards !== []">
      <BoardPreview v-for="board in boards" :key="board.id" v-bind:board="board"/>
    </div>
    <p v-else>Loading...</p>
  </div>
</template>

<script>
// @ is an alias to /src
import BoardPreview from '@/components/BoardPreview.vue';
import axios from '@/axiosConfig';

export default {
  name: 'Home',
  components: {
    BoardPreview,
  },
  data() {
    return {
      boards: [],
    };
  },
  mounted() {
    axios.get('/board')
      .then((response) => {
        this.boards = response.data;
      })
      .catch((error) => {
        // TODO: maak een foutmelding ofzo
        console.log(error);
      });
  },
};
</script>
