// @flow

import api from '../common/api';

const pokemonService =  {
  getPokemons: ((offset: string) =>  api.get(`/pokemon?offset=${offset}`)),
  getPokemonDetails: ((id: string) =>  api.get(`/pokemon/${id}`)),
  getPokemonsTypes: (() =>  api.get(`/type`))

};

export default pokemonService;
