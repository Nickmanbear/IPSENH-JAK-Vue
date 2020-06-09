<template>
  <div id="card">
    <button id="close" @click="$emit('close')">&times;</button>

    <div>
      <h3 v-if="editing !== 'name'" @click="editing = 'name'">{{ card.name }}</h3>
      <input id="name" v-else v-model="card.name" @keydown.enter="save" type="text">
      <button v-if="editing === 'name'" @click="save">save</button>
      |
      <span v-if="card.assignedUser" @click="switchAssigning">
        {{ card.assignedUser.username }}
      </span>
      <span v-else id="assign-user-button" @click="switchAssigning">
        <span>+</span>
        <span> Assign user</span>
      </span>

      <div id="assign-user-list" v-if="assigningUser">
        <p @click="assignUser(0)">None</p>
        <p v-for="user in card.column.board.users" :key="user.id" @click="assignUser(user.id)">
          {{ user.username }}
        </p>
      </div>
    </div>

    <div>
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
  </div>
</template>

<script>
import axios from '@/axiosInstance';

export default {
  name: 'Card',
  props: {
    card: Object,
  },
  data() {
    return {
      editing: null,
      assigningUser: false,
    };
  },
  methods: {
    async switchAssigning() {
      if (!this.card.column.board || !this.card.column.board.users) {
        this.card.column.board = await axios.get(`/board/${this.$route.params.id}`)
          .then((response) => response.data);
      }
      this.assigningUser = !this.assigningUser;
    },
    assignUser(userId) {
      this.assigningUser = false;
      this.card.assignedUser = userId ? { id: userId } : null;
      this.save();
    },
    save() {
      this.editing = null;
      this.card.column = { id: this.card.column.id };
      this.card.assignedUser = this.card.assignedUser ? { id: this.card.assignedUser.id } : null;
      axios.post(
        '/card',
        this.card,
      ).then(() => this.$emit('saved'));
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

    h3 {
      display: inline-block;
    }

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
      color: #ccc;
      background-color: transparent;
      cursor: pointer;
      padding: 5px 10px;
      position: absolute;
      top: 10px;
      right: 10px;

      &:hover {
        color: red;
        background-color: #f4f4f4;
        border-radius: 50%;
      }
    }

    #assign-user-list {
      position: absolute;
      left: 75%;
      top: 2rem;
      z-index: 50;
      border-radius: 4px;
      padding: 4px;
      background-color: #ccc;

      p {
        margin: 0;
        padding: 4px;
        border-radius: 4px;

        &:hover {
          background-color: #eee;
        }
      }
    }

    #assign-user-button {
      display: inline-block;
      position: relative;
      top: 10px;
      width: calc(1rem - 5px);
      height: calc(1rem + 4px);
      overflow: hidden;
      font-size: 1em;
      text-align: center;
      color: #ccc;
      background-color: #eee;
      border: 1px solid #eee;
      border-radius: 50px;
      padding: 5px 10px;
      cursor: pointer;
      transition: all 0.3s ease-out;

      span:nth-child(2) {
        color: transparent;
        display: block;
        right: -200px;
      }

      &:hover {
        border-radius: 4px;
        width: 6.4rem;
        color: black;

        span:nth-child(2) {
          color: black;
          display: inline;
        }
      }
    }
  }
</style>
