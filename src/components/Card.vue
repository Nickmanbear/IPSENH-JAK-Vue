<template>
  <div id="card">
    <h3 v-if="!editingName" @click="editingName = true">{{ card.name }}</h3>
    <input v-else v-model="card.name" @keydown.enter="saveName" type="text">
    <button v-if="editingName" @click="saveName">save</button>
    <p>{{ card.description }}</p>
    <p>Priority</p>
    <p>Point</p>
    <p>Tag</p>
    <p>Task</p>
  </div>
</template>

<script>
import axios from '@/axiosInstance';

export default {
  name: 'Home',
  props: {
    card: Object,
  },
  data() {
    return {
      editingName: false,
    };
  },
  methods: {
    saveName() {
      this.editingName = false;
      axios.post(
        '/card',
        this.card,
      );
    },
  },
};
</script>

<style lang="scss">
  #card {
    position: fixed;
    z-index: 500;
    background-color: white;
    width: 40%;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 16px 35px;
    left: 30%;
    top: 20%;
    box-sizing: border-box;
    transition: all 0.3s ease-out;
    p {
      white-space: normal;
    }
  }
</style>
