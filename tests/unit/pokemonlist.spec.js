import { mount, createLocalVue } from '@vue/test-utils'
import vmodal from 'vue-js-modal'
import PokemonListComponent from '@/components/pokemon/PokemonListComponent.vue'
import PokemonSearchComponent from '@/components/pokemon/PokemonSearchComponent.vue'
import PokemonDetailComponent from '@/components/pokemon/PokemonDetailComponent.vue'

const localVue = createLocalVue()
localVue.use(vmodal)

const mockGet = jest.fn()
jest.mock('axios', () => ({
    get: () => mockGet()
}))

describe('PokemonListComponent', () => {
    const wrapper = mount(PokemonListComponent, { 
        localVue,
        data: () => {
            return {
                pokemonList: [],
                nextUrl: "",
                prevUrl: "",
                displayLoader: true,
                url: ""
            }
        },
    })
    expect(wrapper.exists()).toBe(true);

    // check if all the components included are existing
    test('check if components are existing', async () => {
        expect(wrapper.findComponent(PokemonSearchComponent).exists()).toBe(true)
        expect(wrapper.findComponent(PokemonDetailComponent).exists()).toBe(true)
    })

    // check if pagination exists
    test('check if pagination exists', async () => {
        wrapper.find('#btnPrev').text()
        wrapper.find('#btnNext').text()
    })

    // set data to be used
    test('check setting of data', async () => {
        await wrapper.setData({ pokemonList: '[]' })
        expect(wrapper.vm.pokemonList).toBe('[]')

        await wrapper.setData({ nextUrl: 'next url' })
        expect(wrapper.vm.nextUrl).toBe('next url')
        
        await wrapper.setData({ prevUrl: 'prevUrl url' })
        expect(wrapper.vm.prevUrl).toBe('prevUrl url')

        await wrapper.setData({ displayLoader: 'true' })
        expect(wrapper.vm.displayLoader).toBe('true')
    })

    // test if it makes an api call
    it('makes an api call', async () => {
        expect(mockGet).toHaveBeenCalled()
    })
})
  