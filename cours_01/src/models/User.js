//nouveau model user pour la base de donnée
import mongoose from "mongoose";

// création du schéma user
//Le schema sert à définir la structure des documents dans une collection MongoDB
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
});

//creéation d'un nouveau model qui s'appelle User, avec le schéma userSchema
const User = mongoose.model("User", userSchema);
export default User;