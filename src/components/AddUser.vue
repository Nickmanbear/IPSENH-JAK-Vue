<template>
  <div id="add-user">
    <div id="toggle">
      <p @click="toggleIsUsers = !toggleIsUsers" v-bind:class="{ active:toggleIsUsers }">Users</p>
      <p @click="toggleIsUsers = !toggleIsUsers" v-bind:class="{ active:!toggleIsUsers }">Team</p>
    </div>

    <div v-if="toggleIsUsers">
      <input v-model="selectedUsername" type="text" placeholder="Username" list="user-list">
      <datalist id="user-list" v-if="selectedUsername">
        <option v-for="user in users" :key="user.id" :value="user.username"/>
      </datalist>
      <button @click="addUser">Add to board</button>

      <p v-if="boardUsers">Current users:</p>
      <p class="deletable" v-for="user in boardUsers" :key="user.id"
         @click="() => deleteUser(user.id)">{{ user.username }}</p>
    </div>

    <div v-else>
      <input v-model="selectedTeamName" type="text" placeholder="Team name" list="team-list">
      <datalist id="team-list" v-if="selectedTeamName">
        <option v-for="team in teams" :key="team.id" :value="team.name"/>
      </datalist>
      <button @click="addTeam">Add to board</button>

      <p v-if="boardTeam">Current team:</p>
      <p class="deletable" v-if="boardTeam" @click="deleteTeam">{{ boardTeam.name }}</p>
    </div>
  </div>
</template>

<script>
import axios from '@/axiosInstance';

export default {
  name: 'AddUser',
  props: {
    boardUsers: {},
    boardTeam: {},
  },
  data() {
    return {
      toggleIsUsers: true,
      users: [],
      teams: [],
      selectedUsername: '',
      selectedTeamName: '',
    };
  },
  mounted() {
    this.getUsers();
    this.getTeams();
  },
  methods: {
    getUsers() {
      axios.get('/user')
        .then((response) => {
          this.users = Object.keys(response.data)
            .map((key) => {
              if (!this.userOnBoard(response, key)) {
                return { id: key, username: response.data[key] };
              }
              return null;
            });
          this.users = this.users.filter((user) => (user !== null));
        });
    },
    userOnBoard(response, key) {
      return this.boardUsers.find(
        (user) => user.username === response.data[key],
      );
    },
    getTeams() {
      axios.get('/team')
        .then((response) => {
          this.teams = response.data;
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
          this.$emit('refresh');
          this.selectedUsername = '';
        });
    },
    addTeam() {
      const selectedTeam = this.teams.find(
        (team) => team.name === this.selectedTeamName,
      );
      if (!selectedTeam) {
        alert('This team doesn\'t exist.');
        return;
      }
      const teamId = selectedTeam.id;
      const boardId = parseInt(this.$route.params.id, 10);

      axios.post(`board/team/${boardId}/${teamId}`)
        .then(() => {
          this.$emit('refresh');
          this.selectedTeamName = '';
        });
    },
    deleteUser(userId) {
      const boardId = parseInt(this.$route.params.id, 10);
      axios.delete(`/board/user/${boardId}/${userId}`)
        .then(() => {
          this.$emit('refresh');
        });
    },
    deleteTeam() {
      const boardId = parseInt(this.$route.params.id, 10);
      axios.delete(`/board/team/${boardId}`)
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
  z-index: 90;
  border-radius: 4px;
  padding: 5px 10px;
  background-color: white;
  border: 1px solid white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

  .deletable:hover {
    text-decoration: line-through;
    cursor: pointer;
  }

  #toggle {
    text-align: center;
    padding: 5px;
    margin: 5px 0;
    background-color: #eee;
    border: 1px solid #eee;
    border-radius: 4px;

    p {
      display: inline;
      margin: 35px;
      color: #ddd;
      cursor: pointer;

      &:hover {
        color: #2c3e50;
      }
    }

    input, button {
      border-radius: 4px;
      background-color: #eee;
    }

    .active {
      color: #2c3e50;
    }
  }
}
</style>
