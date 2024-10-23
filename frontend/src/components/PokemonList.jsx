import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPokemons,
  addPokemon,
  deletePokemon,
  editPokemon,
} from "../actions/pokemonActions";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const PokemonList = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemon.pokemons);
  const loading = useSelector((state) => state.pokemon.loading);
  const error = useSelector((state) => state.pokemon.error);

  const [newPokemon, setNewPokemon] = useState({
    name: "",
    breed: "",
    description: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editPokemonData, setEditPokemonData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setNewPokemon({ ...newPokemon, [e.target.name]: e.target.value });
  };

  const handleAddPokemon = (e) => {
    e.preventDefault();
    dispatch(addPokemon(newPokemon));
    dispatch(fetchPokemons());
    setNewPokemon({ name: "", breed: "", description: "" });
  };

  const handleEdit = (pokemon) => {
    setEditMode(true);
    setEditPokemonData(pokemon);
    setIsModalOpen(true);
  };

  const handleSaveEdit = () => {
    dispatch(
      editPokemon(editPokemonData._id, {
        name: editPokemonData.name,
        breed: editPokemonData.breed,
        description: editPokemonData.description,
      })
    );
    dispatch(fetchPokemons());
    setEditMode(false);
    setEditPokemonData(null);
  };

  const handleEditChange = (e) => {
    console.log(e.target.value);
    setEditPokemonData({ ...editPokemonData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  return (
    <div className="mt-6 flex flex-col md:flex-row justify-between">
      
       
      <form
        onSubmit={handleAddPokemon}
        className="mb-5 w-full md:w-1/3 bg-white p-32 rounded-xl shadow-lg mx-auto md:mx-0 md:ml-4"
      >
        <h2 className="text-xl font-bold text-center mb-4 text-gray-700">
          Add a New Pokemon
        </h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-600 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={newPokemon.name}
            onChange={handleChange}
            placeholder="Enter Pokemon name"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="breed"
            className="block text-sm font-semibold text-gray-600 mb-1"
          >
            Breed
          </label>
          <input
            type="text"
            name="breed"
            required
            value={newPokemon.breed}
            onChange={handleChange}
            placeholder="Enter Pokemon breed"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-600 mb-1"
          >
            Description
          </label>
          <textarea
            name="description"
            required
            value={newPokemon.description}
            onChange={handleChange}
            placeholder="Enter a brief description"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-28 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Add Pokemon
        </button>
      </form>

      <div className="w-full md:w-2/3 md:pl-6">
        {!loading && pokemons && pokemons.length > 0 ? (
          <ul className="space-y-4">
            {pokemons.map((pokemon, index) => (
              <li
                key={pokemon._id}
                className={
                  "border border-gray-200 p-4 rounded-lg shadow-md transition-shadow duration-300 bg-white"
                }
              >
                <div className="flex justify-between items-center">
                  <div className="text-gray-700">
                    <strong className="text-lg font-semibold">
                      {pokemon.name}
                    </strong>
                    <span className="text-sm text-gray-500">
                      {" "}
                      ( {pokemon.breed} )
                    </span>
                    <p className="text-gray-600">{pokemon.description}</p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300"
                      onClick={() => handleEdit(pokemon)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
                      onClick={() => {
                        dispatch(deletePokemon(pokemon._id));
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          !loading && (
            <p className="text-gray-500 text-center">No Pokemon available</p>
          )
        )}
      </div>

      {isModalOpen && editMode && editPokemonData && (
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="relative z-10"
        >
          <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Edit Poke mon
                      </DialogTitle>
                      <div className="mt-2">
                        <form>
                          <input
                            type="text"
                            name="name"
                            value={editPokemonData.name}
                            onChange={handleEditChange}
                            placeholder="Name"
                            className="border p-2 mr-2 w-full"
                          />
                          <input
                            type="text"
                            name="breed"
                            value={editPokemonData.breed}
                            onChange={handleEditChange}
                            placeholder="Breed"
                            className="border p-2 mr-2 w-full"
                          />
                          <input
                            type="text"
                            name="description"
                            value={editPokemonData.description}
                            onChange={handleEditChange}
                            placeholder="Description"
                            className="border p-2 mr-2 w-full"
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default PokemonList;
