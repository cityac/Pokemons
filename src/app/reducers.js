// @flow
import { combineReducers } from "redux";
import { SET_SEARCH_TERM} from "../common/actions";
import type { Action } from "../../flow-typed/types";
import { pokemonsData, pokemonDetails, pokemonsTypes,pokemonTypeTerm, pokemonsView } from '../pokemon/pokemonReducers';

const searchTerm = (state = "", action: Action) => {
  if (action.type === SET_SEARCH_TERM) {
    return action.payload;
  }
  return state;
};

const rootReducer = combineReducers({ searchTerm,
  pokemonsData,
  pokemonDetails,
  pokemonsTypes,
  pokemonTypeTerm,
  pokemonsView});

export default rootReducer;
