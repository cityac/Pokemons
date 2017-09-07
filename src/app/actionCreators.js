// @flow
import { SET_SEARCH_TERM } from "../common/actions";

export default  function setSearchTerm(searchTerm: string) {
  return { type: SET_SEARCH_TERM, payload: searchTerm };
}


