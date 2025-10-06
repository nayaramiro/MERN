import User from "../models/User.js";

// cherche dans la db User dans la colonne mail où mail = mail reçu
const loginService = (email) =>
  User.findOne({ email: email }).select("+password");

export { loginService };
