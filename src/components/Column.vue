<template>
  <div id="column">
    <h2 v-if="!editingName" @click="editingName = true">{{ column.name }}</h2>
    <input v-else v-model="column.name" @keydown.enter="saveName" type="text">
    <button v-if="editingName" @click="saveName">save</button>
    <button @click="deleteColumn">X</button>
    <div id="cards">
      <Card v-for="card in cards" :key="card.id" v-bind:card="card" @deleted="removeCard()" />
    </div>
    <button v-if="!creatingCard" @click="creatingCard = true">+ Add card</button>
    <input v-else
      v-model="newCardName"
      @keydown.enter="createCard" @keydown.esc="creatingCard = false"
      type="text">
    <button v-if="creatingCard" @click="createCard">save</button>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/CardPreview.vue';
import axios from '@/axiosInstance';

export default {
  name: 'Home',
  components: {
    Card,
  },
  props: {
    column: {
      id: 0,
      boardId: 0,
      name: '',
    },
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
        })
        .catch((error) => {
          // TODO: maak een foutmelding ofzo
          console.log(error);
        });
    },
    deleteColumn() {
      axios.delete(`column/${this.column.id}`).then(() => this.$emit('deleted'));
    },
    saveName() {
      this.editingName = false;
      axios.post(
        '/column',
        this.column,
      );
    },
    createCard() {
      this.creatingCard = false;
      if (this.newCardName.length > 0) {
        axios.post(
          '/card',
          {
            id: 0,
            columnId: this.column.id,
            name: this.newCardName,
            description: '',
          },
        ).then((response) => {
          this.cards.push(response.data);
          this.newCardName = '';
        });
      }
    },
    removeCard() {
      this.getCards(); // TODO: Remove from array instead
    },
  },
};
</script>

<style lang="scss">
  #column {
    background-color: #eee;
    border: 1px solid #eee;
    border-radius: 3px;
    padding: 5px 10px;
    margin: 5px;
    display: inline-block;
    vertical-align: top;
    width: 240px;
    max-height: 80vh;
  }

  h2 {
    margin: 5px 0;
    display: inline-block;
  }

  #cards {
    max-height: 70vh;
    overflow: scroll;
    -ms-overflow-style: none;
  }

  #cards::-webkit-scrollbar {
    display: none;
  }
</style>
