// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import type { RouterHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import setSearchTerm from "./app/actionCreators";

class Landing extends Component {
  props: {
    history: RouterHistory,
    searchTerm: string,
    handleSearchTermChange: Function,
    clearSearchTerm: Function
  };
  goToSearch = (event: SyntheticEvent) => {
    event.preventDefault();
    this.props.history.push('/search');
  }
  render() {
    return (
      <div className="landing">
        <h1>{`svideo${(this.props.searchTerm !== "" ? ": " : "") + this.props.searchTerm}`}</h1>
        <form onSubmit={this.goToSearch}>
          <input
            id="search"
            value={this.props.searchTerm}
            onChange={this.props.handleSearchTermChange}
            type="text"
            placeholder="search"
          />
          <Link to="/search" onClick={this.props.clearSearchTerm}>
            or Browse All
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({ searchTerm: state.searchTerm });
const mapDispatchToProps = (dispatch: Function) => ({
  handleSearchTermChange(event) {
    dispatch(setSearchTerm(event.target.value));
  },
  clearSearchTerm() {
    dispatch(setSearchTerm(""));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
