import { shallowMount } from '@vue/test-utils';
import AddUser from '@/components/AddUser.vue';

const $route = { params: { id: 1 } };

jest.mock('axios', () => ({
  create: () => ({
    post: () => Promise.resolve({
      data: {
        userId: 2,
        boardId: 1,
      },
    }),
    get: () => Promise.resolve({
      data: [
        { id: 1, username: 'user1', permission: 'nothing' },
        { id: 2, username: 'user2', permission: 'nothing' },
        { id: 3, username: 'user3', permission: 'nothing' },
      ],
    }),
  }),
}));

describe('AddUser', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(AddUser, {
      mocks: {
        $route,
      },
      data() {
        return {
          users: [],
          selectedUsername: '',
        };
      },
    });
  });

  it('should update selectedUsername', () => {
    cmp.find('input').setValue('test username');
    expect(cmp.vm.selectedUsername).toEqual('test username');
  });

  it('should get users', async () => {
    cmp.vm.selectedUsername = 'user2';
    await cmp.vm.addUser();
    expect(cmp.vm.users).toEqual([
      { id: 1, username: 'user1' },
      { id: 2, username: 'user2' },
      { id: 3, username: 'user3' },
    ]);
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
