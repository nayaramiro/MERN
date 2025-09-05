//appel de mes routes, et je prends les routes de user.route.js
import express from "express";
import userRoute from './src/routes/user.route.js';
import connectDB from "./src/db/db.js";

const app = express()
connectDB();
app.use(express.json());
app.use('/user', userRoute);
// Routes
app.listen(3000, () => console.log("server started on port 3000"));
