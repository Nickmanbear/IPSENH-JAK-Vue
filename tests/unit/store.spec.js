import store from '../../src/store';

// let store;
describe('store', () => {
  beforeEach(async () => {
    jest.mock('axios', () => ({
      create: () => ({
        post: () => Promise.resolve({
          headers: {
            Authentication: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrZWVzI'
              + 'iwiYWN0aXZlIjp0cnVlLCJleHAiOjE1OTIwNTE1NzF9.iYx09sA139iJSk60eKLhQEExXbV5iZMtN'
              + 'TB6ImHb4AShCgRI3I0RYbS7H8UKP24MjLzDSa5ypxyg4Mk5h0nIrA',
          },
        }),
        get: () => Promise.resolve({ data: [] }),
      }),
    }));
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

  it('getter isloggedin', () => {
    expect(store.getters.isLoggedIn).toEqual(false);
  });

  it('getter authStatus', () => {
    expect(store.getters.authStatus).toEqual('');
  });

  test('the fetch fails with an error', () => {
    const userData = {
      username: 'username',
      password: 'password',
    };
    expect(store.dispatch(
      'login', userData,
    )).rejects.toMatch('error');
  });
});
