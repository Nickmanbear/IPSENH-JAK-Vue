<template>
  <div class="board">
    <h1 v-if="!editingName" @click="editingName = true">{{ board.name }}</h1>
    <div id="title" v-else>
      <input v-model="board.name" @keydown.enter="saveName" type="text">
      <button @click="saveName">save</button>
    </div>

    <div id="add-user-button" @click="addingUser = !addingUser">
      <span>+</span>
      <span> Add user</span>
    </div>

    <AddUser v-if="addingUser" v-bind:boardUsers="board.users"/>

    <div id="columns">
      <Column v-for="column in columns" :key="column.id" ref="columns"
              v-bind:column="column"
              @deleted="removeColumn()"/>
      <div id="createColumn">
        <p v-if="!editingNewColumn" @click="editingNewColumn = true">+ Add column</p>
        <input v-else v-model="newColumnName" type="text"
               @keydown.enter="createColumn" @keydown.esc="editingNewColumn = false">
        <button v-if="editingNewColumn" @click="createColumn()">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AddUser from '@/components/AddUser.vue';
import Column from '@/components/Column.vue';
import axios from '@/axiosInstance';
import stomp from '@/stompInstance';

export default {
  name: 'Home',
  components: {
    AddUser,
    Column,
  },
  data() {
    return {
      board: {
        id: 0,
        users: [],
        name: 'board1',
      },
      columns: [],
      editingName: false,
      editingNewColumn: false,
      newColumnName: '',
      addingUser: false,
    };
  },
  async mounted() {
    await this.getBoard();
    this.getColumns();
    this.stompSetup();
  },
  methods: {
    stompSetup() {
      stomp.onConnect = () => {
        stomp.subscribe(`/app/board/${this.$route.params.id}`, () => {
          this.$refs.columns.forEach((column) => {
            column.getCards();
          });
        });
      };
      stomp.activate();
    },
    getColumns() {
      axios.get(`/column/board/${this.$route.params.id}`)
        .then((response) => {
          this.columns = response.data;
        });
    },
    saveName() {
      this.editingName = false;
      axios.post(
        '/board',
        this.board,
      );
    },
    async getBoard() {
      this.board = await axios.get(`/board/${this.$route.params.id}`)
        .then((response) => response.data);
    },
    createColumn() {
      this.editingNewColumn = false;
      axios.post(
        '/column',
        {
          id: 0,
          board: this.board,
          name: this.newColumnName,
        },
      ).then((response) => {
        this.columns.push(response.data);
        this.newColumnName = '';
      });
    },
    removeColumn() {
      this.getColumns(); // TODO: Remove from array instead
    },
  },
};
</script>

<style lang="scss">
  .board {
    padding: 0 10px;

    h1 {
      padding: 0;
      margin: 0 0 5px 10px;
    }

    input {
      border: none;
      background-color: #f9f9f9;
      font-family: Arial, serif;
      font-size: 1em;
      margin: 8px 5px 8px 0;
    }

    button {
      border: none;
      font-size: 0.8em;
      padding: 3px 5px;
      margin: 0;
    }

    #title {
      input {
        font-size: 2em;
        font-weight: bold;
        margin: 0 5px 5px 10px;
      }

      button {
        font-size: 1em;
      }
    }
  }

  #add-user-button {
    position: fixed;
    top: 48px;
    right: 15px;
    width: calc(1em - 5px);
    height: calc(1em + 4px);
    overflow: hidden;
    font-size: 1em;
    text-align: center;
    color: #ccc;
    background-color: #eee;
    border: 1px solid #eee;
    border-radius: 50%;
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
      width: 80px;
      color: black;

      span:nth-child(2) {
        color: black;
        display: inline;
      }
    }
  }

  #columns {
    overflow: auto;
    white-space: nowrap;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    #createColumn {
      background-color: #f8f8f8;
      border: 1px solid #f8f8f8;
      border-radius: 4px;
      padding: 5px 10px;
      margin: 5px;
      display: inline-block;
      vertical-align: top;
      width: 240px;
      max-height: 80vh;
      color: #888;

      p {
        padding-left: 10px;
      }

      input {
        border: none;
        background-color: #f9f9f9;
        font-family: Arial, serif;
        font-size: 1.5em;
        font-weight: bold;
        margin: 8px 5px 8px 0;
        width: 80%;
      }
    }
  }
</style>
