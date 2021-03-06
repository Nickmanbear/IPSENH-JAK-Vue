<template>
  <div class="board">
    <h1 class="title" v-if="!editingName" @click="editingName = true">{{ board.name }}</h1>
    <div class="title" v-else>
      <input id="board-name" v-model="board.name" @keydown.esc="editingName = false"
             @keydown.enter="saveName" type="text">
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

    <Timeline v-bind:timeline="timeline"/>

    <div id="columns">
      <Column v-on:columnUpdate="listenerColumn" v-for="column in columns" :key="column.id"
              ref="columns"
              v-bind:column="column"
              @deleted="removeColumn(column)"/>
      <div id="create-column" v-bind:class="{changing: editingNewColumn}">
        <p v-if="!editingNewColumn" @click="editingNewColumn = true">+ Add column</p>
        <input v-else v-model="newColumnName" type="text"
               @keydown.enter="createColumn" @keydown.esc="editingNewColumn = false">
        <button v-if="editingNewColumn" @click="createColumn()">Add</button>
        <hr>
      </div>
      <div id="burndown">
        <burndown v-if="allCards.length && timeline.length && doneCards.length && renderComponent"
                  v-bind:doneCards="doneCards"
                  v-bind:allCards="allCards"
                  v-bind:timeline="timeline"
                  v-bind:render="renderComponent"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AddUser from '@/components/AddUser.vue';
import Column from '@/components/Column.vue';
import Timeline from '@/components/Timeline.vue';
import Burndown from '@/components/Burndown.vue';
import axios from '@/axiosInstance';
import stomp from '@/stompInstance';

export default {
  name: 'Board',
  components: {
    Burndown,
    AddUser,
    Column,
    Timeline,
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
      renderComponent: true,
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
          response.data.sort((a, b) => (a.timestamp < b.timestamp) - (a.timestamp > b.timestamp));
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
      )
        .then((response) => {
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
      )
        .then((response) => {
          this.columns.push(response.data);
          this.newColumnName = '';
        });
    },
    removeColumn(removedColumn) {
      this.columns = this.columns.filter((column) => column !== removedColumn);
    },
    async getAllCards() {
      axios.get(`/card/board/${this.$route.params.id}`)
        .then((response) => {
          this.allCards = response.data;
          this.renderComponent = false;
          this.showBurndown();
        });
    },
    async getLastColumnCards() {
      axios.get(`/column/board/${this.$route.params.id}/last/`)
        .then((response) => {
          axios.get(`/card/column/${response.data[0].id}`)
            .then((cardResponse) => {
              this.doneCards = cardResponse.data;
              this.renderComponent = false;
              this.showBurndown();
            });
        });
    },
    forceRerender() {
      this.renderComponent = false;
      this.getAllCards();
      this.getLastColumnCards();
    },
    showBurndown() {
      this.renderComponent = true;
    },
    listenerColumn() {
      this.forceRerender();
    },
  },
};
</script>

<style lang="scss">
  .board {
    display: grid;
    grid: auto 1fr / 1fr auto;
    grid-template-areas: "header timeline" "columns timeline";
    padding: 0 10px;
    max-height: calc(100vh - 34px);

    h1 {
      padding: 0 0 0 5px;
    }

    input {
      border: none;
      background-color: #eee;
      font-family: Arial, serif;
      font-size: 1em;
      margin: 8px 5px 8px 0;
    }

    #board-name {
      background: none;
      margin: 18px 5px !important;
      border-radius: 4px;
      padding: 3px;
    }

    button {
      border: none;
      font-size: 0.8em;
      padding: 3px 5px;
      margin: 0;
      border-radius: 4px;

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
        border-radius: 4px;
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
    color: white;
    background-color: #d37b33;
    border: 1px solid #d37b33;
    border-radius: 50px;
    padding: 5px 10px;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s ease-out;

    span:nth-child(2) {
      color: transparent;
      display: block;
      right: -200px;
    }

    &:hover {
      border-radius: 4px;
      width: 80px;
      background-color: #aa5a25;
      border-color: #aa5a25;

      span:nth-child(2) {
        color: white;
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

    #create-column {
      margin: 5px;
      display: inline-block;
      vertical-align: top;
      width: 240px;
      max-height: 80vh;
      color: black;
      opacity: 0.5;
      transition: all 0.2s ease-out;

      p {
        padding-left: 10px;
      }

      input {
        border: none;
        background: none;
        font-family: Arial, serif;
        font-size: 1.5em;
        font-weight: bold;
        margin: 8px 5px 5px 0;
        width: 80%;
      }

      &:hover {
        opacity: 1;
      }
    }

    input {
      border-radius: 4px;
    }
  }

  .changing {
    opacity: 1 !important;
    box-shadow: none;
  }
</style>
