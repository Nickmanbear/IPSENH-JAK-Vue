<template>
  <div id="column">
    <h2 v-if="!editingName" @click="editingName = true">{{ column.name }}</h2>
    <input id="column-name" v-else v-model="column.name" @keydown.enter="saveName"
           @keydown.esc="editingName = false" type="text">
    <button v-if="editingName" @click="saveName">save</button>

    <button id="delete" @click="deleteColumn">&times;</button>
    <hr>
    <div id="cards">
      <draggable v-model="cards" group="cards" @add="moveCard($event)">
        <CardPreview v-for="card in cards" :key="card.id" v-bind:card="card"
              @deleted="removeCard(card)" @saved="getCards"/>
      </draggable>
    </div>

    <button id="create" v-if="!creatingCard" @click="creatingCard = true">+ Add card</button>
    <input v-else
      v-model="newCardName"
      @keydown.enter="createCard" @keydown.esc="creatingCard = false"
      type="text">
    <button v-if="creatingCard" @click="createCard">save</button>
  </div>
</template>

<script>
// @ is an alias to /src
import CardPreview from '@/components/CardPreview.vue';
import draggable from 'vuedraggable';
import axios from '@/axiosInstance';
import stomp from '@/stompInstance';

export default {
  name: 'Column',
  components: {
    draggable,
    CardPreview,
  },
  props: {
    column: Object,
  },
  data() {
    return {
      cards: [],
      newCardName: '',
      editingName: false,
      creatingCard: false,
    };
  },
  mounted() {
    this.getCards();
  },
  methods: {
    getCards() {
      axios.get(`/card/column/${this.column.id}`)
        .then((response) => {
          this.cards = response.data;
        });
    },
    deleteColumn() {
      axios.delete(`column/${this.column.id}`)
        .then(() => this.$emit('deleted'));
    },
    saveName() {
      this.editingName = false;
      this.column.board = { id: this.column.board.id };
      axios.post(
        '/column',
        this.column,
      ).then((response) => {
        this.column = response.data;
      });
    },
    createCard() {
      this.creatingCard = false;
      if (this.newCardName.length > 0) {
        axios.post(
          '/card',
          {
            id: 0,
            column: { id: this.column.id },
            name: this.newCardName,
            description: '',
            priority: '',
            points: null,
          },
        ).then((response) => {
          this.cards.push(response.data);
          this.newCardName = '';
          this.$emit('columnUpdate');
        });
      }
    },
    removeCard(removedCard) {
      this.cards = this.cards.filter((card) => card !== removedCard);
    },
    moveCard(event) {
      // eslint-disable-next-line no-underscore-dangle
      const card = event.item._underlying_vm_;
      card.column = { id: this.column.id };
      axios.post('/card', card).then(() => {
        stomp.send(`/app/board/${this.$route.params.id}`);
        this.$emit('columnUpdate');
      });
    },
  },
};
</script>

<style lang="scss">
  #column {
    padding: 5px 10px;
    margin: 5px;
    display: inline-block;
    vertical-align: top;
    width: 240px;
    max-height: 80vh;

    h2 {
      margin: 5px 0;
      display: inline-block;
    }

    #cards {
      max-height: 70vh;
      overflow: scroll;
      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    #column-name {
      border: none;
      background: none;
      font-family: Arial, serif;
      font-size: 1.5em;
      font-weight: bold;
      margin: 5px 5px 5px 0;
      width: 80%;
      border-radius: 4px;
      padding: 3px;
    }

    button {
      border: none;
      font-size: 0.8em;
      padding: 3px 5px;
      margin: 0;
    }

    #delete {
      font-size: 1em;
      border: none;
      background-color: transparent;
      cursor: pointer;
      padding: 5px 10px;
      position: relative;
      float: right;
      color: black;
      top: 5px;
      border-radius: 50%;
      transition: all 0.1s;

      &:hover {
        color: red;
        background-color: #f4f4f4;
        opacity: 0.85;
        border-radius: 50%;
      }
    }

    #create {
      color: black;
      background-color: transparent;
      padding: 10px 5px;
    }

    input {
      border-radius: 4px;
    }
  }
</style>
