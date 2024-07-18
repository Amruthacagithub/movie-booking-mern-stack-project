import mongoose from "mongoose";
const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking"}],
    password: {
        type: String,
        required: true,
        minLength: 6,
    }
});

export default mongoose.model("User", userSchema);