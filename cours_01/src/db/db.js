import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const password = process.env.MONGODB_PASSWORD
const user = process.env.MONGODB_USER

const connectDB = async () => {
  try {
    console.log("connexion à la base de donnée");
    await mongoose.connect(
      `mongodb+srv://${user}:${password}@cluster0.v4rt5yy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("connexion établie");
  } catch (err) {
    console.log("erreur de connexion à la base de donnée", err);
  }
};

export default connectDB;
