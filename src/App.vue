<template>
  <div id="app">
    <Navigation />
    <br>
    <router-view/>
    <img v-bind:src="imgUrl">
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
      imgUrl: '',
    };
  },
  mounted() {
    const images = [
      'https://www.departures.com/sites/default/files/styles/responsive_900x600/'
      + 'public/1577142212/chureito-pagoda-MTFUJI1219.jpg?itok=Z9hDcHlz',
      'https://i.ytimg.com/vi/o4Nw1VgqhnA/maxresdefault.jpg',
    ];
    const count = Math.trunc(Math.random() * 2);

    this.imgUrl = images[count];
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
    height: 100vh;
    opacity: 75%;
    /*background-size: cover;*/
  }
}
</style>
