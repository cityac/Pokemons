// @flow
import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import type { Match } from 'react-router-dom';
import { Provider } from  'react-redux';
import store from './store';
import PokemonList from "../pokemon/Pokemons";
import Details from "../pokemon/PokemonDetails";
// import type { TABLE_VIEW } from "../common/views";

const FourOhFour = () => <div><h1>404</h1></div>;

const App = () =>
  <BrowserRouter>
    <Provider store={store}>
      <div className="app">
        <div className="landing">
          <Switch>
            <Route path='/list/:page' component={(props) =>
              <PokemonList page={props.match.params.page} viewType='TABLE_VIEW' {...props}/>} />
            <Route path='/details/:id'
                 component={(props: {match: Match}) =>
                   <Details pokemonId={props.match.params.id} {...props} />
               }
            />
            <Redirect from="/" to="/list/1" />
            <Redirect from="/list" to="/list/1" />
            <Route component={FourOhFour} />
          </Switch>
        </div>
      </div>
    </Provider>
  </BrowserRouter>;

export default App;
