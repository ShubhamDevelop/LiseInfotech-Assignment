const initialState = {
  pokemons: [],
  loading: false,
  error: null,
};

const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_POKEMONS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_POKEMONS_SUCCESS":
      return {
        ...state,
        loading: false,
        pokemons: Array.isArray(action.payload) ? action.payload : [],
      };

    case "FETCH_POKEMONS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "ADD_POKEMON_SUCCESS":
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
      };
    case "DELETE_POKEMON_SUCCESS":
      return {
        ...state,
        pokemons: state.pokemons.filter(
          (pokemon) => pokemon._id !== action.payload
        ),
      };
    case "EDIT_POKEMON_SUCCESS":
      return {
        ...state,
        pokemons: state.pokemons.map((pokemon) =>
          pokemon._id === action.payload._id ? action.payload : pokemon
        ),
      };
    default:
      return state;
  }
};

export default pokemonReducer;
