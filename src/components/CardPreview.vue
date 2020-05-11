<template>
  <div>
    <div id="cardprev" v-on:click="toggleCard">
      <p>{{ card.name }}</p>
    </div>
    <Backdrop v-show="show" v-on:clicked="toggleCard"/>
    <Card v-show="show" v-bind:card="card"/>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import Backdrop from '@/components/UI/Backdrop.vue';

export default {
  name: 'Home',
  components: {
    Backdrop,
    Card,
  },
  props: {
    card: Object,
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
  }

  #cardprev:hover {
    cursor: pointer;
    background-color: #fbfbfb;
    border: 1px solid #ddd;
    box-shadow: none;


  }
</style>
