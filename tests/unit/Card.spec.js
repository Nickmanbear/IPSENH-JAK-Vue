import { shallowMount } from '@vue/test-utils';
import Card from '@/components/Card.vue';

describe('Card.spec.js', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(Card, {
      propsData: {
        card: {
          id: 5,
          columnId: 1,
          name: 'test card',
          description: 'test description for the card',
          priority: 'high',
          points: 5,
        },
      },
    });
  });

  it('equals test description', () => {
    expect(cmp.find('p').text()).toEqual('test description for the card');
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
