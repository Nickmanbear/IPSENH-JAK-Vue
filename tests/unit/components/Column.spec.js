import { shallowMount } from '@vue/test-utils';
import Column from '@/components/Column.vue';

jest.mock('axios', () => ({
  create: () => ({
    post: () => Promise.resolve({
      data: {
        id: 1,
        column: { id: 1, board: { id: 1, users: [{ id: 1 }] } },
        name: 'new card',
        description: '',
      },
    }),
    get: () => Promise.resolve({ data: [] }),
    delete: () => Promise.resolve(),
  }),
}));

describe('Column', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(Column, {
      propsData: {
        column: {
          id: 1,
          board: { id: 1 },
          name: 'test column',
        },
      },
    });
    window.confirm = jest.fn(() => true);
  });

  it('should delete itself', async () => {
    await cmp.vm.deleteColumn();
    expect(cmp.emitted().deleted).toBeTruthy();
  });

  it('should stop editing the name', () => {
    cmp.vm.editingName = true;
    cmp.vm.saveName();
    expect(cmp.vm.editingName).toBeFalsy();
  });

  it('should create a new card', async () => {
    cmp.vm.newCardName = 'new card';
    await cmp.vm.createCard();
    expect(cmp.vm.cards).toEqual([{
      id: 1,
      column: { id: 1, board: { id: 1, users: [{ id: 1 }] } },
      name: 'new card',
      description: '',
    }]);
  });

  it('should reload its cards', async () => {
    cmp.vm.cards = ['test', 'test2', 'test3'];
    await cmp.vm.removeCard('test2');
    expect(cmp.vm.cards).toEqual(['test', 'test3']);
  });

  it('should react to a moved card', () => {
    cmp.vm.moveCard({ item: { _underlying_vm_: { column: { id: 1} } } });
  });

  it('equals name to "test column"', () => {
    expect(cmp.find('h2').text()).toEqual('test column');
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
