<template>
  <div>
    <div id="cardprev" @click="toggleCard">
      <p>{{ card.name }}</p>
      <button id="delete" @click="deleteCard">&times;</button>
    </div>
    <Backdrop v-if="show" @clicked="toggleCard"/>
    <Card v-if="show" v-bind:card="card" @close="toggleCard" @saved="$emit('saved')"/>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import Backdrop from '@/components/UI/Backdrop.vue';
import axios from '@/axiosInstance';

export default {
  name: 'CardPreview',
  components: {
    Backdrop,
    Card,
  },
  props: {
    card: {
      id: 0,
      columnId: 0,
      name: '',
      description: '',
      priority: '',
      points: null,
    },
  },
  data() {
    return {
      show: false,
      deleting: false,
    };
  },
  methods: {
    toggleCard() {
      if (!this.deleting) {
        this.show = !this.show;
      }
    },
    deleteCard() {
      this.deleting = true;
      axios.delete(`card/${this.card.id}`)
        .then(() => this.$emit('deleted'));
    },
  },
};
</script>

<style lang="scss">
  #cardprev {
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: 3px;
    padding: 0 8px;
    margin: 8px 0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    p {
      display: inline-block;
    }

    &:hover {
      background-color: #fbfbfb;
      box-shadow: none;
      cursor: pointer;
    }

    #delete {
      font-size: 1em;
      border: none;
      background-color: transparent;
      cursor: pointer;
      padding: 5px 10px;
      position: relative;
      float: right;
      color: #eee;
      margin: 5px 0;
      z-index: 10;

      &:hover {
        color: red;
        background-color: #f4f4f4;
        border-radius: 50%;
      }
    }
  }
</style>
