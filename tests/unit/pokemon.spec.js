import { mount, createLocalVue } from '@vue/test-utils'
import vmodal from 'vue-js-modal';
import PokemonComponent from '@/components/pokemon/PokemonComponent.vue'
import PokemonListComponent from '@/components/pokemon/PokemonListComponent.vue'

const localVue = createLocalVue()
localVue.use(vmodal)

describe('PokemonComponent', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(PokemonComponent, { localVue })
        
        // set data to be used in checking and setting of props
        wrapper.setData({ imageUrl: 'image url' })
        wrapper.setData({ apiUrl: 'api url' })
    })

    // check data set here
    test('setData', async () => {
        expect(wrapper.vm.imageUrl).toBe('image url')
        expect(wrapper.vm.apiUrl).toBe('api url')
    })

    // check if all the components included are existing
    test('contains if components are existings', async () => {
        expect(wrapper.findComponent(PokemonListComponent).exists()).toBe(true)
    })

    // check if props are set and passed correctly
    test('setProps to PokemonListComponent', async () => {
        await wrapper.setProps({ imageUrl: 'image url' })
        expect(wrapper.vm.imageUrl).toBe('image url')

        await wrapper.setProps({ apiUrl: 'api url' })
        expect(wrapper.vm.apiUrl).toBe('api url')
    })
})
  