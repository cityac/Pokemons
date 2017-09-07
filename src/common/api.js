import axios from "axios";

const pokemonApi = 'http://pokeapi.co/api/v2';
const api  = axios.create({
  baseURL: pokemonApi,
  timeout: 30000,
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}
});

export default api;

