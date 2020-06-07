import { shallowMount } from '@vue/test-utils';
import Teams from '@/components/Teams.vue';

jest.mock('axios', () => ({
  create: () => ({
    post: () => Promise.resolve({
      data: {
        id: 3,
        name: 'test team3',
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
    }),
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
        case '/user': data = {
          1: 'user1',
          2: 'user2',
          3: 'user3',
        };
          break;
        case '/user/me': data = {
          id: 1,
          username: 'teamleader',
        };
          break;
        default: data = [];
          break;
      }
      return Promise.resolve({
        data,
      });
    },
  }),
}));

describe('Teams', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(Teams, {
      data() {
        return {
          myUsername: '',
          teams: [],
          users: [],
          newTeamName: '',
          editingName: false,
          selectedMemberName: '',
        };
      },
    });
  });

  it('should update newTeamName', () => {
    cmp.find('input').setValue('test teamName');
    expect(cmp.vm.newTeamName).toEqual('test teamName');
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

  it('should get users', async () => {
    await cmp.vm.getUsers();
    expect(cmp.vm.users).toEqual([
      { id: '1', username: 'user1' },
      { id: '2', username: 'user2' },
      { id: '3', username: 'user3' },
    ]);
  });

  it('should get my username', async () => {
    await cmp.vm.getMyUsername();
    expect(cmp.vm.myUsername).toEqual('teamleader');
  });

  it('should add team', async () => {
    await cmp.vm.createTeam();
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
      {
        id: 3,
        name: 'test team3',
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
    ]);
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
