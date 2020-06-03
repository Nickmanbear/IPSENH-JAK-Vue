<template>
  <div id="add-user">
    <input v-model="selectedUsername" type="text" placeholder="Username" list="user-list">
    <datalist id="user-list" v-if="selectedUsername">
      <option v-for="user in users" :key="user.id" :value="user.username"/>
    </datalist>
    <button @click="addUser">Add to board</button>

    <p>Current users:</p>
    <p id="users" v-for="user in boardUsers" :key="user.id"
       @click="() => deleteUser(user.id)">{{ user.username }}</p>
  </div>
</template>

<script>
import axios from '@/axiosInstance';

export default {
  name: 'AddUser',
  props: {
    boardUsers: {},
  },
  data() {
    return {
      users: [],
      selectedUsername: '',
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios.get('/user').then((response) => {
        this.users = Object.keys(response.data)
          .map((key) => (
            { id: key, username: response.data[key] }
          ));
      });
    },
    addUser() {
      const selectedUser = this.users.find(
        (user) => user.username === this.selectedUsername,
      );
      if (!selectedUser) {
        alert('This user doesn\'t exist.');
        return;
      }

      const userId = selectedUser.id;
      const boardId = parseInt(this.$route.params.id, 10);

      axios.post(`board/user/${boardId}/${userId}`)
        .then(() => {
          this.boardUsers.push(selectedUser);
          this.selectedUsername = '';
        });
    },
    deleteUser(userId) {
      const boardId = parseInt(this.$route.params.id, 10);
      axios.delete(`/board/user/${boardId}/${userId}`)
        .then(() => {
          this.$emit('refresh');
        });
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

  #users:hover {
    text-decoration: line-through;
    cursor: pointer;
  }
}
</style>
