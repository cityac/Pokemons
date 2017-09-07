// @flow
import React, { Component }from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import PokemonsList from "./PokemonsList";
import PokemonsTable from "./PokemonsTable";
import Header from "../app/Header";
import Spinner from "../common/Spinner";
import type { PokemonsData, Type, View} from "../../flow-typed/types";
import { TABLE_VIEW } from "../common/views";

import { getPokemons, clearPage } from "./pokemonActions";

const PageLink = styled((Link: any))`
  margin: 0 10px 0 0;
`;

class Pokemons extends Component {
  componentDidMount() {
    this.props.getPokemons();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.page !== this.props.page) {
      this.props.clearPage();
    } else if(nextProps.forceReload)
      this.props.getPokemons();
  }

  props: {
    match: Object, // eslint-disable-line react/no-unused-prop-types
    pokemonsData: PokemonsData,// eslint-disable-line react/no-unused-prop-types
    page: string,// eslint-disable-line react/no-unused-prop-types
    offset: string,// eslint-disable-line react/no-unused-prop-types
    forceReload: boolean,// eslint-disable-line react/no-unused-prop-types
    searchTerm: string, // eslint-disable-line react/no-unused-prop-types
    pokemonTypeTerm: Type, // eslint-disable-line react/no-unused-prop-types
    cache: Object, // eslint-disable-line react/no-unused-prop-types
    viewType: View, // eslint-disable-line react/no-unused-prop-types
    getPokemons: Function,
    clearPage: Function
  };

  render() {
    let paging = '';
    if(this.props.pokemonsData.count) {
      const pagesCount = Math.round(this.props.pokemonsData.count / 20);
      const pagingArray = Array.from(new Array(pagesCount), (val, index) => index + 1);
      paging = pagingArray.map((item => <PageLink key={`page_${item}`} to={`/list/${item}`}>{item}</PageLink> ));
    }
    const viewType:View = this.props.viewType;
    return (
      <div className="list">
        <Header showSearch view={viewType}/>
        <div>{this.props.pokemonsData.results === undefined ?  <Spinner /> : ''}</div>
        {viewType === TABLE_VIEW ?
          <PokemonsTable pokemons={this.props.pokemonsData.results}
                        searchTerm={this.props.searchTerm} pokemonType={this.props.pokemonTypeTerm.name}/> :
          <PokemonsList pokemons={this.props.pokemonsData.results}
                        searchTerm={this.props.searchTerm} pokemonType={this.props.pokemonTypeTerm.name}/> }
        <div>{paging}</div>
      </div>
    )
  };
}

const mapStateToProps = (state) => {
  const offset = state.pokemonsData.offset;
  const data: PokemonsData = state.pokemonsData[offset] ? state.pokemonsData[offset] : {};
  return {
    offset: data.offset,
    searchTerm: state.searchTerm,
    pokemonTypeTerm: state.pokemonTypeTerm,
    pokemonsData: data,
    cache: state.pokemonsData,
    forceReload: state.pokemonsData.forceReload,
    viewType: state.pokemonsView
  };
};

const mapDispatchToProps = (dispatch: Function, ownProps) => ({
  getPokemons() {
    const offset = (ownProps.page === undefined ? 1 : (ownProps.page - 1)) * 20;
    const useCache = this.cache !== undefined &&
      this.cache[offset] !== undefined;
    dispatch(getPokemons(offset, useCache));
  },

  clearPage() {
    dispatch(clearPage());
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);
