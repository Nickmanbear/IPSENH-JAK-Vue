<template>
  <div id="register">
    <div class="container">
      <form>
            <h1>Signup</h1>
            <hr>
            <div>
              <label for="username">First Name</label>
              <input type="text" id="username"  v-model="userData.firstName">
            </div>
            <div>
              <label for="password">Password</label>
              <input type="password" id="password"  v-model="userData.password">
              <p>
                {{ userData.password }}
              </p>
            </div>
        <hr>
        <div class="row">
            <button  @click.prevent="register">Submit!
            </button>
          </div>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from '@/axiosInstance';

export default {
  name: 'Register',
  data() {
    return {
      userData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      storeData: 'Yes',
      isSubmitted: false,
    };
  },

  methods: {

    register() {
      axios.post('/user/register', {
        username: this.userData.firstName,
        password: this.userData.password,
      }).then(() => this.$router.push('/'));
    },
  },
};
</script>
