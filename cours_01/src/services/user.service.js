//connection avec la base de donnée pour creer un utilisateur
import User from "../models/User.js";

//fonction de mongoose quie create qui prend en parametre le body de la requete
const createService = (body) => User.create(body);

//fonction mongoose qui find tous les utilisateurs
const findAllService = () => User.find();

//fonction mongoose qui find un utilisateur par son id
const findUserByIdService = (id) => User.findById(id);

export default {
  createService,
  findAllService,
  findUserByIdService,
};
