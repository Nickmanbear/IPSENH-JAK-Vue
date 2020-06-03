import { shallowMount } from '@vue/test-utils';
import Card from '@/components/Card.vue';

describe('Card', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(Card, {
      propsData: {
        card: {
          id: 5,
          column: { id: 1 },
          name: 'test card',
          description: 'test description for the card',
          priority: 'high',
          points: 5,
        },
      },
    });
  });

  it('should stop editing', () => {
    cmp.vm.editing = 'name';
    cmp.vm.save();
    expect(cmp.vm.editing).toEqual(null);
  });

  it('should assign a user', () => {
    cmp.vm.assigningUser = true;
    cmp.vm.assignUser(1);
    expect(cmp.vm.assigningUser).toBeFalsy();
  });

  it('equals test description', () => {
    expect(cmp.findAll('p').at(1).text()).toEqual('test description for the card');
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
