import { mount } from '@vue/test-utils';
import BoardOverview from '@/views/BoardOverview.vue';

const $route = { params: { id: 1 } };

jest.mock('axios', () => ({
  create: () => ({ get: () => Promise.resolve({ data: [] }) }),
}));

describe('Board.spec.js', () => {
  let cmp;
  beforeEach(async () => {
    cmp = await mount(BoardOverview, {
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
      },
      stubs: ['router-link', 'router-view'],
    });
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
