<template>
  <header class="header">
      <div class="header__logo">
          <img alt="Pokemon logo" class="pokemonlogo" :src="pokemonLogo">
      </div>
  </header>
</template>

<script>
import pokemonLogo from './../../assets/img/pokemon_logo.png';

export default {
  name: 'HeaderComponent',
  data: () => {
    return {
      pokemonLogo: pokemonLogo,
    }
  }
}
</script>