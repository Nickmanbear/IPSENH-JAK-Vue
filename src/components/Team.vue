<template>
  <div id="team">
    <h2 v-if="!editingName" @click="editingName = true">{{ team.name }}</h2>
    <input id="column-name" v-else v-model="team.name" @keydown.enter="saveTeam" type="text">
    <button v-if="editingName" @click="saveTeam">save</button>

    <div v-if="isLeader">
      <input v-model="selectedMemberName" type="text" placeholder="Username" list="user-list">
      <datalist id="user-list">
        <option v-for="user in users" :key="user.id" :value="user.username"/>
      </datalist>
      <button @click="addMember">Add member</button>
    </div>

    <p v-for="member in team.members" :key="member.id">{{ member.username }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from '@/axiosInstance';

export default {
  name: 'Team',
  props: {
    team: {},
    users: {},
  },
  data() {
    return {
      isLeader: true,
      editingName: false,
      selectedMemberName: '',
    };
  },
  mounted() {
    // this.isLeader = this.team.leader === 'me'; // TODO real check
  },
  methods: {
    saveTeam() {
      this.editingName = false;
      axios.post(
        '/team',
        this.team,
      );
    },
    addMember() {
      const selectedUser = this.users.find(
        (user) => user.username === this.selectedMemberName,
      );
      if (!selectedUser) {
        alert('This user doesn\'t exist.');
        return;
      }

      axios.post(`/team/member/${this.team.id}/${selectedUser.id}`)
        .then((response) => {
          this.team = response.data;
          this.selectedMemberName = '';
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
  }
</style>
