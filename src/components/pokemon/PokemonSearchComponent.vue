<template>
<div class="search__form">
    <form @submit.prevent="searchPokemon">
        <label class="search-label">Search Pokemon: </label>
        <input class="search-text" type="text" v-model="searchValue"/>
        <button class="btn--yellow" type="submit">Search</button>
    </form>
</div>
</template>

<script>
export default {
    name: "PokemonSearchComponent",
    props: {
        apiUrl: String
    },
    data: () => {
        return {
            searchValue: ""
        }
    },
    methods: {
        async searchPokemon(){
            if(this.searchvalue !== '')
                this.$emit('searchPokemon',this.apiUrl + (this.searchValue).toLowerCase());
        }
    }
}
</script>

<style lang="scss" scoped>
.search-label {
    margin: 0 8px 0 0;
}
input {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border: 2px solid $blue;
    padding: 5px;
}
button {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

// Tab
@media screen and (max-width: 992px) {
    input {
        width: 40%;
    }
}

// Mobile
@media screen and (max-width: 600px) {
    input {
        width: 70%;
    }
}
</style>