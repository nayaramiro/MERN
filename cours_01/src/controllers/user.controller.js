// ce que j'envoie comme reponse aux routes
const create = (req, res) => {
  //condtion pour verification, afin d'eviter de gaspiller de la memoire
  //je dis que ces parametres viennent de req.body
  const { name, username, email, password, avatar, background } = req.body;

  if (!name || !username || !email || !password || !avatar || !background) {
    res.status(400).send({ message: "tous les champs sont obligatoires" });
    return;
  }
  res.status(201).send({
    message: "utilisateur créé",
    user: {
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
