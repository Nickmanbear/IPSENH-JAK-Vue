import { shallowMount } from '@vue/test-utils';
import Login from '@/views/Login.vue';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

describe('Login', () => {
  let cmp;
  let store;
  let actions;
  let state;
  beforeEach(async () => {
    state = { data: {} };
    actions = {
      login: jest.fn(),
    };

    store = new Vuex.Store({
      state,
      actions,
    });
    cmp = await shallowMount(Login, {
      data() {
        return {
          userData: {
            username: 'username',
            password: 'password',
          },
        };
      },
      store,
    });
  });

  it('should Login a user ', async () => {
    cmp.find('button').trigger('click');
    expect(actions.login.mock.calls).toHaveLength(1);
  });
  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
