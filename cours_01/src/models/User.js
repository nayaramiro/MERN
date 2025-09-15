//nouveau model user pour la base de donnée
import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
    //pour ne pas montrer le pwd dans la db
    select: false,
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

//avant de sauvegarder le schema, fais le pre
userSchema.pre("save", async function (next) {
  //dans userSchema va dans password et créé un hash = un random cripto de mon password
  //bcrypt reçoit deux paramètres : ce qu'il doit cripter et combien de tour il va faire
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//creéation d'un nouveau model qui s'appelle User, avec le schéma userSchema
const User = mongoose.model("User", userSchema);
export default User;
