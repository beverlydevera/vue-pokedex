<template>
<div>
    <PokemonListComponent 
      :imageUrl="imageUrl" 
      :apiUrl="apiUrl" />
</div>
</template>

<script>
import PokemonListComponent from './PokemonListComponent.vue'
export default {
    name: "PokemonComponent",
    components: {
        PokemonListComponent
    },
    data: () => {
        return {
            imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
            apiUrl: "https://pokeapi.co/api/v2/pokemon/"
        }
    },
}
</script>