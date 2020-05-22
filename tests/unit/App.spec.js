import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(App, { stubs: ['router-view'] });
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
