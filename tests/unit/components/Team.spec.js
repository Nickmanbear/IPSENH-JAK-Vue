import { shallowMount } from '@vue/test-utils';
import Team from '@/components/Team.vue';

const $route = { params: { id: 1 } };

jest.mock('axios', () => ({
  create: () => ({
    post: () => Promise.resolve(null),
    delete: () => Promise.resolve(null),
  }),
}));

describe('Team', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(Team, {
      mocks: {
        $route,
      },
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
        users: [
          {
            id: 4,
            username: 'user1',
          },
          {
            id: 5,
            username: 'user2',
          },
          {
            id: 6,
            username: 'user3',
          },
        ],
        username: 'teamleader',
      },
      data() {
        return {
          editingName: false,
          selectedMemberName: '',
        };
      },
    });
    window.alert = jest.fn(() => true);
  });

  it('should find user', () => {
    const user = { id: 3, username: 'member2' };
    expect(cmp.vm.userInTeam(user)).toEqual(user);
  });

  it('should not find user', () => {
    const user = { id: 4, username: 'user1' };
    expect(cmp.vm.userInTeam(user)).toEqual(undefined);
  });

  it('should update selectedMemberName', () => {
    cmp.find('input').setValue('test member name');
    expect(cmp.vm.selectedMemberName).toEqual('test member name');
  });

  it('should refresh on saveTeam', async () => {
    await cmp.vm.saveTeam();
    expect(cmp.vm.team).toEqual({
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
    });
  });

  it('should refresh on addMember', async () => {
    await cmp.vm.addMember();
    expect(cmp.vm.team).toEqual({
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
    });
  });

  it('should refresh on deleteTeam', async () => {
    await cmp.vm.deleteTeam();
    expect(cmp.vm.team).toEqual({
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
    });
  });

  it('should refresh on deleteMember', async () => {
    await cmp.vm.deleteMember(3);
    expect(cmp.vm.team).toEqual({
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
    });
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
