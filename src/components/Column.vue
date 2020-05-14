<template>
  <div id="column">
    <h2>{{ column.name }}</h2>
    <div id="cards">
      <Card v-for="card in cards" :key="card.id" v-bind:card="card" />
    </div>
    <a>+ Add card</a>
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
    column: Object,
  },
  data() {
    return {
      cards: [],
    };
  },
  mounted() {
    this.getCards();
  },
  methods: {
    getCards() {
      axios.get('/card')
        .then((response) => {
          this.cards = [];
          response.data.forEach((card) => {
            if (card.columnId === this.column.id) {
              this.cards.push(card);
            }
          });
        })
        .catch((error) => {
          // TODO: maak een foutmelding ofzo
          console.log(error);
        });
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
