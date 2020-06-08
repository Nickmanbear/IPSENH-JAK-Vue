<template>
  <div class="teamBoards">
    <br>
    <h1>{{ team.name }}</h1>
    <BoardPreview
      v-for="board in boards" :key="board.id"
      v-bind:board="board"
      @deleted="removeBoardPreview()"/>
  </div>
</template>

<script>
// @ is an alias to /src
import BoardPreview from '@/components/BoardPreview.vue';
import axios from '@/axiosInstance';

export default {
  name: 'TeamBoards',
  components: {
    BoardPreview,
  },
  props: {
    team: {},
  },
  data() {
    return {
      boards: [],
    };
  },
  mounted() {
    this.getBoards();
  },
  methods: {
    getBoards() {
      axios.get(`/board/team/${this.team.id}`)
        .then((response) => {
          this.boards = response.data;
        });
    },
    removeBoardPreview() {
      this.getBoards();
    },
  },
};
</script>
