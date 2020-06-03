import { shallowMount } from '@vue/test-utils';
import Board from '@/views/Board.vue';

const $route = { params: { id: 1 } };

jest.mock('axios', () => ({
  create: () => ({
    post: () => Promise.resolve({
      data: {
        id: 1,
        board: { id: 1, users: [{ id: 1 }] },
        name: 'new column',
      },
    }),
    get: () => Promise.resolve({ data: { id: 1, users: [{ id: 1 }] } }),
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
          board: { id: 1, users: [{ id: 1 }] },
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
    expect(cmp.vm.columns).toEqual({ id: 1, users: [{ id: 1 }] });
  });

  it('should reload its columns', async () => {
    cmp.vm.columns = ['test'];
    await cmp.vm.removeColumn();
    expect(cmp.vm.columns).toEqual({ id: 1, users: [{ id: 1 }] });
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
