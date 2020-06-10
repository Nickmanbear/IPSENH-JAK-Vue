<template>
  <div id="boardprev">
    <router-link :to="`/board/${board.id}`">
      <h2>{{ board.name }}</h2>
    </router-link>
    <button id="delete" @click="deleteBoard">&times;</button>
  </div>
</template>

<script>

import axios from '@/axiosInstance';

export default {
  name: 'BoardPreview',
  props: {
    board: {
      id: 0,
      userId: 0,
      name: '',
    },
  },
  methods: {
    deleteBoard() {
      if (window.confirm(`Do you really want to delete board '${this.board.name}'?`)) {
        axios.delete(`board/${this.board.id}`)
          .then(() => this.$emit('deleted'));
      }
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
    width: 250px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    a {
      text-decoration: none;
      color: black;
      padding: 0 8px;
    }

    h2 {
      display: inline-block;
    }

    #delete {
      font-size: 1em;
      border: none;
      background-color: transparent;
      cursor: pointer;
      padding: 5px 10px;
      position: relative;
      float: right;
      color: #ccc;
      margin: 5px 0;

      &:hover {
        color: red;
        background-color: #f4f4f4;
        border-radius: 50%;
      }
    }
  }
</style>
