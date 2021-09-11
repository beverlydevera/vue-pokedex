<template>
<div>
    <!-- Pokemon Detail Modal -->
    <modal name="pokemon-detail-modal" class="pokemon-detail-modal modal fade show" width="80%" height="90%" id="modal-default" style="display: block;" aria-modal="true" role="dialog">
        <div class="modal-body">
            <div class="modal-content full-scroll">
                <div class="pokemon--header pl-2 pr-2">
                    <div class="pokemon--img">
                        <img :src="imageUrl + PokemonItemDetail.id + '.png'" :alt="PokemonItemDetail.name"/>
                    </div>
                    <div class="right ml-3">
                        <div class="row">
                            <h3 class="pokemon-name">{{PokemonItemDetail.name}}</h3>
                            <div class="pokemon--types">
                                <span class="pokemon--type" :class="'pokemon--type-'+type.type.name" v-for="(type,index) in PokemonItemDetail.types" :key="'type'+index">
                                    {{type.type.name}}
                                </span>
                            </div>
                            <h4>#{{PokemonItemDetail.id}}</h4>
                        </div>
                    </div>
                </div>

                <div class="pokemon--details">
                    <div class="tabs">
                        <button class="tablink" :class="activeTab=='about' ? 'tablink--active' : ''" @click="activeTab='about'">About</button>
                        <button class="tablink" :class="activeTab=='damages' ? 'tablink--active' : ''" @click="activeTab='damages'">Damages</button>
                        <button class="tablink" :class="activeTab=='stats' ? 'tablink--active' : ''" @click="activeTab='stats'">Stats</button>
                        <button class="tablink" :class="activeTab=='evolution' ? 'tablink--active' : ''" @click="activeTab='evolution'">Evolution</button>
                        <button class="tablink" :class="activeTab=='moves' ? 'tablink--active' : ''" @click="activeTab='moves'">Moves</button>
                    </div>

                    <div class="tab tab--detail pokemon--about" :class="activeTab=='about' ? 'tab--active' : ''">
                        <div class="pokemon--about-row">
                            <p>Species:</p> <span class="specie-name">{{PokemonItemDetail.species.name}}</span>
                        </div>
                        <div class="pokemon--about-row">
                            <p>Height:</p> <span>{{PokemonItemDetail.height}}cm</span>
                        </div>
                        <div class="pokemon--about-row">
                            <p>Weight:</p> <span>{{PokemonItemDetail.weight}}kg</span>
                        </div>
                        <div class="pokemon--about-row">
                            <p>Abilities:</p>
                            <span class="pokemon--ability" v-for="(ability,index) in PokemonItemDetail.abilities" :key="'ability'+index">
                                {{ability.ability.name}}<span v-if="index+1<PokemonItemDetail.abilities.length">, </span>
                            </span>
                        </div>
                    </div>

                    <div class="tab tab--detail pokemon--damages" :class="activeTab=='damages' ? 'tab--active' : ''">
                        <div class="pokemon--sw-cards" v-if="PokemonItemDetail.strengths && PokemonItemDetail.weaknesses">
                            <div class="pokemon--sw-card">
                                <p>Strengths:</p>

                                <div v-if="PokemonItemDetail.strengths[0].list.length>0">
                                    <div class="pokemon--sw-damages" v-for="(strength,index) in PokemonItemDetail.strengths" :key="'strengths'+index">
                                        <span>{{strength.name}}</span>
                                        <ul>
                                            <li v-for="(item,index) in strength.list" :key="'strength'+index">
                                                {{item.name}}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <p class="pokemon--sw-damages" v-else>
                                    No strength records for <span class="pokemon-name">{{PokemonItemDetail.name}}</span>.
                                </p>

                            </div>
                            <div class="pokemon--sw-card">
                                <p>Weaknesses:</p>

                                <div v-if="PokemonItemDetail.weaknesses[0].list.length>0">
                                    <div class="pokemon--sw-damages" v-for="(weakness,index) in PokemonItemDetail.weaknesses" :key="'weaknesses'+index">
                                        <span>{{weakness.name}}</span>
                                        <ul>
                                            <li v-for="(item,index) in weakness.list" :key="'weakness'+index">
                                                {{item.name}}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <p class="pokemon--sw-damages" v-else>
                                    No weakness records for <span class="pokemon-name">{{PokemonItemDetail.name}}</span>.
                                </p>
                                
                            </div>
                        </div>
                        <span v-else>
                            No strengths and weaknesses records for <span class="pokemon-name">{{PokemonItemDetail.name}}</span>.
                        </span>
                    </div>

                    <div class="tab tab--detail pokemon--stats" :class="activeTab=='stats' ? 'tab--active' : ''">
                        <div class="pokemon--stats-row" v-for="(stat,index) in PokemonItemDetail.stats" :key="'stat'+index">
                            <p class="pokemon--statname">{{stat.stat.name}}</p>
                            <span>{{stat.base_stat}}</span>
                            <div>
                                <div class="pokemon--basestat-bar" :style="'width: '+stat.base_stat+'%'"></div>
                            </div>
                        </div>
                    </div>

                    <div class="tab tab--detail pokemon--evolution" :class="activeTab=='evolution' ? 'tab--active' : ''">
                        <div class="pokemon--evolution-cards" v-if="PokemonItemDetail.evolutions">
                            <div class="pokemon--evolution-card-item" 
                                @click="viewPokemonDetail('https://pokeapi.co/api/v2/pokemon/'+evolution.id)"
                                v-for="(evolution,index) in PokemonItemDetail.evolutions" :key="'evolution'+index">
                                <div class="pokemon--img">
                                    <img :src="imageUrl + evolution.id + '.png'" :alt="evolution.name"/>
                                </div>
                                <span class="pokemon-name">{{evolution.name}}</span>
                            </div>
                        </div>
                        <span v-else>
                            No evolution records for <span class="pokemon-name">{{PokemonItemDetail.name}}</span>.
                        </span>
                    </div>
                    
                    <div class="tab tab--detail pokemon--moves" :class="activeTab=='moves' ? 'tab--active' : ''">
                        <ul>
                            <li v-for="(move,index) in PokemonItemDetail.moves" :key="'move'+index" class="pokemon--movename">
                                {{move.move.name}}
                            </li> 
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </modal>

    <!-- Loader -->
    <div id="loader-container" v-show="displayLoader">
        <div class="loader"></div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: "PokemonDetailComponent",
    props: {
        imageUrl: String
    },
    data: () => {
        return {
            PokemonItemDetail: {
                species: { name: "" }
            },
            activeTab: '',
            displayLoader: false
        }
    },
    methods: {
        async viewPokemonDetail(url){
            this.url = url;
            this.getPokemonDetail();
        },
        async getPokemonDetail(){
            let url = this.url;
            this.displayLoader = true;
            this.activeTab = 'about';
            try {
                axios.get(url)
                .then(response => {
                    let responseData = response.data;

                    // Get pokemon strengths and weaknesses through type
                    let types = responseData.types;
                    
                    let strengths_double_damage_to = [];
                    let strengths_half_damage_from = [];
                    let weaknesses_double_damage_from = [];
                    let weaknesses_half_damage_to = [];

                    types.forEach(element => {
                        let url = "https://pokeapi.co/api/v2/type/" + element.type.name;
                        axios.get(url)
                        .then(response => {
                            let responseDataDamages = response.data.damage_relations;

                            strengths_double_damage_to = [...strengths_double_damage_to, ...responseDataDamages.double_damage_to];
                            strengths_half_damage_from = [...strengths_half_damage_from,...responseDataDamages.half_damage_from];
                            responseData.strengths = [{
                                "name": "Double-Damage To",
                                "list": strengths_double_damage_to
                            },{
                                "name": "Half-Damage From",
                                "list": strengths_half_damage_from
                            }];

                            weaknesses_double_damage_from = [...weaknesses_double_damage_from,...responseDataDamages.double_damage_from];
                            weaknesses_half_damage_to = [...weaknesses_half_damage_to,...responseDataDamages.half_damage_to];
                            responseData.weaknesses = [{
                                "name": "Double-Damage From",
                                "list": weaknesses_double_damage_from
                            },{
                                "name": "Half-Damage To",
                                "list": weaknesses_half_damage_to
                            }];
                        })
                    });
                    this.PokemonItemDetail = responseData;

                    this.getEvolutionDetails(this.PokemonItemDetail.id);

                    this.displayLoader = false;
                    this.$modal.show('pokemon-detail-modal');
                })
                .catch(() => {
                    this.displayLoader = false;
                    this.$modal.show('pokemon-empty-modal');
                })
            } catch (err) {
                // console.log(err);
            }
        },
        getPokemonStrengthWeaknesses(id){
            let url = "https://pokeapi.co/api/v2/type/"+id;
            return axios.get(url)
			.then(response => {
                let responseData = response.data;
                if(responseData.damage_relations.double_damage_to.length>0){
                    this.PokemonItemDetail.strengths_double_to = responseData.damage_relations.double_damage_to;
                }
                if(responseData.damage_relations.half_damage_from.length>0){
                    this.PokemonItemDetail.strengths_half_from = responseData.damage_relations.half_damage_from;
                }
                if(responseData.damage_relations.double_damage_from.length>0){
                    this.PokemonItemDetail['weaknesses_double_from'] = responseData.damage_relations.double_damage_from;
                }
                if(responseData.damage_relations.half_damage_to.length>0){
                    this.PokemonItemDetail.weaknesses_half_to = responseData.damage_relations.half_damage_to;
                }
			})
        },
        getEvolutionDetails(id){
            let url = "https://pokeapi.co/api/v2/evolution-chain/"+id;
            return axios.get(url)
			.then(response => {
                let evolutions = [];
                let evolutionResponse = response.data.chain;

                evolutions.push(evolutionResponse.species);
                evolutionResponse.species.id = evolutionResponse.species.url.split("/").filter((part) => { return !!part }).pop();

                if(evolutionResponse.evolves_to.length>0){
                    let nextEvolution = evolutionResponse.evolves_to[0];
                    evolutions.push(nextEvolution.species);
                    nextEvolution.species.id = nextEvolution.species.url.split("/").filter((part) => { return !!part }).pop();

                    if(nextEvolution.evolves_to.length>0){
                        nextEvolution = nextEvolution.evolves_to[0];
                        evolutions.push(nextEvolution.species);
                        nextEvolution.species.id = nextEvolution.species.url.split("/").filter((part) => { return !!part }).pop();
                    }
                }
                this.PokemonItemDetail.evolutions = evolutions;
			})
        }
    }
}
</script>

