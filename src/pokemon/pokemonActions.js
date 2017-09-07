// @flow
import type { Pokemon, PokemonsData, Type} from '../../flow-typed/types';
import pokemonService from './service'

import { ADD_POKEMON_DATA, ADD_POKEMONS, ADD_POKEMON_TYPES, SET_POKEMON_TYPE_TERM, CLEAR_PAGE, SET_VIEW} from '../common/actions';

function addPokemonDetails(apiData: Pokemon) {
  return { type: ADD_POKEMON_DATA, payload: apiData };
}

 function assignPokemonDetails(value: Pokemon, details) {
  const data = details.data;
  const types = data.types.map((type) => type.type.name);
  Object.assign(value, {
    avatarUrl: data.sprites.front_default,
    height: data.height,
    weight: data.weight,
    "types": types,
  });
}

function addPokemons(responseData: PokemonsData, offset: string, dispatch: Function) {
  let id;
  const pokemonsRawData = Object.assign({}, responseData, {"offset": offset});
  pokemonsRawData.results.forEach((value: Pokemon) => {
    const split  = value.url.split("/");
    id = split[split.length-2];
    Object.assign(value, {"id": id}, {types: []});
    pokemonService.
    getPokemonDetails(id)
      .then(response => {
        assignPokemonDetails(value, response);
        const pokemonsData = Object.assign({}, pokemonsRawData);
        dispatch({type: ADD_POKEMONS, payload: pokemonsData, "offset": offset});
       // }
      })
  });
  dispatch ({ type: ADD_POKEMONS, payload: pokemonsRawData, "offset": offset });
}

function addPokemonsTypes(types: Array<Type>) {
  return { type: ADD_POKEMON_TYPES, payload: types };
}

export function clearPage() {
  return(dispatch: Function) => {
    dispatch ({ type: CLEAR_PAGE});
  }
}

export function getPokemons(offset: string, cache: boolean) {
  return (dispatch: Function) => {
    if(cache) {
      dispatch ({ type: ADD_POKEMONS, payload: null, "offset": offset, "cache" : cache});
    }
    else {
      pokemonService.getPokemons(offset)
        .then(response => {
          addPokemons(response.data, offset, dispatch);
        }).catch(error => {
        console.error('axios error', error);
      });
    }
  };
}

export function getPokemonDetails(id: string) {
  return (dispatch: Function) => {
    pokemonService.
    getPokemonDetails(id)
      .then(response => {
        dispatch(addPokemonDetails(response.data));
      }).catch(error => {
      console.error('axios error', error);
    });
  };
}

export function getPokemonsTypes() {
  return (dispatch: Function) => {
    pokemonService.
    getPokemonsTypes()
      .then(response => {
        dispatch(addPokemonsTypes(response.data.results));
      }).catch(error => {
      console.error('axios error', error);
    });
  };
}

export function setPokemonTypeTerm(type: Type) {
  return { type: SET_POKEMON_TYPE_TERM, payload: type };
}

export function setView(view: string) {
  return { type: SET_VIEW, payload: view };
}


