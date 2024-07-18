import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-routes";
import movieRouter from "./routes/movie-routes";
import bookingRouter from "./routes/booking-routes";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL if different
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // if you need to handle cookies
}));

// middlewares
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingRouter);


mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGOOSE_PASSWORD}@cluster0.8wgxrc8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
).then(() => {
    app.listen(5000, () => {
        console.log("Connected To Databse And Server is running");
    })
})
.catch((e) => 
    console.log(e)
)

