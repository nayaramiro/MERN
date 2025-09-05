import userService from "../services/user.service.js";
// ce que j'envoie comme reponse aux routes
const create = async (req, res) => {
  //condtion pour verification, afin d'eviter de gaspiller de la memoire
  //je dis que ces parametres viennent de req.body
  const { name, username, email, password, avatar, background } = req.body;

  if (!name || !username || !email || !password || !avatar || !background) {
    res.status(400).send({ message: "tous les champs sont obligatoires" });
    return;
  }

  const user = await userService.create(req.body);
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

export default {
  create,
};
