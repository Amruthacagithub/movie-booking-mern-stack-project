import express from "express";
import { deleteBookingByID, getBookingByID, getBookingsofUser, newBooking } from "../controllers/booking-controllers";

const bookingRouter = express.Router();

bookingRouter.post("/", newBooking);
bookingRouter.get("/:id", getBookingByID);
bookingRouter.delete("/:id", deleteBookingByID);
bookingRouter.get("/bookings/:id", getBookingsofUser);

export default bookingRouter;