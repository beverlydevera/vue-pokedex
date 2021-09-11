import { mount, createLocalVue } from '@vue/test-utils'
import vmodal from 'vue-js-modal';
import PokemonDetailComponent from '@/components/pokemon/PokemonDetailComponent.vue'

const localVue = createLocalVue()
localVue.use(vmodal)

let mockGet = jest.fn()
jest.mock('axios', () => ({
    get: () => mockGet()
}))

describe('PokemonDetailComponent', () => {
    beforeEach(() => {
        mockGet = jest.fn()
    })
    const wrapper = mount(PokemonDetailComponent, { 
        localVue,
        propsData: {
            imageUrl: 'image url'
        },
    })
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props().imageUrl).toBe('image url')
    expect(wrapper.props('imageUrl')).toBe('image url')

    // set data to be used
    test('check setting of data', async () => {
        await wrapper.setData({ activeTab: '' })
        expect(wrapper.vm.activeTab).toBe('')

        await wrapper.setData({ displayLoader: 'true' })
        expect(wrapper.vm.displayLoader).toBe('true')
    })

    // test if it makes an api call
    it('makes an api call', async () => {
        wrapper.vm.viewPokemonDetail()

        await wrapper.vm.$nextTick()
        
        expect(mockGet).toHaveBeenCalled()
    })
})
  