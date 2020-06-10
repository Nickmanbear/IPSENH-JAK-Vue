<template>
  <div class="board">
    <h1 class="title" v-if="!editingName" @click="editingName = true">{{ board.name }}</h1>
    <div class="title" v-else>
      <input v-model="board.name" @keydown.enter="saveName" type="text">
      <button @click="saveName">save</button>
    </div>

    <div id="add-user-button" @click="addingUser = !addingUser">
      <span>+</span>
      <span> Add user</span>
    </div>

    <AddUser v-if="addingUser"
             v-bind:boardUsers="board.users"
             v-bind:boardTeam="board.team"
             v-on:refresh="getBoard"/>

    <div id="timeline">
      <h2>Timeline</h2>
      <p class="event" v-for="event in timeline" :key="event.id">
        <span>{{
          new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'medium' })
          .format(new Date(event.timestamp))
        }}</span>:
        <br>
        <span>{{ event.card.name }}</span> moved from
        <span>{{ event.fromColumn.name }}</span> to
        <span>{{ event.toColumn.name }}</span>
      </p>
    </div>

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
      <div id="burndown">
        <h2>Burndown</h2>
        <burndown v-if="allCards.length >0 && timeline.length > 0 && doneCards.length >0 "
                  v-bind:doneCards="doneCards"
                  v-bind:allCards="allCards" v-bind:events="timeline"></burndown>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AddUser from '@/components/AddUser.vue';
import Column from '@/components/Column.vue';
import Burndown from '@/components/Burndown.vue';
import axios from '@/axiosInstance';
import stomp from '@/stompInstance';

export default {
  name: 'Board',
  components: {
    Burndown,
    AddUser,
    Column,
  },
  data() {
    return {
      board: {
        id: 0,
        users: [],
        name: '',
      },
      columns: [],
      timeline: [],
      editingName: false,
      editingNewColumn: false,
      newColumnName: '',
      addingUser: false,
      doneCards: [],
      allCards: [],
    };
  },
  async mounted() {
    this.stompSetup();
    await this.getBoard();
    this.getColumns();
    this.getTimeline();
    this.getAllCards();
    this.getLastColumnCards();
  },
  methods: {
    stompSetup() {
      // eslint-disable-next-line quote-props
      stomp.connect({}, () => {
        stomp.subscribe(`/app/board/${this.$route.params.id}`, () => {
          this.getTimeline();
          this.$refs.columns.forEach((column) => {
            column.getCards();
          });
        });
      },
      () => {
        this.stompSetup();
      });
    },
    getColumns() {
      axios.get(`/column/board/${this.$route.params.id}`)
        .then((response) => {
          this.columns = response.data;
        });
    },
    getTimeline() {
      axios.get(`/board/timeline/${this.$route.params.id}`)
        .then((response) => {
          this.timeline = response.data;
        });
    },
    saveName() {
      this.editingName = false;
      const postUsers = [];
      this.board.users.forEach((user) => {
        postUsers.push({ id: user.id });
      });
      this.board.users = postUsers;
      axios.post(
        '/board',
        this.board,
      ).then((response) => {
        this.board = response.data;
      });
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
          board: { id: this.board.id },
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
    getAllCards() {
      axios.get(`/card/board/${this.$route.params.id}`)
        .then((response) => {
          this.allCards = response.data;
        });
    },
    getLastColumnCards() {
      axios.get(`/column/board/${this.$route.params.id}/last/`)
        .then((response) => {
          axios.get(`/card/column/${response.data[0].id}`).then((cardResponse) => {
            this.doneCards = cardResponse.data;
          });
        });
    },
  },
};
</script>

<style lang="scss">
  .board {
    display: grid;
    grid: auto 1fr / 1fr auto;
    grid-template-areas:
      "header timeline"
      "columns timeline";
    padding: 0 10px;
    max-height: calc(100vh - 34px);

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

      &:hover {
        cursor: pointer;
      }
    }

    .title {
      grid-area: header;

      input {
        font-size: 2em;
        font-weight: bold;
        margin: 0 5px 5px 10px;
      }

      button {
        font-size: 1em;
      }
    }

    #timeline {
      grid-area: timeline;
      overflow-y: scroll;
      padding: 0 4px;

      &::-webkit-scrollbar {
        display: none;
      }

      .event {
        background-color: #eee;
        border: 1px solid #eee;
        border-radius: 3px;
        padding: 8px;
        margin: 8px 0;
        box-shadow: 1px 1px 2px -1px rgba(0,0,0,0.5);

        span {
          font-weight: bold;
        }
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
      width: 80px;
      color: black;

      span:nth-child(2) {
        color: black;
        display: inline;
      }
    }
  }

  #columns {
    grid-area: columns;
    overflow: scroll;
    white-space: nowrap;

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
      opacity: 50%;

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
