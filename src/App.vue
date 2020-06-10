<template>
  <div id="app">
    <Navigation />
    <router-view/>
    <img id="background" v-bind:src="img" alt="background image">
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
  mounted() {
    const images = ['fujiWithSakura.jpg', 'fujiWithTemple.jpg'];

    const count = Math.trunc(Math.random() * images.length);
    this.img = `${this.publicPath}images/${images[count]}`;
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
  color: black;

  #background {
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    min-height: 100vh;
    min-width: 100vw;
    opacity: 75%;
  }

  textarea:focus, input:focus, button:active {
    outline: none;
  }
}
</style>
