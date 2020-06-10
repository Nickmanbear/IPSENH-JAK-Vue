import { shallowMount } from '@vue/test-utils';
import AddUser from '@/components/AddUser.vue';

const $route = { params: { id: 1 } };

jest.mock('axios', () => ({
  create: () => ({
    post: () => Promise.resolve(null),
    get: (url) => {
      let data;
      switch (url) {
        case '/team': data = [
          {
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
          {
            id: 2,
            name: 'test team 2',
            leader: {
              id: 4,
              username: 'teamleader2',
            },
            members: [
              {
                id: 4,
                username: 'teamleader2',
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
        ];
          break;
        case '/user':
          data = {
            1: 'user1',
            2: 'user2',
            3: 'user3',
          };
          break;
        default: data = {};
          break;
      }
      return Promise.resolve({
        data,
      });
    },
    delete: () => Promise.resolve(null),
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
        boardUsers: [{ id: '2', username: 'user2' }],
        boardTeam: {},
      },
      data() {
        return {
          toggleIsUsers: true,
          users: [],
          teams: [],
          selectedUsername: '',
          selectedTeamName: '',
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
      { id: '3', username: 'user3' },
    ]);
  });

  it('should get teams', async () => {
    await cmp.vm.getTeams();
    expect(cmp.vm.teams).toEqual([
      {
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
      {
        id: 2,
        name: 'test team 2',
        leader: {
          id: 4,
          username: 'teamleader2',
        },
        members: [
          {
            id: 4,
            username: 'teamleader2',
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
    expect(cmp.vm.boardUsers).toEqual([{ id: '2', username: 'user2' }]);
  });

  it('should not find add user', async () => {
    cmp.vm.users = [];
    cmp.vm.selectedUsername = 'user2';

    await cmp.vm.addUser();
    expect(cmp.vm.boardUsers).toEqual([{ id: '2', username: 'user2' }]);
  });

  it('should not find add team', async () => {
    cmp.vm.teams = [];
    cmp.vm.selectedTeamName = 'test team';

    await cmp.vm.addTeam();
    expect(cmp.vm.boardTeam).toEqual({});
  });

  it('should add team', async () => {
    cmp.vm.selectedTeamName = 'test team';

    await cmp.vm.addTeam();
    expect(cmp.vm.boardTeam).toEqual({});
  });

  it('should delete user', async () => {
    await cmp.vm.deleteUser(1);
    expect(cmp.emitted().refresh).toBeTruthy();
  });

  it('should delete team', async () => {
    await cmp.vm.deleteTeam();
    expect(cmp.emitted().refresh).toBeTruthy();
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
