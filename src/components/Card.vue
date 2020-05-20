<template>
  <div id="card">
    <h3 v-if="!editing.name" @click="edit('name')">{{ card.name }}</h3>
    <input v-else v-model="card.name" @keydown.enter="save" type="text">
    <button v-if="editing.name" @click="save">save</button>

    <p v-if="!editing.description" @click="edit('description')">{{ card.description }}</p>
    <input v-else v-model="card.description" @keydown.enter="save" type="text">
    <button v-if="editing.description" @click="save">save</button>

    <p v-if="!editing.priority" @click="edit('priority')">Priority: {{ card.priority }}</p>
    <input v-else v-model="card.priority" @keydown.enter="save" type="text">
    <button v-if="editing.priority" @click="save">save</button>

    <p v-if="!editing.points" @click="edit('points')">Points: {{ card.points}}</p>
    <input v-else v-model="card.points" @keydown.enter="save" type="number">
    <button v-if="editing.points" @click="save">save</button>

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
      editing: {
        name: false,
        description: false,
        priority: false,
        points: false,
      },
    };
  },
  methods: {
    edit(obj) {
      this.editing.name = false;
      this.editing.description = false;
      this.editing.priority = false;
      this.editing.points = false;
      this.editing[obj] = true;
    },
    save() {
      this.editing.name = false;
      this.editing.description = false;
      this.editing.priority = false;
      this.editing.points = false;
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
