import { shallowMount } from '@vue/test-utils';
import BoardOverview from '@/views/BoardOverview.vue';

const $route = { params: { id: 1 } };

jest.mock('axios', () => ({
  create: () => ({
    post: () => Promise.resolve({
      data: {
        id: 1,
        userId: 1,
        name: 'new board',
      },
    }),
    get: () => Promise.resolve({ data: [] }),
  }),
}));

describe('BoardOverview', () => {
  let cmp;
  beforeEach(async () => {
    cmp = await shallowMount(BoardOverview, {
      mocks: {
        $route,
      },
      data() {
        return {
          boards: [{ boardId: 1, name: 'Board 1' },
            { boardId: 2, name: 'Board 2' },
            { boardId: 3, name: 'Board 3' },
          ],
          counter: 0,
        };
      }
    });
  });

  it('should create a new board', async () => {
    cmp.vm.newBoardName = 'new board';
    await cmp.vm.createBoard();
    expect(cmp.vm.boards).toEqual([{
      id: 1,
      userId: 1,
      name: 'new board',
    }]);
  });

  it('should reload its boards', async () => {
    cmp.vm.boards = [{ test: 'test' }];
    await cmp.vm.removeBoardPreview();
    expect(cmp.vm.boards).toEqual([]);
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
