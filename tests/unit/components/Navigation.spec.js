import { shallowMount } from '@vue/test-utils';

import Vue from 'vue';
import Vuex from 'vuex';
import Navigation from '@/components/Navigation.vue';


Vue.use(Vuex);

describe('Navigation', () => {
  let cmp;
  let store;
  let state;
  let getters;

  beforeEach(async () => {
    state = { token: false };
    getters = {
      isLoggedIn: (state) => false,
    };

    store = new Vuex.Store({
      state,
      getters,
    });
    cmp = await shallowMount(Navigation, {
      stubs: ['router-link'],
      data() {
        return {
          authenticated: false,
        };
      },
      store,
    });
  });

  it('should set Authenticated', async () => {
    expect(getters.isLoggedIn()).toEqual(false);
  });
  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
