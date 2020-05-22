<template>
  <div id="card">
    <button id="close" @click="$emit('close')">&times;</button>

    <h3 v-if="editing !== 'name'" @click="editing = 'name'">{{ card.name }}</h3>
    <input id="name" v-else v-model="card.name" @keydown.enter="save" type="text">
    <button v-if="editing === 'name'" @click="save">save</button>
    <br  v-if="editing === 'name'">

    <span @click="editing = 'priority'">Priority: </span>
    <span v-if="editing !== 'priority'" @click="editing = 'priority'">{{ card.priority }}</span>
    <input v-else v-model="card.priority" @keydown.enter="save" type="text">
    <button v-if="editing === 'priority'" @click="save">save</button>

    <span> - </span>

    <span @click="editing = 'points'">Points: </span>
    <span v-if="editing !== 'points'" @click="editing = 'points'">{{ card.points}}</span>
    <input v-else v-model="card.points" @keydown.enter="save" type="number">
    <button v-if="editing === 'points'" @click="save">save</button>

    <p @click="editing = 'description'"><strong>Description</strong></p>
    <div v-if="editing !== 'description'" @click="editing = 'description'">
      <p v-if="!card.description">Add a description..</p>
      <p>{{ card.description }}</p>
    </div>
    <textarea v-else v-model="card.description" @keydown.enter="save" rows="3"/>
    <div v-if="editing === 'description'">
      <button @click="save">save</button><br><br>
    </div>
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
      editing: null,
    };
  },
  methods: {
    save() {
      this.editing = null;
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

    p, span, h3 {
      white-space: normal;
      word-break: break-word;
      cursor: pointer;
    }

    input, textarea {
      border: none;
      background-color: #f4f4f4;
      font-family: Arial, serif;
      font-size: 1em;
      margin-right: 5px;
    }

    #name {
      font-weight: bold;
      font-size: 1.2em;
      margin: 20px 5px 20px 0;
    }

    textarea {
      width: 100%;
      resize: vertical;
      margin: 0;
    }

    button {
      border: none;
      font-size: 0.8em;
      padding: 3px 5px;
      margin: 0;
    }

    #close {
      font-size: 1em;
      border: none;
      background-color: transparent;
      cursor: pointer;
      padding: 5px 10px;
      position: absolute;
      top: 10px;
      right: 10px;
    }

    #close:hover {
      color: red;
      background-color: #f4f4f4;
      border-radius: 50%;
    }
  }
</style>
