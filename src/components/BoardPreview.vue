<template>
  <div id="boardprev">
    <router-link :to="`/board/${board.id}`">
      <h2>{{ board.name }}</h2>
    </router-link>
    <button @click="deleteBoard">X</button>
  </div>
</template>

<script>

import axios from '@/axiosInstance';

export default {
  name: 'BoardPreview',
  props: {
    board: Object,
  },
  methods: {
    deleteBoard() {
      axios.delete(`board/${this.board.id}`).then(() => this.$emit('deleted'));
    },
  },
};
</script>

<style lang="scss">
  #boardprev {
    background-color: #eee;
    border: 1px solid #eee;
    border-radius: 2px;
    padding: 0 8px;
    margin: 10px;
    display: inline-block;
    width: 200px;

    a {
      text-decoration: none;
      color: black;
      padding: 0 8px;
    }

    h2 {
      display: inline-block;
    }
  }
</style>
