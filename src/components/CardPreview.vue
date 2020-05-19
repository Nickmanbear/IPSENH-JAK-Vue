<template>
  <div>
    <div id="cardprev">
      <p @click="toggleCard">{{ card.name }}</p>
      <button @click="deleteCard">X</button>
    </div>
    <Backdrop v-if="show" @clicked="toggleCard"/>
    <Card v-if="show" v-bind:card="card"/>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import Backdrop from '@/components/UI/Backdrop.vue';
import axios from '@/axiosInstance';

export default {
  name: 'Home',
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
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    toggleCard() {
      this.show = !this.show;
    },
    deleteCard() {
      axios.delete(`card/${this.card.id}`).then(() => this.$emit('deleted'));
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
    box-shadow: 1px 1px 2px -1px rgba(0,0,0,0.5);

    p {
      display: inline-block;

      &:hover {
        cursor: pointer;
      }
    }

    &:hover {
      background-color: #fbfbfb;
      border: 1px solid #ddd;
      box-shadow: none;
    }
  }
</style>
