// @flow
import React, { Component }from "react";
import PokemonCard from "./PokemonCard";
import type { Pokemon } from "../../flow-typed/types";

class PokemonsList extends Component {
  props: {
    pokemonType: string,
    pokemons: Array,
    searchTerm: string
  };
  render() {
    return <div>
      {this.props.pokemons!== undefined ?
        this.props.pokemons
          .filter(
            (pokemon: Pokemon) => {
              if (this.props.pokemonType === 'all') return true;
              else if (pokemon.types.length === 0) return false;
              else if (pokemon.types.join(" ").toUpperCase().indexOf(this.props.pokemonType.toUpperCase()) >= 0)
                return true;

              return false;
            }
          )
          .filter(
            (pokemon: Pokemon) =>
            `${pokemon.name} ${pokemon.weight}`.toUpperCase().indexOf(this.props.searchTerm.toUpperCase()) >= 0
          )
          .map(pokemon => <PokemonCard key={pokemon.name} {...pokemon} />) : ''}
    </div>

  }
}

export default PokemonsList;
