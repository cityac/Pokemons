// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { getPokemonDetails } from "./pokemonActions";
import type { Pokemon } from "../../flow-typed/types";
import Header from "../app/Header";
import Spinner from "../common/Spinner";

class Details extends Component {
  state = {
    pokemon: Pokemon
  };
  componentDidMount() {
    this.props.getPokemonDetails();
  }
  props: {
    rating: string,
    getPokemonDetails: Function
  };
  render() {
    let ratingComponent;
    if (this.props.rating) {
      ratingComponent = (
        <h3>
          {this.props.rating}
        </h3>
      );
    } else {
      ratingComponent = <Spinner />;
    }
    const { title, description, year, poster, trailer } = this.state.pokemon;
    return (
      <div className="details">
        <Header />
        <section>
          <h1>
            {title}
          </h1>
          <h2>
            {year}
          </h2>
          {ratingComponent}
          <img src={`/public/img/posters/${poster}`} alt={`Poster for ${title}`} />
          <p>
            {description}
          </p>
        </section>
        <div>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0&amp;controls=0&amp;showinfo=0`}
            frameBorder="0"
            allowFullScreen
            title={`Trailer for ${title}`}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const pokemon = state.pokemonDetails[ownProps.pokemonId] ? state.pokemonDetails[ownProps.pokemonId] : {};
  return {
    "pokemon": pokemon
  };
};

const mapDispatchToProps = (dispatch: Function, ownProps) => ({
  getPokemonDetails() {
    dispatch(getPokemonDetails(ownProps.pokemonId));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Details);
