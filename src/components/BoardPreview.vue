<template>
  <div id="boardprev" @click="route">
      <h2>{{ board.name }}</h2>
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
  data() {
    return {
      deleting: false,
    };
  },
  methods: {
    route() {
      if (!this.deleting) {
        this.$router.push(`/board/${this.board.id}`);
      }
    },
    deleteBoard() {
      this.deleting = true;
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
    background-color: white;
    border: 1px solid white;
    border-radius: 2px;
    padding: 0 8px 0 16px;
    margin: 10px;
    display: inline-block;
    width: 242px;
    cursor: pointer;
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
