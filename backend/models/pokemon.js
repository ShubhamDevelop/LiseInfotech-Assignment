import mongoose from "mongoose";

const pokemonSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true
    },
    description: {
        type : String,
        required : true
    }
})


const pokemon =  mongoose.model('pokemon' , pokemonSchema)

export default pokemon