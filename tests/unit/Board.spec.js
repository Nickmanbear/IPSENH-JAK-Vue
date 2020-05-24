import { shallowMount } from '@vue/test-utils';
import Board from '@/views/Board.vue';

const $route = { params: { id: 1 } };

jest.mock('axios', () => ({
  create: () => ({
    post: () => Promise.resolve({
      data: {
        id: 1,
        boardId: 1,
        name: 'new column',
      },
    }),
    get: () => Promise.resolve({ data: [] })
  }),
}));

describe('Board', () => {
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

  it('should stop editing the name', () => {
    cmp.vm.editingName = true;
    cmp.vm.saveName();
    expect(cmp.vm.editingName).toBeFalsy();
  });

  it('should create a new column', async () => {
    cmp.vm.newColumnName = 'new column';
    await cmp.vm.createColumn();
    expect(cmp.vm.columns).toEqual([{
      id: 1,
      boardId: 1,
      name: 'new column',
    }]);
  });

  it('should reload its columns', async () => {
    cmp.vm.columns = ['test'];
    await cmp.vm.removeColumn();
    expect(cmp.vm.columns).toEqual([]);
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
