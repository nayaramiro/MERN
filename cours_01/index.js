//appel de mes routes, et je prends les routes de user.route.js
import express from "express";
import userRoute from './src/routes/user.route.js';

const app = express()
app.use(express.json());
app.use('/user', userRoute);
// Routes
app.listen(3000, () => console.log("server started on port 3000"));
