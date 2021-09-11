<template>
  <div id="app">
    <div class="content-wrapper">
      <HeaderComponent />
      <div class="content-body">
        <PokemonComponent />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from './components/layout/HeaderComponent.vue'
import PokemonComponent from './components/pokemon/PokemonComponent.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    PokemonComponent
  }
}
</script>

<style scoped>
.content-wrapper {
  background-image: url("./assets/img/pokemon_bkg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: #FFF;
  height: 100%;
}
</style>