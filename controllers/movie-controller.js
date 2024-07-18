import jwt from "jsonwebtoken";
import Movie from "../models/Movies";
import mongoose from "mongoose";
import Admin from "../models/Admin";


export const addMovie = async(req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1]; 
    if(!extractedToken && extractedToken.trim() === ""){
        return res.status(400).json({Message: "Token Not Found"});
    }
    
    let adminId;

    // verify token 
    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {

        if(err){
            return res.status(400).json({ Message : `${err.message}`});
        }
        else{
            adminId = decrypted.id;
            return;
        }
    });

    // create new movie
    const {title, description, releaseDate, posterUrl, actors, featured} = req.body;
    if(
        !title && title.trim() === "" &&
        !description && description.trim() === "" &&
        !posterUrl && posterUrl.trim() === ""
    )
    {
        return res.status(422).json({ Message : "Invalid Inputs"});
    }

    let movie;
    try{
        movie = new Movie({
            title,
            description,
            releaseDate: new Date( `${releaseDate}` ),
            posterUrl,
            actors,
            featured,
            admin: adminId
        })

        const session = await mongoose.startSession();
        const adminUser = await Admin.findById(adminId);
        session.startTransaction();
        await movie.save({ session });
        adminUser.addedMovies.push(movie);
        await adminUser.save({ session });
        session.commitTransaction();


    }
    catch(err){
        return console.log(err);
    }
    
    if(!movie){
        return res.status(400).json({ message : "Failed to create a movie"});
    }

    return res.status(201).json({ movie });
}
 


export const getAllMovies = async(req, res, next) => {
    let movies;
    try{
        movies = await Movie.find();
    }
    catch(err){
        return console.log(err);
    }

    if(!movies){
        return res.status(404).json( { message: "Unnexpected error"});
    }

    return res.status(200).json({ movies });
}



export const getMovieByID = async(req, res, next) => {
    const id = req.params.id;
    let movie;
    try{
        movie = await Movie.findById(id);
    }
    catch(err){
        return console.log(err);
    }

    if(!movie){
        return res.status(404).json({message : "Invalid Movie-Id"})
    }

    return res.status(200).json({ movie });
}

export const deleteMovieById = async(req, res, next) => {
    const id = req.params.id;
    let movie;
    try{
        movie = await Movie.findByIdAndDelete(id);
    }
    catch(err){
        return console.log(err);
    }

    if(!movie){
        return res.dtatus(404).json({Message: "Unexpected error could not delete movie"})
    }

    return res.status(202).json({message: "Successfully Deleted"});
}