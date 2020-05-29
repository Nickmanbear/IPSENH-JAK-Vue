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
