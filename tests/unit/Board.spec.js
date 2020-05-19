import { shallowMount } from '@vue/test-utils';
import Board from '@/views/Board.vue';

const $route = { params: { id: 1 } };

jest.mock('axios', () => ({
  create: () => ({ get: () => Promise.resolve({ data: [] }) }),
}));

describe('Board.spec.js', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(Board, {
      mocks: {
        $route,
      },
      data() {
        return {
          boardId: 5,
          name: 'Boardname',
          columns: [],
        };
      },
    });
  });

  it('equals name to "Boardname"', () => {
    expect(cmp.vm.name).toEqual('Boardname');
  });

  it('equals id to "5"', () => {
    expect(cmp.vm.boardId).toEqual(5);
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
