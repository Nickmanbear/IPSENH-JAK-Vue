<template>
  <div class="overview">
    <h1>Choose ur board</h1>
    <BoardPreview />
    <BoardPreview />
    <BoardPreview />
  </div>
</template>

<script>
// @ is an alias to /src
import BoardPreview from '@/components/BoardPreview.vue';

export default {
  name: 'Home',
  components: {
    BoardPreview,
  },
};
</script>
