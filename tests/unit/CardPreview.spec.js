import { shallowMount } from '@vue/test-utils';
import CardPreview from '@/components/CardPreview.vue';

jest.mock('axios', () => ({
  create: () => ({ delete: () => Promise.resolve() }),
}));

describe('CardPreview', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(CardPreview, {
      propsData: {
        card: {
          id: 5,
          columnId: 1,
          name: 'test card',
          description: 'test description for the card'
        },
      },
    });
  });

  it('should toggle the card modal', () => {
    cmp.vm.toggleCard();
    expect(cmp.vm.show).toBeTruthy();
  });

  it('should delete itself', async () => {
    await cmp.vm.deleteCard();
    expect(cmp.emitted().deleted).toBeTruthy();
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
