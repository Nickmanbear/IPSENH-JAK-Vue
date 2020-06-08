import { shallowMount } from '@vue/test-utils';
import Register from '@/views/Register.vue';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

describe('Register', () => {
  let cmp;
  let store;
  let actions;
  let state;
  beforeEach(async () => {
    state = { data: {} };
    actions = {
      register: jest.fn(),
    };
    store = new Vuex.Store({
      state,
      actions,
    });
    cmp = await shallowMount(Register, {
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

  it('should Register a user ', async () => {
    cmp.find('button').trigger('click');
    expect(actions.register.mock.calls).toHaveLength(1);
  });
  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
