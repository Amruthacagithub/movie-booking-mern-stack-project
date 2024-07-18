import express from "express";
import { addMovie, deleteMovieById, getAllMovies, getMovieByID } from "../controllers/movie-controller";

const movieRouter = express.Router();

movieRouter.post("/", addMovie );
movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieByID );
movieRouter.delete("/:id", deleteMovieById );

export default movieRouter;