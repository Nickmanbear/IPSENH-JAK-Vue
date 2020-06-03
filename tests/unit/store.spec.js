import store from '../../src/store';

// let store;
describe('actions', () => {
  beforeEach(async () => {
    // store = this.$store;
  });

  it('Login user', () => {
    const userData = {
      username: 'username',
      password: 'password',
    };


    expect.objectContaining(store.dispatch('login', userData));
  });
  it('Register a user', () => {
    const userData = {
      username: 'username',
      password: 'password',
    };

    expect.objectContaining(store.dispatch('register', userData));
  });

  it('Logout a user', () => {
    expect.objectContaining(store.dispatch('logout'));
  });
});
