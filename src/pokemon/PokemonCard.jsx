// @flow
import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";

const color = "#333";
const Wrapper = styled((Link: any))`
  width: 24%;
  border: 2px solid ${color};
  border-radius: 4px;
  margin-bottom: 25px;
  padding-right: 10px;
  overflow: hidden;
  color: black;
  text-decoration:none;
  horizontal-align: right;
`;

const Image = styled.img`
  float: left;
  margin: 10px;
`;

class PokemonCard extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.avatarUrl !== nextProps.avatarUrl;
  }
  props: Pokemon;
  render() {
    let avatarImage;

    if (this.props.avatarUrl) {
      avatarImage = (
        <Image alt={`${this.props.name}`} src={this.props.avatarUrl} />
      );
    } else {
      avatarImage = <Spinner />;
    }
    return (
      <Wrapper to={`/details/${this.props.id}`}>
        <div>{avatarImage}</div>
        <div style={{float: "right"}}>
          <h3>
            Name: {this.props.name}
          </h3>
          <p>
            Weight: {this.props.weight}
          </p>
          <p>
            Height: {this.props.height}
          </p>
          <p>
            Types: {this.props.types !== undefined ? this.props.types.join(', '): ''}
          </p>
        </div>
      </Wrapper>
    );
  }
}

export default PokemonCard;
