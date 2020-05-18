import { shallowMount } from '@vue/test-utils';
import Column from '@/components/Column.vue';

jest.mock('axios', () => ({
  create: () => null,
  get: () => Promise.resolve({ data: [] }),
}));

describe('Column.spec.js', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(Column, {
      propsData: {
        column: {
          id: 6,
          boardId: 1,
          name: 'test column',
        },
      },
    });
  });

  it('equals name to "test column"', () => {
    expect(cmp.find('h2').text()).toEqual('test column');
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
