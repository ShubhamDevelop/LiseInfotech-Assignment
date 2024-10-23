import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api";

export const fetchPokemons = () => async (dispatch) => {
  dispatch({ type: "FETCH_POKEMONS_REQUEST" });
  try {
    const response = await axios.get(API_URL + "/get-pokemon");
    console.log(response);
    dispatch({ type: "FETCH_POKEMONS_SUCCESS", payload: response.data.data });
  } catch (error) {
    dispatch({ type: "FETCH_POKEMONS_FAILURE", payload: error.message });
  }
};

export const addPokemon = (pokemon) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/add-pokemon`, pokemon);
    dispatch({ type: "ADD_POKEMON", payload: response.data });

    dispatch(fetchPokemons());
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error("Error adding pokemon:", error);
  }
};


export const editPokemon = (id, updatedPokemonData) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${API_URL}/update-pokemon`,
      {
        pokId: id,
        ...updatedPokemonData,
      }
    );

    dispatch({ type: "EDIT_POKEMON", payload: response.data });
    toast.success(response.data.message);
    dispatch(fetchPokemons());
  } catch (error) {
    console.error("Error editing pokemon:", error);
  }
};

export const deletePokemon = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`${API_URL}/delete-pokemon`, {
      data: { pokId: id },
    });

    dispatch({ type: "DELETE_POKEMON", payload: id });
    dispatch(fetchPokemons());
    toast.success(data.message);
  } catch (error) {
    console.error("Error deleting pokemon:", error);
  }
};
