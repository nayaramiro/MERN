import mongoose from "mongoose";
import userService from "../services/user.service.js";

const validId = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "L'Id n'est pas valide",
    });
  }

  next();
};

const validUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await userService.findUserByIdService(id);

  if (!user) {
    return res.status(400).send({
      message: "L'utilisateur n'a pas été trouvé",
    });
  }

  req.id = id;
  req.user = user;

  next();
};

export default {
  validId,
  validUser,
};
