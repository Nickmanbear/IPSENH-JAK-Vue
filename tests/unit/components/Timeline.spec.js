import { shallowMount } from '@vue/test-utils';
import Timeline from '@/components/Timeline.vue';

describe('Timeline', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(Timeline, {
      propsData: {
        timeline: [],
      },
      data() {
        return {
          showTimeline: false,
        };
      },
    });
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
