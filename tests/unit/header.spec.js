import { mount } from '@vue/test-utils'
import HeaderComponent from '@/components/layout/HeaderComponent.vue'

describe('HeaderComponent', () => {
    let wrapper = mount(HeaderComponent);
    expect(wrapper.exists()).toBe(true);

    // test if logo exists
    test("Check if logo exists", () => {
        const logo = wrapper.findAll('.pokemonlogo');
        expect(logo.length).toBe(1);
    });
})
  