import express from "express";
import pokemon from "../models/pokemon.js";

// API  Add a new Pokemo

const createPokemon = async (req, res) => {
  try {
    const { name, breed, description } = req.body;

    const newData = {
      name,
      breed,
      description,
    };

    if(!name || !breed || !description){
      res.json({ success: false, message : "Please enter" });
    }

    const newPokemon = new pokemon(newData);
    await newPokemon.save();
    res.json({ success: true, newPokemon , message : "added new pokemon" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API Get all Pokemon

const getPokemon = async (req, res) => {
  try {
    const data = await pokemon.find({});
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API Update

const updatePokemon = async (req, res) => {
  try {
    const { pokId, name, breed, description } = req.body;
    const data = await pokemon.findByIdAndUpdate(pokId, {
      name,
      breed,
      description,
    });

    res.json({ success: true, message: "Update successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API Delete

const deletePokemon = async (req,res) => {
    try {
        const {pokId} = req.body
        const data =  await pokemon.findByIdAndDelete(pokId)
        res.json({ success: true, message: "Delete successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
} 

export { createPokemon, getPokemon, updatePokemon , deletePokemon };
