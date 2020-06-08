import { shallowMount } from '@vue/test-utils';
import TeamBoards from '@/components/TeamBoards.vue';

jest.mock('axios', () => ({
  create: () => ({
    get: () => Promise.resolve({
      data: [
        { boardId: 1, name: 'Board 1' },
        { boardId: 2, name: 'Board 2' },
        { boardId: 3, name: 'Board 3' },
      ],
    }),
  }),
}));

describe('TeamBoards', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(TeamBoards, {
      propsData: {
        team: {
          id: 1,
          name: 'test team',
          leader: {
            id: 1,
            username: 'teamleader',
          },
          members: [
            {
              id: 1,
              username: 'teamleader',
            },
            {
              id: 2,
              username: 'member1',
            },
            {
              id: 3,
              username: 'member2',
            },
          ],
        },
      },
      data() {
        return {
          boards: [],
        };
      },
    });
  });

  it('should get boards', async () => {
    await cmp.vm.getBoards();
    expect(cmp.vm.boards).toEqual([
      { boardId: 1, name: 'Board 1' },
      { boardId: 2, name: 'Board 2' },
      { boardId: 3, name: 'Board 3' },
    ]);
  });

  it('should delete board', async () => {
    await cmp.vm.removeBoardPreview();
    expect(cmp.vm.boards).toEqual([
      { boardId: 1, name: 'Board 1' },
      { boardId: 2, name: 'Board 2' },
      { boardId: 3, name: 'Board 3' },
    ]);
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
