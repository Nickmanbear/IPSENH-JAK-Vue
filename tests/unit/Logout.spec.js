import { shallowMount } from '@vue/test-utils';
import Logout from '@/views/Logout.vue';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

describe('Logout', () => {
  let cmp;
  let store;
  let actions;
  let state;
  beforeEach(async () => {
    state = { data: {} };
    actions = {
      logout: jest.fn(),
    };

    store = new Vuex.Store({
      state,
      actions,
    });
    cmp = await shallowMount(Logout, { store });
  });


  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
