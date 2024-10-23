import React from 'react';
import PokemonList from './components/PokemonList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    
    <div className="bg-blue-50">
      <ToastContainer/>
      <PokemonList />
    </div>
  );
}

export default App;
