<template>
<h1>By by</h1>
</template>

<script>
export default {
  name: 'Logout',
  mounted() {
    this.$store.dispatch('logout').then(() => {
      this.$router.push('/');
    });
  },

};
</script>

<style scoped>

</style>
