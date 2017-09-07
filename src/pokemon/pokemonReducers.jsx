// @flow

import type { Action } from "../../flow-typed/types";

import { ADD_POKEMON_DATA, ADD_POKEMONS, ADD_POKEMON_TYPES, SET_POKEMON_TYPE_TERM, CLEAR_PAGE, SET_VIEW } from "../common/actions";

export const pokemonsData = (state = {}, action: Action) => {
  if (action.type === ADD_POKEMONS) {
    if(action.cache)
      return Object.assign({}, state, {offset: action.offset, forceReload: false});

    return Object.assign({}, state, { [action.offset]: action.payload }, {offset: action.offset, forceReload: false});
  } else if (action.type === CLEAR_PAGE) {
    return  Object.assign({}, state, {offset: undefined, forceReload: true});
  }
  return state;
};

export const pokemonDetails = (state = {}, action: Action) => {
  if (action.type === ADD_POKEMON_DATA) {
    return Object.assign({}, state, { [action.payload.id]: action.payload });
  }
  return state;
};

export const pokemonsTypes = (state = [{name: 'all'}], action: Action) => {
  if (action.type === ADD_POKEMON_TYPES) {
    return  state.concat(action.payload);
  }
  return state;
};

export const pokemonTypeTerm = (state = {name: 'all'}, action: Action) => {
  if (action.type === SET_POKEMON_TYPE_TERM) {
    return action.payload;
  }
  return state;
};

export const pokemonsView = (state = "TABLE_VIEW", action: Action) => {
  if (action.type === SET_VIEW) {
    return action.payload;
  }
  return state;
};




