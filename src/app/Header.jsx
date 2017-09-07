// @flow
import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import setSearchTerm  from "./actionCreators";
import { getPokemonsTypes, setPokemonTypeTerm, setView} from "../pokemon/pokemonActions";
import { TABLE_VIEW, CARD_VIEW } from "../common/views";
import { View } from "../../flow-typed/types";

class Header extends Component {

  componentWillMount() {
    this.props.getPokemonsTypes();
  };

  shouldComponentUpdate(nextProps) {
    return this.view !== nextProps.view || this.props.searchTerm !== nextProps.searchTerm ||
      (this.props.pokemonsTypes === undefined || this.props.pokemonsTypes.length === 1) && nextProps.pokemonsTypes !== undefined;
  };

  props: {
    showSearch?: boolean,
    handleSearchTermChange: Function,
    handlePokemonTypeTermChange: Function,
    handleViewChange: Function,
    getPokemonsTypes: Function,
    view: View, // eslint-disable-line react/no-unused-prop-types
    searchTerm: string,
    pokemonsTypes: Array // eslint-disable-line react/no-unused-prop-types
  };

  render() {
    let utilSpace;
    let options = [];
    if(this.props.pokemonsTypes !== undefined) {
      options = this.props.pokemonsTypes.map((item) =>
        <option key={item.name} value={item.name} placeholder="Search">{item.name}</option>
      )
    }
    if (this.props.showSearch) {
      const tableChecked = this.props.view === TABLE_VIEW;
      const cardChecked = this.props.view === CARD_VIEW;

      console.log(tableChecked, cardChecked);
      utilSpace = (
        <div>
          {/* <div style={{float: "left"}}>
           <button className="linkButton"  onClick={this.props.handleViewChange}>Table View</button>
           </div>
           <div style={{float: "left"}}>
           <button className="linkButton"  onClick={this.props.handleViewChange}>Card View</button>
           </div> */}
          <form className="viewForm">
            <input type="radio" name="view" value={TABLE_VIEW} {...tableChecked ? {checked: true} : {}}
                   onChange={this.props.handleViewChange}/>Table View&nbsp;
            <input type="radio" name="view" value={CARD_VIEW} {...cardChecked ? {checked: true} : {}}
                   onChange={this.props.handleViewChange}/>Card View
          </form>
          <div style={{float: "left"}}>
            Filter by type:
          </div>
          <div style={{float: "left"}}>
            <select className="types" onChange={this.props.handlePokemonTypeTermChange}>
              { options }
            </select>
          </div>
          <div style={{float: "left"}}>
            <input type="text" onChange={this.props.handleSearchTermChange} value={this.props.searchTerm}
                   placeholder="Search"/>
          </div>
        </div>
      );
    }
    else
      utilSpace = (
        <h2>
          <Link to="/search">Back</Link>
        </h2>
      );

    return (
      <header>
        <h1>
          <Link to="/">Pokemons</Link>
        </h1>
        {utilSpace}
      </header>
    );
  };
}

Header.defaultProps = {
  showSearch: false
};

const mapStateToProps = state => (
  {
    searchTerm: state.searchTerm,
    pokemonsTypes: state.pokemonsTypes,
    view: state.pokemonsView
  });

const mapDispatchToProps = (dispatch: Function) => ({
  handleSearchTermChange(event) {
    dispatch(setSearchTerm(event.target.value));
  },

  handlePokemonTypeTermChange(event) {
    dispatch(setPokemonTypeTerm({name: event.target.value}));
  },

  handleViewChange(event) {
     dispatch(setView(event.target.value));
  },

  getPokemonsTypes() {
    dispatch(getPokemonsTypes());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