<style lang="scss">
.modal-content {
    background: url('./../../assets/img/pokeball.png'), $lightyellow;
    background-repeat: no-repeat;
    background-size: 60%;
    background-position: 585px -215px;
}

.pokemon-name, 
.specie-name, 
.pokemon--ability,
.pokemon--statname,
.pokemon--movename {
    text-transform: capitalize;
}

.pokemon--header {
    display: flex;
    border-bottom: 3px solid $blue;
    padding-bottom: 10px;

    .pokemon--img {
        border: 2px solid $blue;
        background-color: #fafafa;
        border-radius: 50% 50%;
    }

    .right {
        width: 100%;
        height: 96px;

        .row {
            height: 100%;
            h4 {
                font-size: 20px;
            }
        }

        .pokemon--types {
            display: flex;
            flex-direction: column;
            width: 20%;

            .pokemon--type {
                border: 1px solid black;
                padding: 2px;
                border-radius: 10px;
                margin-bottom: 10px;
                text-align: center;
                text-transform: uppercase;

                &:last-of-type{
                    margin-bottom: 0;
                }

                &-bug { background-color: #c6d267; }
                &-dark { background-color: #8a7b72; }
                &-dragon { background-color: #a494ef; }
                &-electric { background-color: #fcc023; }
                &-fairy { background-color: #f5b2f5; }
                &-fighting { background-color: #9d5d4a; }
                &-fire { background-color: #f46234; }
                &-flying { background-color: #9eaef6; }
                &-ghost { background-color: #5e5eb0; }
                &-grass { background-color: #73C235; }
                &-ground { background-color: #d1b055; }
                &-ice { background-color: #9ee5fc; }
                &-normal { background-color: #c5c0b7; }
                &-normal { background-color: #c5c0b7; }
                &-poison { background-color: #ab6cac; }
                &-psychic { background-color: #ec4780; }
                &-rock { background-color: #ae964b; }
                &-steel { background-color: #8f8fa0; }
                &-water { background-color: #3799fb; }
            }
        }
    }
    
}

.pokemon-empty-modal {
    button {
        background-color: $lightblue;
        padding: 5px;
        margin: auto;
        width: 50%;
        border: 2px solid $blue;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
            background-color: #FAFAFA;
        }
    }
}

.pokemon--details {
    border: 1px solid $blue;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    .pokemon--about, .pokemon--stats {
        &-row {
            display: flex;
            align-items: center;
            margin-bottom: 10px;

            p {
                width: 20%;
                margin-bottom: 0;
                font-weight: bold;
            }

            &:last-of-type {
                margin-bottom: 0;
            }
        }
    }

    .pokemon--damages {
        .pokemon--sw-cards {
            display: flex;

            .pokemon--sw-card {
                border: 1px solid $blue;
                flex-basis: 50%;
                padding: 10px;
                
                p {
                    font-weight: bold;
                }

                .pokemon--sw-damages {
                    margin-left: 30px;
                    font-weight: normal;
                }
            }
        }
    }

    .pokemon--stats {
        &-row {
            p {
                flex-basis: 30%;
            }
            span {
                flex-basis: 5%;
            }
            div {
                height: 20px;
                flex-basis: 65%;
            }
            .pokemon--basestat-bar {
                max-width: 100%;
                width: 100%;
                background-color: $blue;
                border-radius: 5px;
            }
        }
    }

    .pokemon--evolution {
        &-cards {
            display: flex;

            .pokemon--evolution-card-item {
                flex-basis: 30%;
                border: 5px solid $yellow;
                background-color: $blue;
                color: #fff;
                border-radius: 20px;
                position: relative;
                margin-right: 45px;

                &:nth-child(3n+3){
                    margin-right: 0;
                }

                display: flex;
                flex-direction: column;
                align-items: center;
                padding-bottom: 10px;

                cursor: pointer;

                &:hover {
                    border: 5px solid $blue;
                    background-color: $yellow;
                    color: #000;
                }
            }
        }
    }

    .pokemon--moves {
        ul {
            -webkit-column-count: 3;
            -moz-column-count: 3;
            column-count: 3;

            padding-left: 20px;
            margin-bottom: 0;
        }
    }
}

.tabs {
    width: 100%;
}
.tablink {
    width: 20%;
    background-color: $yellow;
    border: 1px solid $blue;
    cursor: pointer;
    padding: 10px;

    &:hover {
        background-color: #FAFAFA;
    }

    &--active {
        background-color: transparent;
        border: unset;
    }
}
.tab {
    padding: 20px;
    display: none;
    &--active {
        display: block;
    }
}

// Tab
@media screen and (max-width: 992px) {
    .pokemon--header {
        .right {
            .row {
                flex-flow: wrap;
                h3 {
                    width: 100%;
                }
            }

            .pokemon--types {
                display: flex;
                flex-direction: row;

                .pokemon--type {
                    margin-bottom: 0;
                    margin-right: 10px;
                }
            }
        }
        
    }
    .tablink {
        width: 33.3%;

        &:nth-child(4), &:nth-child(5) {
            width: 50%;
        }

        &:hover {
            background-color: transparent;
        }
    }
    .pokemon--details {
        .pokemon--about {
            &-row {
                p {
                    width: 30%;
                }
            }
        }

        .pokemon--stats {
            &-row {
                p {
                    flex-basis: 43%;
                }
                span {
                    flex-basis: 7%;
                }
                div {
                    flex-basis: 50%;
                }
            }
        }

        .pokemon--evolution {
            &-cards {
                .pokemon--evolution-card-item {
                    margin-right: 23px;

                    &:nth-child(3n+3){
                        margin-right: 0;
                    }
                }
            }
        }

        .pokemon--moves {
            ul {
                -webkit-column-count: 2;
                -moz-column-count: 2;
                column-count: 2;
            }
        }
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
    .pokemon--header {
        padding: 0;
        flex-flow: wrap;

        .pokemon--img {
            margin: auto;
        }

        .right {
            margin-left: 0;

            .pokemon--types {
                width: 20%;

                .pokemon--type {
                    margin-right: 5px;
                    margin-bottom: 0;
                }
            }
        }
        
    }
    .tablink {
        width: 100%;

        &:nth-child(4), &:nth-child(5) {
            width: 100%;
        }
        border-bottom: 1px solid $blue;
    }
    .pokemon--details {
        .pokemon--about {
            &-row {
                flex-flow: wrap;
                p {
                    width: 100%;
                }
                span {
                    margin-left: 20px;
                }
            }
        }

        .pokemon--damages {
            .pokemon--sw-cards {
                flex-flow: wrap;

                .pokemon--sw-card {
                    flex-basis: 100%;

                    .pokemon--sw-damages {
                        margin-left: 0;
                    }
                }
            }
        }

        .pokemon--stats {
            &-row {
                flex-flow: wrap;
                p {
                    flex-basis: 100%;
                }
                span {
                    margin-left: 5%;
                    flex-basis: 15%;
                }
                div {
                    flex-basis: 80%;
                }
            }
        }

        .pokemon--evolution {
            &-cards {
                flex-flow: wrap;

                .pokemon--evolution-card-item {
                    flex-basis: 100%;
                    margin-right: 0;
                    margin-bottom: 20px;

                    &:nth-child(3){
                        margin-bottom: 0;
                    }
                }
            }
        }

        .pokemon--moves {
            ul {
                -webkit-column-count: 1;
                -moz-column-count: 1;
                column-count: 1;
            }
        }
    }
}
</style>