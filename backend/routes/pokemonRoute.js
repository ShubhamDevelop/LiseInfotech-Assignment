import express from 'express'
import {createPokemon, getPokemon ,updatePokemon , deletePokemon} from '../controllers/pokemonControllor.js';
const pokemonRoute = express.Router();


pokemonRoute.post('/add-pokemon', createPokemon)
pokemonRoute.get('/get-pokemon', getPokemon)
pokemonRoute.put('/update-pokemon', updatePokemon)
pokemonRoute.delete('/delete-pokemon', deletePokemon)


export default pokemonRoute