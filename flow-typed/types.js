// @flow

import { SET_SEARCH_TERM, ADD_POKEMON_DATA, ADD_POKEMONS, ADD_POKEMON_TYPES } from "../src/common/actions";
import { TABLE_VIEW, CARD_VIEW } from "../src/common/views";

export type PokemonsData = {
  offset:number,
  count:number,
  previous:string,
  next:string,
  results: Array<Pokemon>
};

export type Pokemon = {
  id:string,
  name:string,
  url:string,
  avatarUrl:string,
  gender:string,
  weight:number,
  height:number,
  types:Array
};

export type Type = {
  id:string,
  name:string,
  url:string
};

declare var module: {
  hot: {
    accept(path: string, callback: () => void): void
  }
};

declare type ViewType = TABLE_VIEW | CARD_VIEW;
export type ViewT<V: ViewType, P: any> = {|
  type: V, payload: P
|}

export type View = ViewT<TABLE_VIEW, string> | ViewT<CARD_VIEW, string>;

declare type ActionType = 'SET_SEARCH_TERM' | 'ADD_POKEMON_DATA' | 'ADD_POKEMON_TYPES' | 'ADD_POKEMONS' | 'SET_POKEMON_TYPE_TERM';
declare type ActionT<A: ActionType, P> = {|
  type: A, payload: P
|};
export type Action = ActionT<SET_SEARCH_TERM, string> |
                      ActionT<ADD_POKEMON_DATA, Pokemon> |
                      ActionT<ADD_POKEMON_TYPES, Array> |
                      ActionT<SET_POKEMON_TYPE_TERM, Type> |
                      ActionT<ADD_POKEMONS, PokemonsData>;

