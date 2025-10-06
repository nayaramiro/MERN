// ...existing code...
import express from "express";

//importation de la route user (GET, POST, PUT, DELETE)
import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import connectDB from "./src/db/db.js";

const app = express();
const port = process.env.PORT || 3000;
connectDB();
app.use(express.json());
app.use("/users", userRoute);
app.use("/auth", authRoute);

// Routes
app.listen(port, () => console.log(`server started on port ${port}`));
