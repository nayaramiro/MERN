//connection avec la base de donnée
import User from "../models/User.js";

//fonction create qui prend en parametre le body de la requete
const create = (body) => User.create(body);





export default {
  create,
};