import { mount } from '@vue/test-utils';
import BoardOverview from '@/views/BoardOverview.vue';

describe('Board.spec.js', () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(BoardOverview, {
      data() {
        return {
          boards: [{ boardId: 1, name: 'Board 1' },
            { boardId: 2, name: 'Board 2' },
            { boardId: 3, name: 'Board 3' },
          ],
          counter: 0,
        };
      },
      stubs: ['router-link', 'router-view'],
    });
    cmp.find('button').trigger('click');
  });

  it('test button click', () => {
    expect(cmp.find('p').text()).toEqual('this is a counter: 1');
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
