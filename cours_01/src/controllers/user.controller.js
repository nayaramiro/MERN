import userService from "../services/user.service.js";
import mongoose from "mongoose";

// ma function pour créer un utilisateur
const create = async (req, res) => {
  //condtion pour verification, afin d'eviter de gaspiller de la memoire
  //je dis que ces parametres viennent de req.body
  const { name, username, email, password, avatar, background } = req.body;

  if (!name || !username || !email || !password || !avatar || !background) {
    res.status(400).send({ message: "tous les champs sont obligatoires" });
    return;
  }

  const user = await userService.createService(req.body);
  if (!user) {
    return res
      .status(400)
      .send({ message: "erreur lors de la création de l'utilisateur" });
  }

  //si tout est ok, je cree l'utilisateur
  res.status(201).send({
    message: "utilisateur créé",
    user: {
      id: user._id,
      name,
      username,
      email,
      avatar,
      background,
    },
  });
};

//function asynchronique car je fais une requete à la base de donnée et je dois attendre la reponse pour continuer
const findAllUsers = async (req, res) => {
  const users = await userService.findAllService();
  if (users.lenght === 0) {
    return res.status(400).send({ message: "il n'y a pas d'utilisateur" });
  }

  res.send(users);
};

//fonction pour trouver un utilisateur par son id
const findUserById = async (req, res) => {
  const id = req.params.id;

  //vérification que l'id est bien un id de mongoose
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "id invalide" });
  }

  const user = await userService.findUserByIdService(id);
  if (!user) {
    return res.status(400).send({ message: "utilisateur non trouvé" });
  }
  res.send(user);
};

const update = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;

  //condition pour vérifier si au moins un champs est rempli
  if (!name && !username && !email && !password && !avatar && !background) {
    res.status(400).send({ message: "Au moins un champs doit être rempli" });
  }

  const id = req.params.id;

  //vérification que l'id est bien un id de mongoose
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "id invalide" });
  }

  // je vérifie si l'utilisateur existe
  const user = await userService.findUserByIdService(id);

  if (!user) {
    return res.status(400).send({ message: "utilisateur non trouvé" });
  }

  await userService.updateService(
    id,
    name,
    username,
    email,
    password,
    avatar,
    background
  );

  res.send({ message: "utilisateur mis à jour" });
};

export default {
  create,
  findAllUsers,
  findUserById,
  update,
};
