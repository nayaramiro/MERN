import User from "../models/User.js";
import jwt from "jsonwebtoken";

// cherche dans la db User dans la colonne mail où mail = mail reçu
const loginService = (email) =>
  User.findOne({ email: email }).select("+password");

// je prends l'in, je fais un token à partir du secret_jwt généré par MD5 qui contient une string secrete et je mets une expiration pour ce token qui me génère un nouveau après 1h
/*
  •	payload → les données que tu veux mettre dans le token (par ex. { id: 123 })
	•	secret → la clé secrète pour signer le token (souvent stockée dans une variable d’environnement)
	•	options → paramètres supplémentaires, comme la durée de validité
*/
const generateToken = (id) =>
  jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 });
export { loginService, generateToken };
