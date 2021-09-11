<template>
<div>
    <h1>Pokemon List</h1>
    <div class="actions">
        <PokemonSearchComponent 
            :apiUrl="apiUrl"
            @searchPokemon=getPokemonDetail />
        <div class="pagination">
            <button @click="fetchPokemonList(prevUrl)" id="btnPrev" class="btn--yellow" :class="prevUrl==null ? 'btn--disabled':''" :disabled="prevUrl==null">Previous</button>
            <button @click="fetchPokemonList(nextUrl)" id="btnNext" class="btn--yellow" :class="nextUrl==null ? 'btn--disabled':''" :disabled="nextUrl==null">Next</button>
        </div>
    </div>
    
    <div class="pokemon--list">
        <div v-for="(pokemon,index) in pokemonList" :key="'pokemon'+index" 
            class="pokemon--item" @click="getPokemonDetail(pokemon.url)">
            <h2 class="pokemon-name">{{ pokemon.name }}</h2>
            <img :src="imageUrl + pokemon.id + '.png'" :alt="pokemon.name"/>
        </div>
    </div>

    <!-- Empty Pokemon Modal -->
    <modal name="pokemon-empty-modal" class="pokemon-empty-modal modal fade show" width="500px" height="auto" id="modal-default" style="display: block;" aria-modal="true" role="dialog">
        <div class="modal-body">
            <div class="modal-content">
                <h3 class="mb-1">No Pokemon Found</h3>
                <button @click="$modal.hide('pokemon-empty-modal');">Close</button>
            </div>
        </div>
    </modal>

    <div id="loader-container" v-show="displayLoader">
        <div class="loader"></div>
    </div>

    <PokemonDetailComponent
        :imageUrl=imageUrl 
        ref="pokemondetail" />
</div>
</template>

<script>
import axios from 'axios'
import PokemonSearchComponent from './../pokemon/PokemonSearchComponent.vue';
import PokemonDetailComponent from './PokemonDetailComponent.vue';

export default {
    name: "PokemonListComponent",
    props: {
        imageUrl: String,
        apiUrl: String
    },
    components: {
        PokemonSearchComponent,
        PokemonDetailComponent
    },
    data: () => {
        return {
            pokemonList: [],
            nextUrl: "",
            prevUrl: "",
            displayLoader: true,
            url: "https://pokeapi.co/api/v2/pokemon/"
        }
    },
    created() {
        this.fetchPokemonList(this.url);
    },
    methods: {
        async fetchPokemonList(url) {
            this.displayLoader = true;
            this.pokemonList = [];
            
            try {
                axios.get(url)
                .then((response) => {
                    let responseData = response.data;

                    responseData.results.forEach(pokemon => {
                        pokemon.id = pokemon.url.split("/").filter((part) => {
                            return !!part
                        }).pop();
                        this.pokemonList.push(pokemon)
                    });
                    this.nextUrl = responseData.next;
                    this.prevUrl = responseData.previous;
                    this.displayLoader = false;
                }).catch(error => {
                    console.log("AXIOS ERROR: " + error);
                });
            } catch (err) {
                // console.log(err);
            }
        },
        getPokemonDetail(url){
            this.$refs.pokemondetail.url = url;
            this.$refs.pokemondetail.getPokemonDetail();
        }
    }
}
</script>

<style lang="scss" scoped>
.actions {
    display: flex;
    justify-content: space-between;
    padding: 0 20px 20px;

    .pagination {
        .btn--yellow {
            &:first-child {
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
            }
            &:last-child {
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
            }
        }
    }
}
.pokemon-name {
    text-transform: capitalize;
}
.pokemon--list {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    margin: 0 20px;
}
.pokemon--item {
    display: flex;
    justify-content: space-between;
    border: 3px solid $blue;
    background: url('./../../assets/img/pokeball.png'), $lightyellow;
    background-repeat: no-repeat; 
    background-position: right;
    background-size: contain;
    align-items: center;
    padding: 10px;
    margin-bottom: 20px;
    width: 22%;
    border-radius: 10px;
    box-shadow: 15px 15px 15px rgba(60, 89, 165, 1);
    cursor: pointer;

    &:hover {
        border: 3px solid $yellow;
        background: url('./../../assets/img/pokeball.png'), $blue;
        background-repeat: no-repeat; 
        background-position: right;
        background-size: contain;
        color: #FFF;
    }
}

// Tab
@media screen and (max-width: 992px) {
    .actions {
        .pagination {
            width: 32%;
        }
    }
    .pokemon--item {
        width: 48%;
    }
}

// Mobile
@media screen and (max-width: 600px) {
    * {
        font-size: 12px;
    }
    .actions {
        flex-flow: wrap;
        .pagination {
            margin-top: 20px;
            margin-left: auto;
            width: 52%;
        }
    }
    .pokemon--item {
        width: 100%;
    }
}
</style>