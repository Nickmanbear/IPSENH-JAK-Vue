<template>
  <div id="teams">
    <h1>Teams</h1>

    <input v-model="newTeamName" type="text" placeholder="Team name" @keydown.enter="createTeam">
    <button @click="createTeam()">Make team</button>

    <Team v-for="team in teams"
          :key="team.id"
          v-bind:team="team"
          v-bind:users="users"
          v-bind:username="myUsername"
          v-on:refresh="getTeams"/>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from '@/axiosInstance';
import Team from '@/components/Team.vue';

export default {
  name: 'Teams',
  components: {
    Team,
  },
  data() {
    return {
      myUsername: '',
      teams: [],
      users: [],
      newTeamName: '',
      editingName: false,
      selectedMemberName: '',
    };
  },
  mounted() {
    this.getTeams();
    this.getUsers();
    this.getMyUsername();
  },
  methods: {
    getTeams() {
      axios.get('/team')
        .then((response) => {
          this.teams = response.data;
        });
    },
    getUsers() {
      axios.get('/user')
        .then((response) => {
          this.users = Object.keys(response.data)
            .map((key) => (
              { id: key, username: response.data[key] }
            ));
        });
    },
    getMyUsername() {
      axios.get('/user/me')
        .then((response) => {
          this.myUsername = response.data.username;
        });
    },
    createTeam() {
      const team = {
        id: 0,
        name: this.newTeamName,
      };
      this.newTeamName = '';

      axios.post('/team', team)
        .then((response) => {
          this.teams.push(response.data);
        });
    },
  },
};
</script>

<style lang="scss">
  #teams {
    position: fixed;
    top: 85px;
    right: 15px;
    z-index: 50;
    min-width: 320px;
    max-height: 80vh;
    overflow: scroll;
    border-radius: 4px;
    padding: 15px 20px;
    background-color: #ccc;
    border: 1px solid #ccc;
    /*opacity: 80%;*/
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    h1 {
      margin: 0;
    }

    button {
      border: none;
      font-size: 0.8em;
      padding: 3px 5px;
      margin: 0;

      &:hover {
        cursor: pointer;
      }
    }

    input {
      border: none;
      background-color: #eee;
      font-family: Arial, serif;
      font-size: 1em;
      margin: 8px 5px 8px 0;
    }
  }
</style>
