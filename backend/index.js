import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors'
import pokemonRoute from "./routes/pokemonRoute.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors())

app.use("/api", pokemonRoute);

mongoose
  .connect("mongodb://localhost:27017/pokemon", {
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(port, () => console.log("server started", port));
