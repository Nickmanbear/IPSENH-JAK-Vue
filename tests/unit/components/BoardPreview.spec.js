import { shallowMount } from '@vue/test-utils';
import BoardPreview from '@/components/BoardPreview.vue';

jest.mock('axios', () => ({
  create: () => ({ delete: () => Promise.resolve() }),
}));

describe('BoardPreview', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(BoardPreview, {
      propsData: {
        board: {
          id: 1,
          userId: 1,
          name: 'test board',
        },
      },
      stubs: ['router-link'],
    });
    window.confirm = jest.fn(() => true);
  });

  it('should delete itself', async () => {
    await cmp.vm.deleteBoard();
    expect(cmp.emitted().deleted).toBeTruthy();
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
