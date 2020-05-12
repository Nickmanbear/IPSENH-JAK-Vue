import { shallowMount, mount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });

  test('renders correctly', () => {
    const wrapper = mount(HelloWorld);
    expect(wrapper.element).toMatchSnapshot();
  });
});
