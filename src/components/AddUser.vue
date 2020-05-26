<template>
  <div id="add-user">
    <input v-model="selectedUsername" type="text" placeholder="Username" list="user-list">
    <datalist id="user-list">
      <option v-for="user in users" :key="user.id" :value="user.username"/>
    </datalist>
    <button @click="addUser">Add to board</button>
  </div>
</template>

<script>
import axios from '../axiosInstance';

export default {
  name: 'Home',
  props: {
    boardId: null,
  },
  data() {
    return {
      users: [],
      selectedUsername: '',
    };
  },
  mounted() {
    axios.get('/user').then((response) => {
      this.users = response.data
        .map((user) => (
          { id: user.id, username: user.username }
        ));
    });
  },
  methods: {
    addUser() {
      const selectedUser = this.users.find(
        (user) => user.username === this.selectedUsername,
      );
      const toSend = {
        userId: selectedUser.id,
        boardId: parseInt(this.$route.params.id, 10),
      };
      console.log(toSend); // TODO: send to backend
    },
  },
};
</script>

<style lang="scss">
#add-user {
  position: fixed;
  top: 85px;
  right: 15px;
  z-index: 50;
  border-radius: 4px;
  padding: 5px 10px;
  background-color: #ccc;
  border: 1px solid #ccc;
}
</style>
