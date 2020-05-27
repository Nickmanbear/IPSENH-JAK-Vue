import { shallowMount } from '@vue/test-utils';
import AddUser from '@/components/AddUser.vue';

const $route = { params: { id: 1 } };

jest.mock('axios', () => ({
  create: () => ({
    post: (url, userId) => Promise.resolve({
      data: {
        userId: userId,
        boardId: url,
      },
    }),
    get: () => Promise.resolve({
      data: {
        1: 'user1',
        2: 'user2',
        3: 'user3',
      },
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
      propsData: {
        boardUsers: {},
      },
        data() {
        return {
          users: [],
          selectedUsername: '',
        };
      },
    });
    window.alert = jest.fn(() => true);
  });

  it('should update selectedUsername', () => {
    cmp.find('input').setValue('test username');
    expect(cmp.vm.selectedUsername).toEqual('test username');
  });

  it('should get users', async () => {
    await cmp.vm.getUsers();
    expect(cmp.vm.users).toEqual([
      { id: '1', username: 'user1' },
      { id: '2', username: 'user2' },
      { id: '3', username: 'user3' },
    ]);
  });

  it('should add user', async () => {
    cmp.vm.users = [
      { id: '1', username: 'user1' },
      { id: '2', username: 'user2' },
      { id: '3', username: 'user3' },
    ];
    cmp.vm.selectedUsername = 'user2';

    await cmp.vm.addUser();
    cmp.vm.$nextTick(() => {
      expect(cmp.vm.boardUsers).toEqual([
        { id: '2', username: 'user2' },
      ]);
    });
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
