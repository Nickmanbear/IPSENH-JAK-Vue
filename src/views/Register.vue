<template>
  <div id="register">
    <div class="container">
      <form>
            <h1>Signup</h1>
            <hr>
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input type="text" id="firstName" class="form-control" v-model="userData.firstName">
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input type="text" id="lastName" class="form-control" v-model="userData.lastName">
            </div>
            <div class="form-group">
              <label for="email">Mail</label>
              <input type="text" id="email" class="form-control" v-model="userData.email">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" class="form-control" v-model="userData.password">
              <p>
                {{ userData.password }}
              </p>
            </div>
        <hr>
        <div class="row">
            <button class="btn btn-primary" @click.prevent="register">Submit!
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
      });
    },
  },
};
</script>
