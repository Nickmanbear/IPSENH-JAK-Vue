import { mount, createLocalVue } from '@vue/test-utils';
import App from '@/App.vue';
import VueRouter from 'vue-router';

import router from '../../../src/router';
import store from '../../../src/store';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('App', () => {
  let wrapper;
  beforeEach(async () => {
    wrapper = mount(App, {
      localVue,
      router,
      store,
    });
  });
  it('renders a Login component via routing', async () => {
    router.push('/login');
    await wrapper.vm.$nextTick();


    expect(router.currentRoute.fullPath).toBe('/login');
  });

  it('renders a Register component via routing', async () => {
    router.push('/register');
    await wrapper.vm.$nextTick();


    expect(router.currentRoute.fullPath).toBe('/register');
  });

  it('renders a board component via routing', async () => {
    router.beforeEach((to, from, next) => {
      if (to.matched.some((record) => record.meta.requiresAuth)) {
        next();
      }
    });
    wrapper = mount(App, {
      localVue,
      router,
      store,
    });

    router.push('/board/1');
    await wrapper.vm.$nextTick();


    expect(router.currentRoute.fullPath).toBe('/register');
  });

  it('renders a logout component via routing', async () => {
    router.push('/logout');
    await wrapper.vm.$nextTick();


    expect(router.currentRoute.fullPath).toBe('/register');
  });
});
