import mongoose, { mongo } from "mongoose";
import Booking from "../models/Bookings";
import Movie from "../models/Movies";
import User from "../models/User";

export const newBooking = async(req, res,next) => {
    const {movie, date, seatNumber, user} = req.body;


    let existingMovie;
    let existingUser;
    try{
        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user);
    }
    catch(err){
        return console.log(err);
    }

    if(!existingMovie){
        return res.status(404).json({ message: "Movie not found with the given id"});
    }
    if(!existingUser){
        return res.status(404).json({message : "user not found with the given id "})
    }

    let booking ;
    try{
        booking = new Booking({
            movie,
            date: new Date( `${date}`),
            seatNumber,
            user,
        })

        const session = await mongoose.startSession();

        session.startTransaction()
        existingMovie.bookings.push(booking);
        existingUser.bookings.push(booking);
        await existingMovie.save({ session });
        await existingUser.save({ session })
        await booking.save({session});

        session.commitTransaction();
        session.endSession();
   
    }
    catch(err){
        return console.log(err);
    }

    if(!booking){
        return res.status(404).json({ Message: "Unable to create a booking" });
    }

    return res.status(202).json({ booking} );
}

export const getBookingByID = async(req, res, next) => {
    const id = req.params.id;
    let booking ;
    try{
        booking = await Booking.findById(id);
    }
    catch(err){
        return console.log(err);
    }
    if(!booking){
        return res.status(404).json({ message: "Unexpected error"});
    }

    return res.status(200).json({ booking });
}

export const deleteBookingByID = async(req, res, next) => {
    const id = req.params.id;
    let booking;
    try{
        booking = await Booking.findById(id).populate("movie user");

        if(!booking){
            return res.status(202).json({ message : "Unable to delete"});
        }
        const session = await mongoose.startSession();
        session.startTransaction();

        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);

        await booking.movie.save({ session });
        await booking.user.save({ session });

        await Booking.findByIdAndDelete(id, { session });

        session.commitTransaction();
        session.endSession();

    }
    catch(err){
        return console.log(err);
    }


    return res.status(200).json({ message: " Deleted Successfully"});
}

export const getBookingsofUser = async(req, res, next) => {

    const id = req.params.id;
    let bookings;
    try{
        bookings = await Booking.findById(id);
    }
    catch(err){
        return console.log(err);
    }
    if(!bookings){
        return res.status(500).json({ message: "Bookings not found"});
    }

    return res.status(200).json({ bookings });
}