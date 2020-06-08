<template>
  <div id="app">
    <Navigation />
    <router-view/>
    <img v-bind:src="imgUrl" alt="background image">
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';

export default {
  name: 'App',
  components: {
    Navigation,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      img: '',
    };
  },
  computed: {
    imgUrl() {
      return `${this.publicPath}images/${this.img}`;
    },
  },
  mounted() {
    const images = ['MtFujiWithTemple.jpg', 'MtFujiWithLake.jpg'];

    const count = Math.trunc(Math.random() * 2);
    this.img = images[count];
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;

  img {
    z-index: -1;
    position: fixed;
    overflow: hidden;
    /*top: -85%;*/
    top: 0;
    left: 0;
    min-height: 100vh;
    min-width: 100vw;
    opacity: 75%;
    /*background-size: cover;*/
  }
}
</style>
