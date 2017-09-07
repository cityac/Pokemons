// @flow
import React, { Component }from "react";
import styled from "styled-components";
import type { Pokemon } from "../../flow-typed/types";

const Image = styled.img`
  float: left;
  margin: 10px;
  width: 30px,
  height: 30px
`;

class PokemonsTable extends Component {
  props: {
    pokemonType: string,
    pokemons: Array,
    searchTerm: string
  };
  render() {
    return <div >
      <table className="pokemonsTable">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Types</th>
          </tr>
        </thead>
        <tbody>
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
          .map(pokemon =>
            <tr key={pokemon.name}>
              <td> <Image alt={`${pokemon.name}`}  src={pokemon.avatarUrl} /></td>
              <td>{pokemon.name}</td>
              <td>{pokemon.height}</td>
              <td>{pokemon.weight}</td>
              <td>{pokemon.types.join(", ")}</td>
          </tr>) : ''}
        </tbody>
      </table>
    </div>

  }
}

export default PokemonsTable;
