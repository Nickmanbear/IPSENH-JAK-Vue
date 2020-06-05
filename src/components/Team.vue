<template>
  <div id="team">
    <button v-if="!editingName && isLeader" id="delete" @click="deleteTeam">&times;</button>
    <h2 v-if="!editingName" @click="editingName = true">{{ team.name }}</h2>
    <input id="team-name" v-else v-model="team.name" @keydown.enter="saveTeam" type="text">
    <button v-if="editingName" @click="saveTeam">save</button>

    <div v-if="isLeader">
      <input v-model="selectedMemberName" type="text" placeholder="Username" list="user-list">
      <datalist id="user-list" v-if="selectedMemberName">
        <option v-for="user in filteredUsers" :key="user.id" :value="user.username"/>
      </datalist>
      <button @click="addMember">Add member</button>
    </div>

      <p v-for="member in team.members" :key="member.id"
         v-bind:class="{ memberName: isLeader }"
         @click="() => deleteMember(member.id)">{{ member.username }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from '@/axiosInstance';

export default {
  name: 'Team',
  props: {
    team: {
      id: 0,
      name: '',
      leader: {},
      members: [],
    },
    users: {},
    username: String,
  },
  data() {
    return {
      isLeader: true,
      editingName: false,
      selectedMemberName: '',
    };
  },
  computed: {
    filteredUsers() {
      let temporaryUsers = this.users
        .map((user) => {
          if (!this.userInTeam(user)) {
            return user;
          }
          return null;
        });
      temporaryUsers = temporaryUsers.filter((user) => (user !== null));
      return temporaryUsers;
    },
  },
  mounted() {
    this.isLeader = this.team.leader.username === this.username;
  },
  methods: {
    userInTeam(user) {
      return this.team.members.find(
        (member) => member.username === user.username,
      );
    },
    saveTeam() {
      this.editingName = false;
      axios.post('/team', this.team)
        .then(() => {
          // TODO update
        });
    },
    addMember() {
      const selectedUser = this.users.find(
        (user) => user.username === this.selectedMemberName,
      );
      this.selectedMemberName = '';
      if (!selectedUser) {
        alert('This user doesn\'t exist.');
        return;
      }

      axios.post(`/team/member/${this.team.id}/${selectedUser.id}`)
        .then(() => {
          this.$emit('refresh');
        });
    },
    deleteTeam() {
      axios.delete(`/team/${this.team.id}`)
        .then(() => {
          this.$emit('refresh');
        });
    },
    deleteMember(userId) {
      axios.delete(`/team/member/${this.team.id}/${userId}`)
        .then(() => {
          this.$emit('refresh');
        });
    },
  },
};
</script>

<style lang="scss">
  #team {
    input {
      margin: 0;
    }

    h2 {
      margin-bottom: 0;
    }

    p {
      margin: 5px 0 0 0;
    }

    #delete {
      font-size: 1em;
      border: none;
      background-color: transparent;
      cursor: pointer;
      padding: 5px 10px;
      position: relative;
      float: right;
      border-radius: 50%;
      color: #fff;
      top: 0;
      transition: all 0.3s ease-out;

      &:hover {
        color: red;
        background-color: #f4f4f4;
      }
    }

    .memberName:hover {
      text-decoration: line-through;
      cursor: pointer;
    }
  }
</style>
