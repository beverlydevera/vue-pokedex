import { mount } from '@vue/test-utils'
import PokemonSearchComponent from '@/components/pokemon/PokemonSearchComponent.vue'

describe('PokemonSearchComponent', () => {
    const wrapper = mount(PokemonSearchComponent)
    expect(wrapper.exists()).toBe(true);

    // check data setting here
    test('setting search value', async () => {
        const textInput = wrapper.find('input[type="text"]')
        await textInput.setValue('searchvalue')

        expect(wrapper.find('input[type="text"]').element.value).toBe('searchvalue')
    })

    // check if it emits data
    test('check if it emits data', async () => {
        wrapper.vm.$emit('searchPokemon', 'searchvalue')

        await wrapper.vm.$nextTick()

        // assert event has been emitted
        expect(wrapper.emitted().searchPokemon).toBeTruthy()
    })
})
  